"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { cancelBookingAction } from "../actions/bookingActions";

const ConfirmationModal = dynamic(() => import("../components/CancelButton/ConfirmationModal"), { ssr: false });
const ErrorModal = dynamic(() => import("../components/CancelButton/ErrorModal"), { ssr: false });

interface CancellationContextType {
  openCancelModal: (id: string) => void;
  isPending: boolean;
}

const CancellationContext = createContext<CancellationContextType | undefined>(undefined);

export const CancellationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const openCancelModal = (id: string) => {
    setBookingId(id);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!bookingId) return;
    
    startTransition(async () => {
      const result = await cancelBookingAction(bookingId);
      if (result.success) {
        setShowModal(false);
        setBookingId(null);
      } else {
        setShowModal(false);
        setErrorKey(result.error || "CANCEL_FAILED");
      }
    });
  };

  return (
    <CancellationContext.Provider value={{ openCancelModal, isPending }}>
      {children}
      {showModal && (
        <ConfirmationModal 
          onConfirm={handleConfirm} 
          onClose={() => setShowModal(false)} 
          isPending={isPending} 
        />
      )}
      {errorKey && (
        <ErrorModal 
          errorKey={errorKey} 
          onClose={() => setErrorKey(null)} 
        />
      )}
    </CancellationContext.Provider>
  );
};

export const useCancellation = () => {
  const context = useContext(CancellationContext);
  if (!context) throw new Error("useCancellation must be used within CancellationProvider");
  return context;
};
