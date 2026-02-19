"use client";

import { createContext, use, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: null,
  to: null,
};

function ReservarionProvider({ children }) {
  const [range, setRange] = useState(initialState);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = use(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside of its provider");

  return context;
}

export { ReservarionProvider, useReservation };
