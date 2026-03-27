"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/shared/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthUserInfo {
  name: string | null;
  email: string | null;
  avatar: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userData: AuthUserInfo | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const userData: AuthUserInfo | null = user ? {
    name: user.user_metadata.full_name || user.user_metadata.name || null,
    email: user.email || null,
    avatar: user.user_metadata.avatar_url || user.user_metadata.picture || null,
  } : null;

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userData,
      loading,
      signOut,
      isLoggedIn: !!user,
      showLoginModal,
      setShowLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
