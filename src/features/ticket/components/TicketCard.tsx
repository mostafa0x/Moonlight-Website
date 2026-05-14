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
              {data.pickup_location || "Lobby of your hotel"}
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-x-4">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("paymentMethod")}</span>

            <span className="text-white text-base font-semibold font-cairo uppercase">
              {data.payment_preference || "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-zinc-400 text-sm font-bold tracking-wider font-cairo uppercase">{t("totalAmount")}</span>
            <span className="text-white text-sm font-bold font-cairo">${data.total_amount.toFixed(2)}</span>
          </div>
        </div>
        {/* Divider */}
        <div className="relative z-10 py-4">
          <div className="absolute -left-8 -right-8 top-1/2 h-px border-t-2 border-dashed border-zinc-800" />
          <div className="absolute -left-11 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-white/10 rounded-full shadow-inner" />
          <div className="absolute -right-11 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-white/10 rounded-full shadow-inner" />
        </div>
        {/* Status Badge */}
        <div className={clsx("relative z-10 mt-2 w-full h-11 px-4 rounded-lg border flex items-center justify-between", isFullyPaid ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30")}>
          <span className={clsx("text-base font-bold font-inter tracking-wider", isFullyPaid ? "text-emerald-400" : "text-rose-500")}>
            {isFullyPaid ? t("paymentStatus") : t("amountDueAtPickup")}
          </span>
          <div className="flex items-center gap-2">
            {isFullyPaid && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <img src="/icons/check-ticket.svg" alt="" className="w-3 h-3" />
            </div>
            }
          </div>
          {isFullyPaid ?
            <span className="text-emerald-400 text-sm lg:text-base font-bold font-inter">
              {statusLabel}
            </span>
            :
            <span className="text-rose-500 text-base md:text-base font-bold font-inter">
              ${data.due_amount}
            </span>
          }
        </div>
      </div>
    </div>
  )
};
