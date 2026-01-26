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
  )
}
