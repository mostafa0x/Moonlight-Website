export interface Booking {
  id: string;
  packageId?: string;
  packageName: string;
  tourDate: string;
  tourTime?: string;
  status: 'upcoming' | 'cancelled' | 'completed' | 'Upcoming' | 'Cancelled' | 'Completed';
  paymentType: 'deposit' | 'full' | 'deposit Payment' | 'full Payment';
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
