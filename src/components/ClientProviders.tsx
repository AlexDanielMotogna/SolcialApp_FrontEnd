"use client"; // ✅ ESTO ES CLAVE

import { SessionProvider } from "next-auth/react";
import { NotificacionesProvider } from "@/context/NotificacionesContext";
import { SessionManagerProvider } from "@/context/SessionManagerContext";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <SessionManagerProvider>
        <NotificacionesProvider>
          {children}
        </NotificacionesProvider>
      </SessionManagerProvider>
    </SessionProvider>
  );
}