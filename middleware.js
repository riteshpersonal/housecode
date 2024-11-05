import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/broker'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!token) {
    // If there is no token, allow access to all public routes
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing login or signup
  if (pathname === '/login' || pathname === '/signup') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  let userRole;
  
  // Determine which API to call based on the route
  if (pathname.startsWith('/admin')) {
    // Fetch admin data
    const adminRes = await fetch('http://localhost:3000/api/admin/admin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!adminRes.ok) {
      // If the token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { admins } = await adminRes.json();
    // console.log(admins, "admin");
    userRole = admins?.name === 'kamal' ? 'admin' : null;
  } else if (pathname.startsWith('/broker')) {
    // Fetch broker data
    const brokerRes = await fetch('http://localhost:3000/api/broker/broker', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const  broker  = await brokerRes.json();
    if (!brokerRes.ok) {
      // If the token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    userRole = broker?.role === 'broker' ? 'broker' : null;
  }

  // Role-based access control
  if (userRole === 'admin' && pathname.startsWith('/admin')) {
    return NextResponse.next(); // Admin can access /admin routes
  } else if (userRole === 'broker' && pathname.startsWith('/broker')) {
    return NextResponse.next(); // Broker can access /broker routes
  }

  // Restrict access if the user doesn't meet the role requirement
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/broker/:path*', '/login', '/signup'],
};
