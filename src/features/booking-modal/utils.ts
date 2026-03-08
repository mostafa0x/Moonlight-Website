import type { PricingTier } from "@/features/booking-modal/types";

export const calculatePrice = (
  count: number,
  pricingTiers: PricingTier[] = [],
) => {
  const tier = pricingTiers.find((t) => count >= t.minPax && count <= t.maxPax);
  return tier ? tier.pricePerPerson * count : 0;
};
