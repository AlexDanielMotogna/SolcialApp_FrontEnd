"use client";
import { ReactNode, useContext } from "react";
import { MockUserContext, MOCK_USER } from "@/context/MockUserContext";

export default function MockUserProvider({ children }: { children: ReactNode }) {
  return (
    <MockUserContext.Provider value={{ user: MOCK_USER }}>
      {children}
    </MockUserContext.Provider>
  );
}

// Hook para consumir el contexto
export function useMockUserProvider() {
  return useContext(MockUserContext);
}