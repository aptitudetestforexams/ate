// app/admin/exams/actions.tsx
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type CreateExamInput = {
  title: string
  categoryId: string
  levelId: string
  examOrder: number
  durationMinutes: number
  totalQuestions: number
}

export async function createExam(input: CreateExamInput) {
  const supabase = await createClient()

  /* ----------------------------------------
     Auth + Admin guard
  ----------------------------------------- */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Forbidden')
  }

  /* ----------------------------------------
     Validation
  ----------------------------------------- */
  if (!input.title.trim()) {
    throw new Error('Title is required')
  }

  if (input.examOrder <= 0) {
    throw new Error('Exam order must be greater than 0')
  }

  if (input.durationMinutes <= 0) {
    throw new Error('Duration must be greater than 0')
  }

  if (input.totalQuestions <= 0) {
    throw new Error('Total questions must be greater than 0')
  }

  /* ----------------------------------------
     Insert exam
  ----------------------------------------- */
  const { error } = await supabase.from('exams').insert({
    title: input.title,
    category_id: input.categoryId,
    level_id: input.levelId,
    exam_order: input.examOrder,
    duration_minutes: input.durationMinutes,
    total_questions: input.totalQuestions,
    is_active: true,
  })

  if (error) {
    throw new Error(error.message)
  }

  /* ----------------------------------------
     Revalidate admin exams page
  ----------------------------------------- */
  revalidatePath('/admin/exams')
}
