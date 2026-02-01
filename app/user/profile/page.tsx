'use client'

import { useEffect, useState, useTransition } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Shield, Clock, Award } from 'lucide-react'

type Profile = {
  full_name: string | null
  phone_number: string | null
  avatar_url: string | null
}

export default function ProfilePage() {
  const supabase = createSupabaseClient()

  const [loading, setLoading] = useState(true)
  const [saving, startSaving] = useTransition()

  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone_number: '',
    avatar_url: null,
  })

  /* -------------------------------------------------------
     Fetch user + profile
  -------------------------------------------------------- */
  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setEmail(user.email ?? '')

      const { data } = await supabase
        .from('profiles')
        .select('full_name, phone_number, avatar_url')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [supabase])

  /* -------------------------------------------------------
     Update profile
  -------------------------------------------------------- */

  async function handleSave() {
    startSaving(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
  
      if (!user) return
  
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        avatar_url: profile.avatar_url,
      })
  
      if (error) {
        console.error('Profile update failed:', error.message)
        alert('Failed to save profile')
        return
      }
  
      alert('Profile updated successfully')
    })
  }
  

  if (loading) {
    return <p className="text-muted-foreground">Loading profile...</p>
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {profile.full_name?.[0]?.toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {profile.full_name || 'Unnamed User'}
            </h2>
            <p className="text-muted-foreground">{email}</p>
          </div>

          <Button variant="outline" disabled>
            Change Avatar
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        {/* Personal */}
        <TabsContent value="personal">
          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-bold">Personal Information</h2>

            <div>
              <Label>Full Name</Label>
              <Input
                value={profile.full_name ?? ''}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={email} disabled className="mt-2" />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                value={profile.phone_number ?? ''}
                onChange={(e) =>
                  setProfile({ ...profile, phone_number: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <Separator />
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Card>
        </TabsContent>

        {/* Security (UI only) */}
        <TabsContent value="security">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Change Password
            </h2>

            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm password" />
            <Button>Update Password</Button>
          </Card>
        </TabsContent>

        {/* Stats (static for now) */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 flex items-center gap-4">
              <Award className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Exams Completed</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">12 hrs</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
