// app/auth/callback/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server-auth'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams

  if (!code) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Exchange auth code for a session and set cookies
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Auth callback error:', error.message)
    redirect('/login')
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    redirect('/admin/dashboard')
  }
  redirect('/user/dashboard')
}
