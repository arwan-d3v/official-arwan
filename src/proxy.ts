import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with cross-site request forgery (CSRF) or auth session sync.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const isDashboard = url.pathname.startsWith('/dashboard');
  const isAdminRoute = url.pathname.startsWith('/dashboard/admin') || url.pathname.startsWith('/dashboard/services');

  // Logic Intersepsi: Hybrid Architecture (Owner vs Tenant)
  // For production, you might compare hostname against process.env.NEXT_PUBLIC_ROOT_DOMAIN

  // 1. Dashboard Protection
  if (isDashboard && !user) {
    // If trying to access dashboard without auth, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 1b. Admin Route Protection (RBAC)
  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (!profile || (profile.role !== 'admin' && profile.role !== 'superadmin')) {
      // Redirect unauthorized users to the safe dashboard area
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // 2. Subdomain Routing Logic (Tenant Architecture)
  // Example: user.kiroix.com -> Rewrite to /[username]
  // Example: user.localhost:3000 -> Rewrite to /[username]
  const hostWithoutPort = hostname.split(':')[0];
  const isLocalhost = hostWithoutPort.endsWith('localhost');
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'kiroix.com';

  if (isLocalhost) {
    if (hostWithoutPort !== 'localhost') {
      const subdomain = hostWithoutPort.substring(0, hostWithoutPort.indexOf('.localhost'));
      // Rewrite the request to our dynamic route
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, request.url));
    }
  } else if (hostname !== rootDomain && hostname.endsWith(`.${rootDomain}`)) {
    const subdomain = hostname.replace(`.${rootDomain}`, '');
    // Rewrite the request to our dynamic route
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, request.url));
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
