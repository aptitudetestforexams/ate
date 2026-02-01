<<<<<<< HEAD
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
=======
"use client"

import { Lock, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ExamStatus = "locked" | "available" | "completed"

interface ExamCardProps {
  title: string
  examNumber: number
  status: ExamStatus
  questionsCount?: number
  duration?: string
}

export function ExamCard({
  title,
  examNumber,
  status,
  questionsCount = 30,
  duration = "45 mins",
}: ExamCardProps) {
  const isLocked = status === "locked"
  const isCompleted = status === "completed"

  return (
    <Card
      className={`relative transition-all ${
        isLocked
          ? "opacity-60 border-border"
          : isCompleted
            ? "border-success/30 bg-success/5"
            : "border-border hover:border-muted-foreground/30"
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Exam {examNumber}
            </p>
            <h3 className="font-semibold text-foreground leading-tight">{title}</h3>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{questionsCount} Questions</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button
          className="w-full"
          variant={isCompleted ? "secondary" : "default"}
          disabled={isLocked}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              View Results
            </>
          ) : (
            "Attempt Exam"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: ExamStatus }) {
  if (status === "locked") {
    return (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        <Lock className="h-3 w-3 mr-1" />
        Locked
      </Badge>
    )
  }
  
  if (status === "completed") {
    return (
      <Badge className="bg-success/20 text-success border-0">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Completed
      </Badge>
    )
  }
  
  return (
    <Badge className="bg-chart-1/20 text-chart-1 border-0">
      Available
    </Badge>
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  )
}
