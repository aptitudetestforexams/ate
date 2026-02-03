import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AddQuestionModal from './_components/AddQuestionModal'

interface PageProps {
  params: Promise<{ examId: string }>
}

export default async function AdminExamQuestionsPage({ params }: PageProps) {
  const supabase = await createClient()
  const { examId } = await params

  /* --------------------------------------------
     Fetch exam
  --------------------------------------------- */
  const { data: exam, error: examError } = await supabase
    .from('exams')
    .select(
      `
      id,
      title,
      description,
      duration_minutes,
      total_questions,
      is_active
    `
    )
    .eq('id', examId)
    .single()

  if (examError || !exam) {
    redirect('/admin/exams')
  }

  /* --------------------------------------------
     Fetch questions + options
  --------------------------------------------- */
  const { data: questions } = await supabase
    .from('exam_questions')
    .select(
      `
      id,
      question_text,
      explanation,
      question_order,
      question_options (
        id,
        option_text,
        is_correct,
        option_order
      )
    `
    )
    .eq('exam_id', examId)
    .order('question_order', { ascending: true })
    .order('option_order', {
      foreignTable: 'question_options',
      ascending: true,
    })

  const isLocked = exam.is_active === true

  return (
    <div className="space-y-6">
      {/* --------------------------------------------
          Header
      --------------------------------------------- */}
      <div>
        <h1 className="text-2xl font-semibold">
          Questions — {exam.title}
        </h1>
        <p className="text-sm text-slate-500">
          Duration: {exam.duration_minutes} mins · Total Questions:{' '}
          {exam.total_questions}
        </p>

        {isLocked ? (
          <Badge variant="destructive" className="mt-2">
            Exam is ACTIVE — editing disabled
          </Badge>
        ) : (
          <Badge className="mt-2 bg-emerald-600">
            Exam is INACTIVE — editing allowed
          </Badge>
        )}
      </div>

      {/* --------------------------------------------
          Add Question (always show so admins can add questions)
      --------------------------------------------- */}
      <div className="flex justify-end">
        <AddQuestionModal examId={exam.id} isLocked={isLocked} />
      </div>


      {/* --------------------------------------------
          Questions List
      --------------------------------------------- */}
      <div className="space-y-4">
        {questions && questions.length > 0 ? (
          questions.map((q, index) => (
            <Card key={q.id} className="p-4 space-y-3">
              <div className="flex justify-between">
                <h2 className="font-medium">
                  Q{index + 1}. {q.question_text}
                </h2>
                <span className="text-xs text-slate-400">
                  Order: {q.question_order}
                </span>
              </div>

              <ul className="space-y-1">
                {q.question_options.map((opt, i) => (
                  <li
                    key={opt.id}
                    className={`flex gap-2 ${
                      opt.is_correct
                        ? 'text-emerald-600 font-medium'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt.option_text}</span>
                    {opt.is_correct && (
                      <Badge className="ml-2 bg-emerald-600">
                        Correct
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>

              {q.explanation && (
                <div className="text-sm text-slate-600">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-6 text-center text-slate-500">
            No questions added yet.
          </Card>
        )}
      </div>
    </div>
  )
}
