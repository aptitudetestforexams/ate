'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup' | 'forgot'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createSupabaseClient()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  /* ---------------------------------------------
     LOGIN
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

    await supabase.auth.getSession()
    router.refresh()

    router.replace(
      profile.role === 'admin'
        ? '/admin/dashboard'
        : '/user/dashboard'
    )
  }

  /* ---------------------------------------------
     SIGNUP
  ---------------------------------------------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!fullName || !phoneNumber) {
      setError('Full name and phone number are required')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error || !data.user) {
      setError(error?.message ?? 'Signup failed')
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        full_name: fullName,
        phone_number: phoneNumber,
        role: 'user',
      })

    if (profileError) {
      setError('Profile creation failed')
      setLoading(false)
      return
    }

    setMessage('Signup successful. Please check your email to confirm.')
    setLoading(false)
  }

  /* ---------------------------------------------
     FORGOT PASSWORD
  ---------------------------------------------- */
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMessage('Password reset link sent to your email.')
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={
          mode === 'login'
            ? handleLogin
            : mode === 'signup'
            ? handleSignup
            : handleForgotPassword
        }
        className="w-full max-w-sm space-y-4 rounded-xl border bg-white p-6"
      >
        <h1 className="text-xl font-semibold text-slate-900 capitalize">
          {mode === 'login'
            ? 'Login'
            : mode === 'signup'
            ? 'Sign Up'
            : 'Forgot Password'}
        </h1>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-3 py-2"
        />

        {mode !== 'forgot' && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border px-3 py-2"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-slate-900 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading
            ? 'Please wait…'
            : mode === 'login'
            ? 'Login'
            : mode === 'signup'
            ? 'Create Account'
            : 'Send Reset Link'}
        </button>

        <div className="flex justify-between text-sm text-slate-600">
          {mode !== 'login' && (
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setMessage(null)
                setError(null)
              }}
              className="hover:underline"
            >
              Back to Login
            </button>
          )}

          {mode === 'login' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode('signup')
                  setError(null)
                }}
                className="hover:underline"
              >
                Sign up
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('forgot')
                  setError(null)
                }}
                className="hover:underline"
              >
                Forgot?
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
