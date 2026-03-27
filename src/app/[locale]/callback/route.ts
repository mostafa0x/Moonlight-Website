import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const urlSegments = new URL(request.url).pathname.split("/");
  const locale = urlSegments[1] || "en";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              // هيندلع هنا لو الكوكيز مش مسموح تتعدل في اللحظة دي
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // بناء رابط الريدايركت: لو الـ next بتبدأ بـ '/' نضمن إن اللوجات موجودة
      const finalPath = next.startsWith("/") ? `/${locale}${next}` : next;
      
      // نرجع للمكان اللي كنا فيه، لو الـ path فيه تكرار للغة هنصلحه
      const finalUrl = new URL(finalPath.replace(new RegExp(`^/${locale}/${locale}`), `/${locale}`), origin);
      
      return NextResponse.redirect(finalUrl);
    }
  }

  // في حالة الفشل نرجع لصفحة البداية باللغة الحالية
  return NextResponse.redirect(`${origin}/${locale}`);
}
