import { createClient } from '@/lib/supabase/server'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

import {
  Search,
  MoreHorizontal,
  Plus,
  Mail,
  Shield,
  Trash2,
} from 'lucide-react'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  /* ----------------------------------------
     Fetch users (profiles + auth users)
     Middleware already enforces admin access
  ---------------------------------------- */
  const [{ data: profiles }, { data: authUsers }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, full_name, role, created_at')
      .order('created_at', { ascending: false }),

    supabase.auth.admin.listUsers(),
  ])

  const users =
    profiles?.map((profile) => {
      const authUser = authUsers?.users.find(
        (u) => u.id === profile.id
      )

      return {
        id: profile.id,
        name: profile.full_name ?? '—',
        email: authUser?.email ?? '—',
        role: profile.role === 'admin' ? 'Admin' : 'User',
        status: 'Active',
        examsCompleted: 0, // placeholder
        joinDate: new Date(profile.created_at).toLocaleDateString(),
      }
    }) ?? []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all users in your system
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Exams</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        user.role === 'Admin'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {user.role === 'Admin' && (
                        <Shield className="w-3 h-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-600"
                    >
                      Active
                    </Badge>
                  </TableCell>

                  <TableCell>{user.examsCompleted}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.joinDate}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>
                          Promote to Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
