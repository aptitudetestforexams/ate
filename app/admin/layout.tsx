<<<<<<< HEAD
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server-auth'
import { AdminSidebar } from '@/components/admin-sidebar'
=======
// app/admin/layout.tsx

export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3

export default async function AdminLayout({
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
=======

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const {
    data: profile,
    error: profileError,
  } = await supabase
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

<<<<<<< HEAD
  if (profile?.role !== 'admin') redirect('/user/dashboard')

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
=======
  if (profileError || profile?.role !== 'admin') {
    redirect('/unauthorized')
  }

  return <>{children}</>
>>>>>>> 65af45917c67d13b911016a7bbd7d9c5361639a3
}
