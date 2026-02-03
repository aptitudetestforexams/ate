'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type AddQuestionPayload = {
  examId: string
  questionText: string
  explanation?: string
  options: {
    text: string
    isCorrect: boolean
  }[]
}

export async function addQuestionAction(payload: AddQuestionPayload) {
  const supabase = await createClient()

  // 0. Block adding questions to active exams
  const { data: exam } = await supabase
    .from('exams')
    .select('is_active')
    .eq('id', payload.examId)
    .single()
  if (exam?.is_active) {
    throw new Error('Cannot add questions while the exam is active. Deactivate the exam first.')
  }

  // 1. Validate question text
  if (!payload.questionText?.trim()) {
    throw new Error('Question text is required')
  }

  // 2. Validate options
  if (payload.options.length !== 4) {
    throw new Error('Exactly 4 options are required')
  }

  const correctCount = payload.options.filter(o => o.isCorrect).length
  if (correctCount !== 1) {
    throw new Error('Exactly one option must be correct')
  }

  const emptyOption = payload.options.find(o => !o.text?.trim())
  if (emptyOption) {
    throw new Error('All four options must have text')
  }

  // 3. Get next question order (use maybeSingle so 0 rows is ok for first question)
  const { data: lastQuestion } = await supabase
    .from('exam_questions')
    .select('question_order')
    .eq('exam_id', payload.examId)
    .order('question_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextOrder = (lastQuestion?.question_order ?? 0) + 1

  // 4. Insert question
  const { data: question, error: questionError } = await supabase
    .from('exam_questions')
    .insert({
      exam_id: payload.examId,
      question_text: payload.questionText,
      explanation: payload.explanation,
      question_order: nextOrder,
    })
    .select()
    .single()

  if (questionError) throw new Error(questionError.message)

  // 5. Insert options
  const optionsPayload = payload.options.map((opt, index) => ({
    question_id: question.id,
    option_text: opt.text,
    is_correct: opt.isCorrect,
    option_order: index + 1,
  }))

  const { error: optionsError } = await supabase
    .from('question_options')
    .insert(optionsPayload)

  if (optionsError) throw new Error(optionsError.message)

  revalidatePath(`/admin/exams/${payload.examId}/questions`)
  return { success: true }
}
