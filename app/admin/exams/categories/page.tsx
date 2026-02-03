'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import CreateCategoryModal from './_components/CreateCategoryModal'
import EditCategoryModal from './_components/EditCategoryModal'

interface Category {
  id: string
  name: string
  is_active: boolean
  created_at: string
}

export default function AdminCategoriesPage() {
  const supabase = createSupabaseClient()
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editCategory, setEditCategory] = useState<Category | null>(null)

  /* -------------------------------------------------------
     Fetch categories
  -------------------------------------------------------- */
  async function fetchCategories() {
    setLoading(true)

    const { data, error } = await supabase
      .from('exam_categories')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setCategories(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  /* -------------------------------------------------------
     Delete (soft delete) category
  -------------------------------------------------------- */
  async function handleDeleteCategory(categoryId: string) {
    // 1. Check if exams exist
    const { count, error: countError } = await supabase
      .from('exams')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)

    if (countError) {
      alert('Failed to verify category usage')
      return
    }

    if (count && count > 0) {
      alert('Cannot delete category. Exams exist under this category.')
      return
    }

    // 2. Soft delete
    const { error } = await supabase
      .from('exam_categories')
      .update({ is_active: false })
      .eq('id', categoryId)

    if (error) {
      alert('Failed to delete category')
      return
    }

    fetchCategories()
    router.refresh()
  }

  /* -------------------------------------------------------
     UI
  -------------------------------------------------------- */
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exam Categories</h1>
        <CreateCategoryModal onCreated={fetchCategories} />
      </div>

      {/* Content */}
      <Card className="p-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading categories…</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b last:border-b-0"
                >
                  <td className="py-3 font-medium">
                    {category.name}
                  </td>

                  <td className="py-3 text-right space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditCategory(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to delete this category?'
                          )
                        ) {
                          handleDeleteCategory(category.id)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Edit Modal */}
      {editCategory && (
        <EditCategoryModal
          category={editCategory}
          onClose={() => setEditCategory(null)}
          onUpdated={() => {
            setEditCategory(null)
            fetchCategories()
          }}
        />
      )}
    </div>
  )
}
