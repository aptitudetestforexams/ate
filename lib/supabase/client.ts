import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file. ' +
      'Get these from: https://supabase.com/dashboard/project/_/settings/api'
    )
  }

  return createBrowserClient(url, key, {
    isSingleton: true,
  })
}
