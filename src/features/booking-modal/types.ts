export interface BookingContextProps {
  isOpen: boolean;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

export type PricingTier = {
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
};
