'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CreateCategoryModalProps {
  onCreated: () => Promise<void>
}

export default function CreateCategoryModal({
  onCreated,
}: CreateCategoryModalProps) {
  const supabase = createSupabaseClient()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate() {
    if (!name.trim()) {
      setError('Category name is required')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('exam_categories')
      .insert({
        name: name.trim(),
        is_active: true,
      })

    if (error) {
      setError('Failed to create category')
      setLoading(false)
      return
    }

    setName('')
    setOpen(false)
    setLoading(false)

    await onCreated()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ✅ THIS is the missing button */}
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating…' : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
