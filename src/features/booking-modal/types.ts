export interface BookingContextProps {
  isOpen: boolean;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  handleSetTourId: (tour: string) => void;
}

export type PricingTier = {
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
};

export type Included_ExcludedType = {
  title: string;
  icon: "red" | "green";
};
