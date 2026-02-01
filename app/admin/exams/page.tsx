<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server'
=======
// app/admin/exams/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CreateExamButton from './_components/CreateExamButton'
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3

export default async function AdminExamsPage() {
  const supabase = await createClient()

  /* -------------------------------------------------------
<<<<<<< HEAD
     Fetch exams (read-only)
=======
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
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  -------------------------------------------------------- */
  const { data: exams, error } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      exam_order,
      duration_minutes,
<<<<<<< HEAD
      question_count,
      exam_categories ( name ),
      exam_levels ( name )
    `)
    .order('exam_order', { ascending: true })

  /* -------------------------------------------------------
     UI
  -------------------------------------------------------- */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Exams</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Failed to load exams. {process.env.NODE_ENV === 'development' && error.message}
        </div>
      )}

      <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Questions</th>
=======
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
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
            </tr>
          </thead>

          <tbody>
<<<<<<< HEAD
            {(exams ?? []).map((exam) => (
              <tr
                key={exam.id}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-4 py-3">{exam.exam_order}</td>
                <td className="px-4 py-3 font-medium">{exam.title}</td>
                <td className="px-4 py-3">
                  {Array.isArray(exam.exam_categories)
                    ? exam.exam_categories[0]?.name
                    : (exam.exam_categories as { name?: string } | null)?.name}
                </td>
                <td className="px-4 py-3">
                  {Array.isArray(exam.exam_levels)
                    ? exam.exam_levels[0]?.name
                    : (exam.exam_levels as { name?: string } | null)?.name}
                </td>
                <td className="px-4 py-3">
                  {exam.duration_minutes} min
                </td>
                <td className="px-4 py-3">
                  {exam.question_count}
=======
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
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
                </td>
              </tr>
            ))}

<<<<<<< HEAD
            {(exams ?? []).length === 0 && !error && (
              <tr>
                <td
                  colSpan={6}
=======
            {exams?.length === 0 && (
              <tr>
                <td
                  colSpan={7}
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
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
<<<<<<< HEAD
=======

>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  )
}
