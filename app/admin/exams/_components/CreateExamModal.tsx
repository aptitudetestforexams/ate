'use client'

import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CreateExamModal({ open, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [duration, setDuration] = useState('')
  const [questions, setQuestions] = useState('')
  const [examOrder, setExamOrder] = useState('')


  if (!open) return null

  const isFormValid =
    title &&
    examOrder &&
    duration &&
    questions


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Create New Exam
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Form (UI only) */}
        <div className="space-y-4">
          {/* Exam Title */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Exam Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                <option value="aptitude">Aptitude</option>
                <option value="reasoning">Reasoning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Select level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Exam Order */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Exam Order
            </label>
            <input
              type="number"
              value={examOrder}
              onChange={(e) => setExamOrder(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              placeholder="1"
            />
          </div>


          {/* Duration */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Total Questions */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Total Questions
            </label>
            <input
              type="number"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              disabled={!isFormValid}
              className={`rounded-md px-4 py-2 text-sm text-white ${isFormValid
                  ? 'bg-slate-900 hover:bg-slate-800'
                  : 'bg-slate-400 cursor-not-allowed'
                }`}
            >
              Create Exam
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
