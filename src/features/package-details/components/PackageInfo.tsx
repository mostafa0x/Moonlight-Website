import type { PackageDetailsType } from "@/shared/global";
import { getTranslations } from "next-intl/server";

/**
 * PackageInfo - Server Component
 * Displays package name, badge, duration, and group size info.
 * Above-the-fold content, rendered on server for optimal LCP.
 */
interface PackageInfoProps {
  pkg: PackageDetailsType;
  locale: string
}

export default async function PackageInfo({ pkg, locale }: PackageInfoProps) {
  const t = await getTranslations({ locale, namespace: "packageDetails" });

  return (
    <div className="mb-4 md:mb-6">
      {/* Package Title */}
      <h1 className="text-xl md:text-4xl font-bold text-[#F2C975] font-cairo uppercase tracking-wide">
        {pkg.packageName}
      </h1>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-3 md:mt-4">
        {/* Group Badge */}
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34D399"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-emerald-400 text-sm md:text-base font-medium font-cairo">
            {t("morePeopleLessPrice")}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F2C975"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="flex flex-col">
            <span className="text-stone-400 text-xs md:text-sm font-medium font-cairo leading-tight">
              {t("duration")}
            </span>
            <span className="text-white text-sm md:text-base font-bold font-cairo leading-tight">
              {t("hours")}
            </span>
          </div>
        </div>

        {/* Group Size */}
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F2C975"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <div className="flex flex-col">
            <span className="text-stone-400 text-xs md:text-sm font-medium font-cairo leading-tight">
              {t("groupSize")}
            </span>
            <span className="text-white text-sm md:text-base font-bold font-cairo leading-tight">
              1 - 12 {t("persons")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
