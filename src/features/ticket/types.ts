export interface TicketData {
  tour_date: string;
  tour_time?: string;
  adults_number: number;
  kids_number: number;
  pickup_location: string | null;
  payment_preference: 'full' | 'deposit';
  total_amount: number;
  due_amount: number;
  package_name: string;
  package_image: string;
}

export interface TicketResponse {
  status: string;
  data: TicketData;
}
