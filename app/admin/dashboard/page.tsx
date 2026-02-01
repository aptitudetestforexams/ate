<<<<<<< HEAD
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const chartData = [
  { date: 'Jan', users: 400, exams: 240, attempts: 540 },
  { date: 'Feb', users: 620, exams: 480, attempts: 840 },
  { date: 'Mar', users: 750, exams: 520, attempts: 920 },
  { date: 'Apr', users: 890, exams: 630, attempts: 1080 },
  { date: 'May', users: 1050, exams: 720, attempts: 1240 },
  { date: 'Jun', users: 1200, exams: 850, attempts: 1420 },
]

const statCards = [
  {
    label: 'Total Users',
    value: '1,240',
    change: '+12.5%',
    isPositive: true,
    icon: Users,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    label: 'Total Exams',
    value: '48',
    change: '+2',
    isPositive: true,
    icon: BookOpen,
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    label: 'Active Sessions',
    value: '342',
    change: '+8.2%',
    isPositive: true,
    icon: BarChart3,
    color: 'bg-green-500/10 text-green-600',
  },
  {
    label: 'Success Rate',
    value: '78.5%',
    change: '-2.1%',
    isPositive: false,
    icon: TrendingUp,
    color: 'bg-orange-500/10 text-orange-600',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span
                  className={`text-sm ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Chart Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Platform Growth
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="var(--color-primary)"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="exams"
              stroke="var(--color-chart-2)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between pb-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {item}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Activity {item}</p>
                  <p className="text-sm text-muted-foreground">
                    {item * 5} minutes ago
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
=======
"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExamCard } from "@/components/exam-card"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "aptitude", label: "Aptitude" },
  { value: "reasoning", label: "Reasoning" },
  { value: "gk", label: "General Knowledge" },
  { value: "english", label: "English" },
]

const levels = [
  { value: "all", label: "All Levels" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

const mockExams = [
  { id: 1, title: "Basic Mathematics", examNumber: 1, status: "completed" as const, category: "aptitude", level: "easy" },
  { id: 2, title: "Logical Reasoning I", examNumber: 2, status: "completed" as const, category: "reasoning", level: "easy" },
  { id: 3, title: "World Geography", examNumber: 3, status: "available" as const, category: "gk", level: "medium" },
  { id: 4, title: "Number Series", examNumber: 4, status: "locked" as const, category: "aptitude", level: "medium" },
  { id: 5, title: "Verbal Reasoning", examNumber: 5, status: "locked" as const, category: "reasoning", level: "medium" },
  { id: 6, title: "Indian History", examNumber: 6, status: "locked" as const, category: "gk", level: "hard" },
  { id: 7, title: "Data Interpretation", examNumber: 7, status: "locked" as const, category: "aptitude", level: "hard" },
  { id: 8, title: "Critical Reasoning", examNumber: 8, status: "locked" as const, category: "reasoning", level: "hard" },
  { id: 9, title: "Grammar Essentials", examNumber: 9, status: "locked" as const, category: "english", level: "easy" },
]

export default function UserDashboard() {
  const [category, setCategory] = useState("all")
  const [level, setLevel] = useState("all")

  const filteredExams = mockExams.filter((exam) => {
    const categoryMatch = category === "all" || exam.category === category
    const levelMatch = level === "all" || exam.level === level
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

>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  )
}
