import type { Session } from "@supabase/gotrue-js";
import {
  createContext, useState,
  type Dispatch,
  type SetStateAction
} from "react";

type SessionContextProps = {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  clearSession: () => void;
}

export const SessionContext = createContext<SessionContextProps | null>(null);
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [ session, setSession ] = useState<SessionContextProps[ "session" ] | null>(() => {
    const session = localStorage.getItem('session');
    if (!session) return null;
    return JSON.parse(session);
  });

  function clearSession() {
    const currentSession = localStorage.getItem('session');
    if (currentSession) localStorage.removeItem('session');
    setSession(null);
  }

  return <SessionContext.Provider value={{ session, setSession, clearSession }}>{children}</SessionContext.Provider>;
}