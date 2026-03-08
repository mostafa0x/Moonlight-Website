import type { PricingTier } from "@/features/booking-modal/types";

export const calculatePrice = (
  totalCount: number,
  count: number,
  pricingTiers: PricingTier[] = [],
) => {
  const tier = pricingTiers.find(
    (t) => totalCount >= t.minPax && totalCount <= t.maxPax,
  );
  return tier ? tier.pricePerPerson * count : 0;
};
