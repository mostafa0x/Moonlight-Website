export interface BookingContextProps {
  isOpen: boolean;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}
