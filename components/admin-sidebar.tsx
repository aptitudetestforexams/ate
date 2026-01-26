"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  FileCode,
  BookOpen,
  Trophy,
  Users,
  Settings,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: FileText, label: "Exams", href: "#", active: true },
  { icon: HelpCircle, label: "Questions", href: "#" },
  { icon: FileCode, label: "CMS Pages", href: "#" },
  { icon: BookOpen, label: "Blog", href: "#" },
  { icon: Trophy, label: "Leaderboard", href: "#" },
  { icon: Users, label: "Users", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground">
            <span className="text-sm font-bold text-background">E</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">ExamAdmin</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
