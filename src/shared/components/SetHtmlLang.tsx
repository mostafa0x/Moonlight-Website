"use client";

import { useEffect } from "react";

/**
 * Updates the <html lang=""> attribute on the client side.
 * Needed because the root layout sets lang="en" by default,
 * and nested layouts can't re-declare <html> tags.
 */
export default function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
