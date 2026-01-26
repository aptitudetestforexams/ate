export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-slate-900">
          Access Denied
        </h1>
        <p className="mt-2 text-slate-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  )
}
