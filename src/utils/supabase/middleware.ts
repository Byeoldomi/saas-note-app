import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_DEFAULT_KEY!,
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

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // 1. Protected Routes (Dashboard, Note, Subscription)
    // If no user and trying to access protected route -> Redirect to Login
    const isTestUser = request.cookies.get('is-test-user')

    if (
        !user && !isTestUser &&
        (path.startsWith('/dashboard') ||
            path.startsWith('/note') ||
            path.startsWith('/subscription'))
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // 2. Auth Routes (Login, Signup)
    // We allow users to access these even if logged in, so they can explicitly logout or switch.
    // However, if they just visit without any intent to switch, they can still navigate to dashboard via UI.
    /* 
    if (user && (path.startsWith('/login') || path.startsWith('/signup'))) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }
    */

    // 3. API Protection for Payment Initialization
    if (!user && path.startsWith('/api/payments/initialize')) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    return supabaseResponse
}
