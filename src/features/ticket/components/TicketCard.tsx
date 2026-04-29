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


  const isFullyPaid = data.due_amount <= 0;
  const statusLabel = isFullyPaid ? t("fullyPaid") : t("depositPaid");

  // Format guests: Adults + Kids
  const guestCount = `${data.adults_number} Adults${data.kids_number > 0 ? `, ${data.kids_number} Kids` : ""}`;

  return (
    <div className="mx-auto w-full max-w-100 bg-white rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.01] duration-300 select-none">
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
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-4 text-white">
          <h2 className="text-xl font-bold font-cairo leading-tight">
            {data.package_name}
          </h2>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-sm font-bold tracking-wider font-cairo uppercase">{t("date")}</span>
            <span className="text-black text-sm font-medium font-cairo">{data.tour_date}</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-sm font-bold tracking-wider font-cairo uppercase">{t("guests")}</span>
            <span className="text-black text-sm font-medium font-cairo">{guestCount}</span>
          </div>

        </div>

        {/* Full Width Info */}
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500 text-sm font-bold tracking-wider font-cairo uppercase">{t("pickupLocation")}</span>
          <div className="flex items-center gap-2">
            <img src="/icons/location-dot.svg" alt="" className="w-4 h-4" />
            <span className="text-black text-sm font-medium font-cairo truncate">
              {data.pickup_location || "Lobby of your hotel"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-sm font-bold tracking-wider font-cairo uppercase">{t("paymentMethod")}</span>

            <span className="text-black text-base font-semibold font-cairo uppercase">
              {data.payment_preference || "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-zinc-500 text-sm font-bold tracking-wider font-cairo uppercase">{t("totalAmount")}</span>
            <span className="text-black text-sm font-bold font-cairo">${data.total_amount.toFixed(2)}</span>
          </div>
        </div>
        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute -left-8 -right-8 top-1/2 h-px border-t-2 border-dashed border-stone-300" />
          <div className="absolute -left-11 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-100 rounded-full shadow-inner" />
          <div className="absolute -right-11 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-100 rounded-full shadow-inner" />
        </div>
        {/* Status Badge */}
        <div className={clsx("mt-2 w-full h-11 px-4 rounded-lg flex items-center justify-between", isFullyPaid ? "bg-emerald-500/10 border-emerald-500/30" : "bg-[#CF142B]/10 border-[#CF142B]/30")}>
          <span className={clsx("text-base font-bold font-inter tracking-wider", isFullyPaid ? "text-emerald-800" : "text-[#CF142B]")}>
            {isFullyPaid ? t("paymentStatus") : t("amountDueAtPickup")}
          </span>
          <div className="flex items-center gap-2">
            {isFullyPaid && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <img src="/icons/check-ticket.svg" alt="" className="w-3 h-3" />
            </div>
            }
          </div>
          {isFullyPaid ?
            <span className="text-emerald-800 text-sm lg:text-base font-bold font-inter">
              {statusLabel}
            </span>
            :
            <span className="text-[#CF142B] text-base md:text-base font-bold font-inter">
              ${data.due_amount}
            </span>
          }
        </div>
      </div>
    </div>
  )
};
