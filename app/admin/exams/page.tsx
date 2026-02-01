import { createClient } from '@/lib/supabase/server'

export default async function AdminExamsPage() {
  const supabase = await createClient()

  /* -------------------------------------------------------
     Fetch exams (read-only)
  -------------------------------------------------------- */
  const { data: exams, error } = await supabase
    .from('exams')
    .select(`
      id,
      title,
      exam_order,
      duration_minutes,
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
            </tr>
          </thead>

          <tbody>
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
                </td>
              </tr>
            ))}

            {(exams ?? []).length === 0 && !error && (
              <tr>
                <td
                  colSpan={6}
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
