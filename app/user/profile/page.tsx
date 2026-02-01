'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Shield, Clock, Award } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Header */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since January 2024
            </p>
          </div>
          <Button variant="outline">Change Avatar</Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        {/* Personal Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    defaultValue="John"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    defaultValue="Doe"
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john.doe@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>
              <Separator />
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-pass">Current Password</Label>
                <Input
                  id="current-pass"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="new-pass">New Password</Label>
                <Input
                  id="new-pass"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="confirm-pass">Confirm Password</Label>
                <Input
                  id="confirm-pass"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2"
                />
              </div>
              <Separator />
              <Button>Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Active Sessions
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Current Device</p>
                  <p className="text-sm text-muted-foreground">
                    Chrome on Windows • Last active now
                  </p>
                </div>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exams Completed</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <p className="text-2xl font-bold text-foreground">12 hrs</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { exam: 'Math 101', date: '2024-01-25', score: '85%' },
                { exam: 'English 101', date: '2024-01-20', score: '78%' },
                { exam: 'Science 101', date: '2024-01-15', score: '92%' },
                { exam: 'History 101', date: '2024-01-10', score: '88%' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.exam}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    {activity.score}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
