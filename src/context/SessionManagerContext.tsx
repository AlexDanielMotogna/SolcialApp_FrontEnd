"use client";
import { createContext, useContext, useRef } from "react";

type Session = {
  questId: string;
  sessionExpiresAt: string;
  status: "active" | "expired" | "finished";
  userId: string;
  walletaddress: string;
};

type SessionManagerContextType = {
  addSession: (session: Session) => void;
  removeSession: (questId: string) => void;
};

export const SessionManagerContext = createContext<SessionManagerContextType | null>(null);

export function useSessionManager() {
  return useContext(SessionManagerContext);
}

export function SessionManagerProvider({ children }: { children: React.ReactNode }) {
  const sessionsRef = useRef<{ [questId: string]: Session }>({});
  const timeoutsRef = useRef<{ [questId: string]: NodeJS.Timeout }>({});

  // Adds a session and schedules its expiration
  const addSession = (session: Session) => {
    console.log("addSession called with:", session);
    sessionsRef.current[session.questId] = session;

    // Clear any existing timeout for this questId
    if (timeoutsRef.current[session.questId]) {
      clearTimeout(timeoutsRef.current[session.questId]);
    }

    if (session.status === "active" && session.sessionExpiresAt) {
      const expiresAt = new Date(session.sessionExpiresAt).getTime();
      const now = Date.now();
      const timeLeft = expiresAt - now;

      if (timeLeft > 0) {
        timeoutsRef.current[session.questId] = setTimeout(() => {
            fetch("/api/user-quests/expire", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                questId: session.questId,
                userId: session.userId,
                walletaddress: session.walletaddress
            }),
            });
            // Mark as expired in memory
            sessionsRef.current[session.questId].status = "expired";
        }, timeLeft);
        } else {
        // Already expired, trigger immediately
        fetch("/api/user-quests/expire", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            questId: session.questId,
            userId: session.userId,
            walletaddress: session.walletaddress
            }),
        });
        sessionsRef.current[session.questId].status = "expired";
        }
    }
  };

  // Removes a session and its timeout
  const removeSession = (questId: string) => {
    if (timeoutsRef.current[questId]) {
      clearTimeout(timeoutsRef.current[questId]);
      delete timeoutsRef.current[questId];
    }
    delete sessionsRef.current[questId];
  };

  return (
    <SessionManagerContext.Provider value={{ addSession, removeSession }}>
      {children}
    </SessionManagerContext.Provider>
  );
}