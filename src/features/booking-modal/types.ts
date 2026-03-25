export interface BookingContextProps {
  isOpen: boolean;
  tourId: string;
  lang: string;
  step: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  handleSetTourId: (tour: string) => void;
  setTotalSteps: (total: number) => void;
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
