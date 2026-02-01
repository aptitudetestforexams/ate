'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Download, Calendar, Filter } from 'lucide-react'

const performanceData = [
  { exam: 'Math 101', avgScore: 75, passRate: 85 },
  { exam: 'English 101', avgScore: 68, passRate: 78 },
  { exam: 'Science 101', avgScore: 72, passRate: 80 },
  { exam: 'History 101', avgScore: 70, passRate: 75 },
  { exam: 'CS 101', avgScore: 80, passRate: 90 },
]

const completionData = [
  { name: 'Completed', value: 65, fill: 'var(--color-primary)' },
  { name: 'In Progress', value: 25, fill: 'var(--color-chart-2)' },
  { name: 'Not Started', value: 10, fill: 'var(--color-muted)' },
]

const timeSeriesData = [
  { week: 'Week 1', attempts: 120, completed: 98 },
  { week: 'Week 2', attempts: 150, completed: 125 },
  { week: 'Week 3', attempts: 180, completed: 155 },
  { week: 'Week 4', attempts: 220, completed: 190 },
  { week: 'Week 5', attempts: 250, completed: 220 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Analyze exam performance and user engagement
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-col md:flex-row">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none bg-transparent">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
        <Button variant="outline" className="gap-2 flex-1 md:flex-none bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Performance */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Exam Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="exam" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgScore"
                fill="var(--color-primary)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="passRate"
                fill="var(--color-chart-2)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Completion Status */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Completion Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Time Series */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Attempts & Completion Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="attempts"
                stroke="var(--color-primary)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Average Pass Rate
          </p>
          <h3 className="text-3xl font-bold text-foreground">82.1%</h3>
          <p className="text-sm text-green-600 mt-2">+2.3% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Average Score
          </p>
          <h3 className="text-3xl font-bold text-foreground">73.2</h3>
          <p className="text-sm text-orange-600 mt-2">-1.5% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Total Attempts
          </p>
          <h3 className="text-3xl font-bold text-foreground">920</h3>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </Card>
      </div>
    </div>
  )
}
