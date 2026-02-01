'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'

<<<<<<< HEAD
export default function LoginPage() {
  const router = useRouter()
  const supabase = createSupabaseClient()

=======
type Mode = 'login' | 'signup' | 'forgot'

export default function LoginPage() {
  const supabase = createSupabaseClient()
  const router = useRouter()

  const [mode, setMode] = useState<Mode>('login')
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
<<<<<<< HEAD

  /* ---------------------------------------------
     1️⃣ Login submit
  ---------------------------------------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (authError || !data.user) {
      setError(authError?.message ?? 'Login failed')
      setLoading(false)
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile?.role) {
      setError('Unable to determine user role')
      setLoading(false)
      return
    }

    /* 🔑 CRITICAL: refresh auth state */
    await supabase.auth.getSession()
    router.refresh()

    if (profile.role === 'admin') {
      router.replace('/admin/dashboard')
    } else if (profile.role === 'user') {
      router.replace('/user/dashboard')
    } else {
      router.replace('/user/dashboard')
=======
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/user/dashboard')
      }

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setMessage('Check your email to verify your account.')
      }

      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${location.origin}/reset-password`,
        })
        if (error) throw error
        setMessage('Password reset link sent to your email.')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
    }
  }

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6"
      >
        <h1 className="text-xl font-semibold text-slate-900">Login</h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-900 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
=======
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Exam Platform
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'signup' && 'Create a new account'}
            {mode === 'forgot' && 'Reset your password'}
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-emerald-600">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                ? 'Login'
                : mode === 'signup'
                ? 'Create Account'
                : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-500 space-y-2">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('forgot')} className="hover:underline">
                  Forgot password?
                </button>
                <div>
                  Don’t have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-slate-900 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}

            {(mode === 'signup' || mode === 'forgot') && (
              <button
                onClick={() => setMode('login')}
                className="hover:underline"
              >
                Back to login
              </button>
            )}
          </div>
        </div>
      </div>
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
    </div>
  )
}
