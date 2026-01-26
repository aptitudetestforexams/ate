"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, Ban } from "lucide-react"

const exams = [
  {
    id: 1,
    name: "JavaScript Fundamentals",
    category: "Programming",
    level: "Easy",
    duration: 30,
    questions: 25,
    status: "active",
  },
  {
    id: 2,
    name: "React Advanced Concepts",
    category: "Frontend",
    level: "Hard",
    duration: 60,
    questions: 40,
    status: "active",
  },
  {
    id: 3,
    name: "Python Basics",
    category: "Programming",
    level: "Easy",
    duration: 45,
    questions: 30,
    status: "inactive",
  },
  {
    id: 4,
    name: "Data Structures & Algorithms",
    category: "Computer Science",
    level: "Medium",
    duration: 90,
    questions: 50,
    status: "active",
  },
  {
    id: 5,
    name: "Database Design",
    category: "Backend",
    level: "Medium",
    duration: 60,
    questions: 35,
    status: "active",
  },
  {
    id: 6,
    name: "System Design Principles",
    category: "Architecture",
    level: "Hard",
    duration: 120,
    questions: 20,
    status: "inactive",
  },
]

function getLevelStyles(level: string) {
  switch (level) {
    case "Easy":
      return "bg-success/20 text-success border-success/30"
    case "Medium":
      return "bg-warning/20 text-warning border-warning/30"
    case "Hard":
      return "bg-destructive/20 text-destructive border-destructive/30"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ExamsTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Exam Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Duration (min)</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell className="font-medium text-foreground">{exam.name}</TableCell>
              <TableCell className="text-muted-foreground">{exam.category}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getLevelStyles(exam.level)}>
                  {exam.level}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{exam.duration}</TableCell>
              <TableCell className="text-muted-foreground">{exam.questions}</TableCell>
              <TableCell>
                <Badge
                  variant={exam.status === "active" ? "default" : "secondary"}
                  className={
                    exam.status === "active"
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {exam.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="size-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive">
                    <Ban className="size-4" />
                    <span className="sr-only">Disable</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
