export interface Booking {
  id: string;
  packageId?: string;
  packageName: string;
  tourDate: string;
  tourTime?: string;
  status: 'Confirmed' | 'Confirmed deposit' | 'Cancellation requested' | 'Cancelled' | 'Failed' | 'pending';
  paymentType: 'deposit' | 'full';
  price: number;
  currency: string;
  imageUrl: string;
  ticketUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}
