<<<<<<< HEAD
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  Settings,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const adminMenuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: BarChart3,
  },
  {
    label: 'Exams',
    href: '/admin/exams',
    icon: BookOpen,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: FileText,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">
                ExamHub
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {adminMenuItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
=======
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
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  )
}
