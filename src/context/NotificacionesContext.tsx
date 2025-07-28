"use client";
import { createContext, useContext, useState } from "react";
export const NotificacionesContext = createContext<any>(null);
export const useNotificaciones = () => useContext(NotificacionesContext);

export function NotificacionesProvider({ children }: { children: React.ReactNode }) {
  const [mensaje, setMensaje] = useState<string | null>(null);
  return (
    <NotificacionesContext.Provider value={{ mensaje, setMensaje }}>
      {children}
      {mensaje && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded z-50">
          {mensaje}
          <button onClick={() => setMensaje(null)} className="ml-2">Close</button>
        </div>
      )}
    </NotificacionesContext.Provider>
  );
}