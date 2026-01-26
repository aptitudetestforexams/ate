// app/admin/exams/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CreateExamButton from './_components/CreateExamButton'

export default async function AdminExamsPage() {
  const supabase = await createClient()

  /* -------------------------------------------------------
     Auth + Admin guard
  -------------------------------------------------------- */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/unauthorized')
  }

  const { data: categories, error: categoriesError } =
    await supabase.from('exam_categories').select('id, name')

  const { data: levels, error: levelsError } =
    await supabase.from('exam_levels').select('id, name')

  console.log('CATEGORIES:', categories)
  console.log('LEVELS:', levels)


  /* -------------------------------------------------------
     Fetch exams
  -------------------------------------------------------- */
  const { data: exams, error } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      exam_order,
      duration_minutes,
      total_questions,
      is_active,
      exam_categories (
        id,
        name
      ),
      exam_levels (
        id,
        name
      )
    `)
    .order('exam_order', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }


  return (
    <div className="space-y-6">
      <div className="mb-4 flex justify-end">
        <CreateExamButton />
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Exams
        </h1>
        <p className="text-sm text-slate-500">
          Manage all exams across categories and difficulty levels
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr className="text-slate-600">
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Level</th>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-left font-medium">Duration</th>
              <th className="px-4 py-3 text-left font-medium">Questions</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {exams?.map((exam) => (
              <tr
                key={exam.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {exam.title}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {exam.exam_categories?.name}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {exam.exam_levels?.name}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {exam.exam_order}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {exam.duration_minutes} min
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {exam.total_questions}
                </td>
                <td className="px-4 py-3">
                  {exam.is_active ? (
                    <span className="font-medium text-emerald-600">
                      Active
                    </span>
                  ) : (
                    <span className="font-medium text-red-600">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {exams?.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No exams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}
