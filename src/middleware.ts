import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const locales = ["en", "fr", "it", "es", "pt"];
const defaultLocale = "en";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default async function middleware(request: NextRequest) {
  // 1. تشغيل الـ i18n middleware
  let response = intlMiddleware(request);

  // 2. إعداد الـ Supabase Client لتحديث الجلسة (Session)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. تحديث الجلسة (مهم جداً للدخول)
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - api routes
     * - _next (static files, image optimization)
     * - static files (xml, html, txt, images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|.*\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
