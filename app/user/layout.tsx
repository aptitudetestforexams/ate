import { redirect } from 'next/navigation'
<<<<<<< HEAD
import { createClient } from '@/lib/supabase/server-auth'
=======
import { createClient } from '@/lib/supabase/server'
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
<<<<<<< HEAD
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') redirect('/admin/dashboard')
=======
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3

  return <>{children}</>
}
