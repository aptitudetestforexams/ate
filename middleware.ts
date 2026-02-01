import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  /* ----------------------------------------
     1️⃣ NOT LOGGED IN → block admin & user
  ----------------------------------------- */
  if (!user) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  /* ----------------------------------------
     2️⃣ LOGGED IN → redirect by role (single profile fetch, no loop)
  ----------------------------------------- */
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    const role = profile?.role

    if (pathname === '/login') {
      const dashboard =
        role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      return NextResponse.redirect(new URL(dashboard, request.url))
    }
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }
    if (pathname.startsWith('/user') && role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login'],
}
