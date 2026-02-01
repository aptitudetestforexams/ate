'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ExamCard } from '@/components/exam-card'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'aptitude', label: 'Aptitude' },
  { value: 'reasoning', label: 'Reasoning' },
  { value: 'gk', label: 'General Knowledge' },
  { value: 'english', label: 'English' },
]

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const mockExams = [
  { id: 1, title: 'Basic Mathematics', examNumber: 1, status: 'completed' as const, category: 'aptitude', level: 'easy' },
  { id: 2, title: 'Logical Reasoning I', examNumber: 2, status: 'completed' as const, category: 'reasoning', level: 'easy' },
  { id: 3, title: 'World Geography', examNumber: 3, status: 'available' as const, category: 'gk', level: 'medium' },
  { id: 4, title: 'Number Series', examNumber: 4, status: 'locked' as const, category: 'aptitude', level: 'medium' },
  { id: 5, title: 'Verbal Reasoning', examNumber: 5, status: 'locked' as const, category: 'reasoning', level: 'medium' },
  { id: 6, title: 'Indian History', examNumber: 6, status: 'locked' as const, category: 'gk', level: 'hard' },
  { id: 7, title: 'Data Interpretation', examNumber: 7, status: 'locked' as const, category: 'aptitude', level: 'hard' },
  { id: 8, title: 'Critical Reasoning', examNumber: 8, status: 'locked' as const, category: 'reasoning', level: 'hard' },
  { id: 9, title: 'Grammar Essentials', examNumber: 9, status: 'locked' as const, category: 'english', level: 'easy' },
]

export default function UserExamsPage() {
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')

  const filteredExams = mockExams.filter((exam) => {
    const categoryMatch = category === 'all' || exam.category === category
    const levelMatch = level === 'all' || exam.level === level
    return categoryMatch && levelMatch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Exam Dashboard
          </h1>
          <p className="mt-1 text-slate-500">
            Select a category and level to find exams
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
            <p className="text-sm text-slate-700">
              You can attempt only one exam per day. Choose wisely and make sure
              you have enough time to complete the exam.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 sm:w-[200px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 sm:w-[200px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              {levels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredExams.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-500">
              No exams found for the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                title={exam.title}
                examNumber={exam.examNumber}
                status={exam.status}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
