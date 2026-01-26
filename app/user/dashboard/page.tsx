import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function UserDashboardPage() {
  const supabase = await createClient()

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Fetch daily status
  const { data: dailyStatus, error: statusError } = await supabase.rpc(
    'get_user_daily_status',
    { p_user_id: user.id }
  )

  if (statusError) {
    throw new Error(statusError.message)
  }

  // 3. TEMP: get first active category + level
  const { data: category } = await supabase
    .from('exam_categories')
    .select('id')
    .eq('is_active', true)
    .limit(1)
    .single()

  const { data: level } = await supabase
    .from('exam_levels')
    .select('id')
    .eq('is_active', true)
    .order('level_order')
    .limit(1)
    .single()

    console.log(category)

  let unlockedExam = null

  if (category && level) {
    const { data, error } = await supabase.rpc(
      'get_unlockable_exam',
      {
        p_user_id: user.id,
        p_category_id: category.id,
        p_level_id: level.id,
      }
    )

    if (error) {
      throw new Error(error.message)
    }

    unlockedExam = data?.[0] ?? null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back
      </h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
  title="Today's Status"
  value={dailyStatus?.has_attempted_today ? 'Completed' : 'Available'}
/>

<DashboardCard
  title="Current Streak"
  value={`${dailyStatus?.streak_days ?? 0} days`}
/>

<DashboardCard
  title="Can Attempt Exam"
  value={dailyStatus?.has_attempted_today ? 'No' : 'Yes'}
/>

      </div>

      {/* Unlocked Exam */}
      <div className="rounded-xl border bg-white p-4">
  <p className="text-sm text-slate-500">Today’s Unlocked Exam</p>

  {unlockedExam ? (
    <div className="mt-2">
      <p className="text-lg font-semibold">
        {unlockedExam.title}
      </p>
      <p className="text-sm text-slate-500">
        {unlockedExam.total_questions} questions · {unlockedExam.duration_minutes} mins
      </p>
    </div>
  ) : (
    <p className="mt-2 text-slate-500">
      No exam unlocked for today.
    </p>
  )}
</div>

    </div>
  )
}

function DashboardCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-medium">{value}</p>
    </div>
  )
}
