import React from 'react';
import { ProfileFeature } from '@/features/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile | Moonlight Egypt',
  description: 'Manage your upcoming and past Egyptian adventures with Moonlight.',
};

export default function ProfilePage() {
  return (
    <main className="w-full min-h-screen bg-black pt-20">
      <ProfileFeature />
    </main>
  );
}
