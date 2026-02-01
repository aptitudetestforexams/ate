'use client'

type ExamCardProps = {
  title: string
  examNumber: number
  status: 'completed' | 'available' | 'locked'
}

export function ExamCard({ title, examNumber, status }: ExamCardProps) {
  const statusStyles = {
    completed: 'bg-green-50 border-green-200 text-green-700',
    available: 'bg-blue-50 border-blue-200 text-blue-700',
    locked: 'bg-slate-50 border-slate-200 text-slate-500',
  }

  const buttonStyles = {
    completed: 'bg-green-600 hover:bg-green-700 text-white',
    available: 'bg-blue-600 hover:bg-blue-700 text-white',
    locked: 'bg-slate-300 text-slate-500 cursor-not-allowed',
  }

  return (
    <div className={`rounded-lg border p-4 ${statusStyles[status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium opacity-75">Exam {examNumber}</p>
          <h3 className="text-lg font-semibold mt-1">{title}</h3>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide opacity-75">
          {status === 'completed' && 'Completed'}
          {status === 'available' && 'Available'}
          {status === 'locked' && 'Locked'}
        </span>
        <button
          disabled={status === 'locked'}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${buttonStyles[status]}`}
        >
          {status === 'completed' && 'Review'}
          {status === 'available' && 'Attempt'}
          {status === 'locked' && 'Locked'}
        </button>
      </div>
    </div>
  )
}
