'use client'

import { useState } from 'react'
import { addQuestionAction } from '../actions'

export default function AddQuestionModal({
  examId,
  isLocked = false,
}: {
  examId: string
  isLocked?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [questionText, setQuestionText] = useState('')
  const [explanation, setExplanation] = useState('')
  const [options, setOptions] = useState([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ])

  const submit = async () => {
    setLoading(true)

    try {
      await addQuestionAction({
        examId,
        questionText,
        explanation,
        options,
      })

      setOpen(false)
      setQuestionText('')
      setExplanation('')
      setOptions([
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ])
    } catch (e: any) {
      alert(e?.message ?? 'Failed to add question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
      >
        Add Question
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Add Question</h2>
            {isLocked && (
              <p className="text-sm text-amber-600">
                Exam is active. Deactivate the exam first to add questions.
              </p>
            )}

            <textarea
              placeholder="Question text"
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              className="w-full rounded-md border p-2"
            />

            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={opt.isCorrect}
                  onChange={() =>
                    setOptions(options.map((o, idx) => ({
                      ...o,
                      isCorrect: idx === i,
                    })))
                  }
                />
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt.text}
                  onChange={e => {
                    const copy = [...options]
                    copy[i].text = e.target.value
                    setOptions(copy)
                  }}
                  className="flex-1 rounded-md border p-2"
                />
              </div>
            ))}

            <textarea
              placeholder="Explanation (optional)"
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              className="w-full rounded-md border p-2"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={loading || isLocked}
                className="rounded-md bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
