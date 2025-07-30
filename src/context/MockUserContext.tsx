"use client";
import { createContext, useContext } from "react";

export const MOCK_USER = {
  id: "68833fafe943b5391dd5d821",
  name: "Demo User",
  email: "demo@demo.com",
  walletaddress: "0x1234567890abcdef1234567890abcdef12345644",
  hasTwitterAccess: true,
};


interface MockUserContextType {
  user: typeof MOCK_USER;
}

export const MockUserContext = createContext<MockUserContextType>({
  user: MOCK_USER,
});

export function useMockUser() {
  const context = useContext(MockUserContext);
  if (!context) {
    throw new Error("useMockUser must be used within a MockUserProvider");
  }
  return context.user;
}
