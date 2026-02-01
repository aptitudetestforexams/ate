'use client'

import { useState } from 'react'
import CreateExamModal from './CreateExamModal'

export default function CreateExamButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        + Add Exam
      </button>

      <CreateExamModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
