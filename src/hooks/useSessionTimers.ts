import { useState, useEffect } from "react";

export const useSessionTimers = () => {
  const [sessionTimers, setSessionTimers] = useState<{
    [questId: string]: NodeJS.Timeout;
  }>({});

  const startSessionTimer = (
    questId: string,
    questName: string,
    expiresAt: string,
    onExpire: (questId: string, questName: string) => void
  ) => {
    const timeUntilExpiration = new Date(expiresAt).getTime() - Date.now();

    if (timeUntilExpiration <= 0) {
      onExpire(questId, questName);
      return;
    }

    const timer = setTimeout(() => {
      onExpire(questId, questName);
    }, timeUntilExpiration);

    setSessionTimers((prev) => ({ ...prev, [questId]: timer }));
  };

  const stopSessionTimer = (questId: string) => {
    setSessionTimers((prev) => {
      const timer = prev[questId];
      if (timer) {
        clearTimeout(timer);
      }
      const newTimers = { ...prev };
      delete newTimers[questId];
      return newTimers;
    });
  };

  const clearAllTimers = () => {
    Object.values(sessionTimers).forEach((timer) => clearTimeout(timer));
    setSessionTimers({});
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return {
    startSessionTimer,
    stopSessionTimer,
    clearAllTimers,
  };
};