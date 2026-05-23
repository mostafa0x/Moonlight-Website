import Image from 'next/image';
import { TicketData } from '../types';
import { getTranslations } from 'next-intl/server';
import { clsx } from 'clsx';

interface TicketCardProps {
  data: TicketData;
  referenceId: string;
  locale: string;
}

/**
 * TicketCard: A premium, mobile-responsive ticket UI.
 * 
 * Optimized for:
 * - Server rendering.
 * - Minimal client JS.
 * - Performance (next/image for optimized paints).
 */
export async function TicketCard({ data, referenceId, locale }: TicketCardProps) {
  const t = await getTranslations({ locale, namespace: 'ticket' });


  // Format guests: Adults + Kids
  const guestCount = `${data.adults_number} ${t("adults")}${data.kids_number > 0 ? `, ${data.kids_number} ${t("kids")}` : ""}`;

  return (
    <div className="mx-auto w-full max-w-100 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-white/5 transition-all hover:scale-[1.01] duration-300 select-none">
      {/* Header Image */}
      <div className="relative w-full h-50">
        <Image
          src={data.package_image || "https://placehold.co/400x200"}
          alt={data.package_name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 440px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6 right-4 text-white">
          <h2 className="text-xl font-bold font-cairo leading-tight">
            {data.package_name}
          </h2>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="relative p-6 md:p-8 flex flex-col gap-6">
        {/* Watermark Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <div className="relative w-56 h-72 md:w-64 md:h-80 opacity-[0.08]">
            <Image
              src="/logo-white.svg"
              alt=""
              fill
              className="object-contain"
              sizes="300px"
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("date")}</span>
            <span className="text-white text-sm font-medium font-cairo">{data.tour_date}</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("totalAmount")}</span>
            <span className="text-white text-sm font-medium font-cairo">${data.total_amount}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("guests")}</span>
            <span className="text-white text-sm font-medium font-cairo">{guestCount}</span>
          </div>
        </div>

        {/* Full Width Info */}
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("pickupLocation")}</span>
          <div className="flex items-center gap-2">
            <img src="/icons/location-dot.svg" alt="" className="w-4 h-4" />
            <span className="text-white text-sm font-medium font-cairo truncate">
              {data.pickup_location || t("defaultPickupLocation")}
            </span>
          </div>
        </div>



      </div>
    </div>
  )
};
