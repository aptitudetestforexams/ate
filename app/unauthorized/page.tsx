<<<<<<< HEAD
import Link from 'next/link'
import { Shield, Home } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Access Denied
        </h1>
        
        <p className="text-muted-foreground mb-8 text-lg">
          You do not have permission to access this page. Admin access is required.
        </p>

        <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4 mb-8 text-sm text-foreground">
          <p>If you believe this is an error, please contact an administrator.</p>
        </div>

        <Link
          href="/user/dashboard"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Return to Dashboard
        </Link>
=======
export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-slate-900">
          Access Denied
        </h1>
        <p className="mt-2 text-slate-600">
          You do not have permission to access this page.
        </p>
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
      </div>
    </div>
  )
}
