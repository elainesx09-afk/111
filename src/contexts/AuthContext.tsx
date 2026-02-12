import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

console.log("📦 AuthContext: Carregando...");

type AuthContextType = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  signInWithPassword: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log("🔐 AuthProvider: Iniciando...");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log("🔐 AuthProvider: useEffect iniciado");
    let mounted = true;

    (async () => {
      try {
        console.log("🔐 AuthProvider: Buscando sessão...");
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        console.log("🔐 AuthProvider: Sessão obtida:", !!data.session);
        setSession(data.session ?? null);
        setLoading(false);
      } catch (error) {
        console.error("❌ AuthProvider: Erro ao buscar sessão:", error);
        if (mounted) {
          setSession(null);
          setLoading(false);
        }
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("🔐 AuthProvider: Auth state changed:", !!newSession);
      setSession(newSession ?? null);
      setLoading(false);
    });

    return () => {
      console.log("🔐 AuthProvider: Cleanup");
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextType>(() => {
    return {
      loading,
      session,
      user: session?.user ?? null,
      signInWithPassword: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { ok: false, error: error.message };
        return { ok: true };
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
    };
  }, [loading, session]);

  console.log("🔐 AuthProvider: Renderizando, loading =", loading, "user =", !!value.user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

console.log("✅ AuthContext: Definido");
