// app/admin/exams/page.tsx

import { createClient } from '@/lib/supabase/server'
import CreateExamButton from './_components/CreateExamButton'

export default async function AdminExamsPage() {
  const supabase = await createClient()

  /* -------------------------------------------------------
     Fetch exams (admin view)
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
      exam_categories ( name ),
      exam_levels ( name )
    `)
    .order('exam_order', { ascending: true })

  /* -------------------------------------------------------
     UI
  -------------------------------------------------------- */
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <CreateExamButton />
      </div>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Failed to load exams.
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
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {(exams ?? []).map((exam) => (
              <tr
                key={exam.id}
                className="border-b last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-4 py-3">{exam.exam_order}</td>

                <td className="px-4 py-3 font-medium">
                  {exam.title}
                </td>

                <td className="px-4 py-3">
                  {Array.isArray(exam.exam_categories)
                    ? exam.exam_categories[0]?.name
                    : exam.exam_categories?.name}
                </td>

                <td className="px-4 py-3">
                  {Array.isArray(exam.exam_levels)
                    ? exam.exam_levels[0]?.name
                    : exam.exam_levels?.name}
                </td>

                <td className="px-4 py-3">
                  {exam.duration_minutes} min
                </td>

                <td className="px-4 py-3">
                  {exam.total_questions}
                </td>

                <td className="px-4 py-3">
                  {exam.is_active ? (
                    <span className="text-emerald-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
              </tr>
            ))}

            {(exams ?? []).length === 0 && !error && (
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
