import Link from 'next/link'
import { BookOpen, BarChart3, Settings, Zap, Users, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">ExamPlatform</h1>
              <p className="text-sm text-muted-foreground">Intelligent Exam Management System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Master Your Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            A comprehensive platform for creating, managing, and taking exams with real-time progress tracking and advanced analytics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-card border border-border text-foreground font-semibold hover:bg-secondary transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose ExamPlatform?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Features */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Daily Practice</h4>
              <p className="text-muted-foreground">
                Solve practice exams daily, maintain streaks, and unlock achievements as you progress.
              </p>
            </div>

            {/* Analytics */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Advanced Analytics</h4>
              <p className="text-muted-foreground">
                Track detailed performance metrics, identify weak areas, and measure improvement over time.
              </p>
            </div>

            {/* Admin Control */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Full Control</h4>
              <p className="text-muted-foreground">
                Create and manage exam content, set difficulty levels, and monitor all user activity.
              </p>
            </div>

            {/* Multiple Levels */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Multiple Levels</h4>
              <p className="text-muted-foreground">
                Customize exam difficulty from beginner to expert and challenge yourself progressively.
              </p>
            </div>

            {/* User Management */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">User Management</h4>
              <p className="text-muted-foreground">
                Manage user accounts, roles, permissions, and monitor engagement across the platform.
              </p>
            </div>

            {/* System Settings */}
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Configuration</h4>
              <p className="text-muted-foreground">
                Flexible settings for notifications, security, and platform-wide preferences.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Section */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-4">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">For Students</h3>
              <p className="text-muted-foreground mb-6">
                Start practicing today and improve your exam scores with our comprehensive question database.
              </p>
              <Link
                href="/login?mode=signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200"
              >
                Create Student Account
              </Link>
            </div>
          </div>

          {/* Admin Section */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary mb-4">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">For Administrators</h3>
              <p className="text-muted-foreground mb-6">
                Create exams, manage content, view detailed reports, and control the entire platform.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>&copy; 2024 ExamPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
