import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { ExamsTable } from "@/components/exams-table"
import { CreateExamModal } from "@/components/create-exam-modal"

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-60">
        <AdminHeader title="Exams" />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Manage Exams</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Create, edit, and manage your examination content
              </p>
            </div>
            <CreateExamModal />
          </div>
          <ExamsTable />
        </main>
      </div>
    </div>
  )
}
