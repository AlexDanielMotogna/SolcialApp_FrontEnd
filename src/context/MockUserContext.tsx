"use client";
import { createContext, useContext } from "react";

export const MOCK_USER = {
  id: "6883f941a7f69d335b0d2184",
  name: "Demo User",
  email: "demo@demo.com",
  walletaddress: "71GCQWTyYyjSoRYym14XQ1PjMQYu13M9qEnGcX3ZXjm6",
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
