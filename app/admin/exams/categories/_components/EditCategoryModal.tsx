'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Category {
  id: string
  name: string
  is_active: boolean
}

interface EditCategoryModalProps {
  category: Category
  onClose: () => void
  onUpdated: () => void
}

export default function EditCategoryModal({
  category,
  onClose,
  onUpdated,
}: EditCategoryModalProps) {
  const supabase = createSupabaseClient()

  const [name, setName] = useState(category.name)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpdate() {
    if (!name.trim()) {
      setError('Category name is required')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('exam_categories')
      .update({ name: name.trim() })
      .eq('id', category.id)

    if (error) {
      setError('Failed to update category')
      setLoading(false)
      return
    }

    setLoading(false)
    onUpdated()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
