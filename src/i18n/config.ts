/**
 * Shared i18n configuration — Single source of truth for all locale references.
 *
 * Import from here instead of hardcoding locale arrays across the codebase.
 */

export const locales = ["en", "fr", "it", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
