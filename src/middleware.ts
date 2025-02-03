import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(th|en)/:path*'],
};

/*import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// กำหนด route ที่ต้องการป้องกัน (ใส่ path ทั้งภาษาไทยและอังกฤษ)
const protectedRoutes = [
  '/dashboard', '/th/dashboard', '/en/dashboard',
  '/profile', '/th/profile', '/en/profile',
  '/settings', '/th/settings', '/en/settings'
];

// สร้าง intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// สร้าง auth middleware
const authMiddleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  
  // ตรวจสอบว่าเป็น route ที่ต้องการป้องกันหรือไม่
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // ดึง token จาก cookie
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // สร้าง URL สำหรับ redirect ไปหน้า login โดยรักษา locale ไว้
    const locale = pathname.startsWith('/th') ? 'th' : 'en';
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // TODO: เพิ่มการตรวจสอบ token
    return NextResponse.next();
  } catch (error) {
    const locale = pathname.startsWith('/th') ? 'th' : 'en';
    const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    response.cookies.delete('auth-token');
    return response;
  }
};

// Middleware หลักที่รวมทั้ง intl และ auth
export async function middleware(request: NextRequest) {
  // ทำ intl middleware ก่อน
  const response = await intlMiddleware(request);
  
  // จากนั้นทำ auth middleware
  if (response.status === 200) { // ถ้า intl middleware ผ่าน
    return authMiddleware(request);
  }
  
  return response;
}

// กำหนด matcher ให้ตรงกับทั้ง i18n และ protected routes
export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Match all internationalized pathnames
    '/', '/(th|en)/:path*'
  ]
};*/
