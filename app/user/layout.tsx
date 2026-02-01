import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server-auth'
import { UserSidebar } from '@/components/user-sidebar'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <UserSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
