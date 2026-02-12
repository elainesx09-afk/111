import { createClient } from "@supabase/supabase-js";

console.log("📦 supabaseClient: Carregando...");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

console.log("🔑 supabaseClient: URL configurada?", !!supabaseUrl);
console.log("🔑 supabaseClient: Key configurada?", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ supabaseClient: Variáveis de ambiente não configuradas! Usando valores vazios.");
  console.warn("   VITE_SUPABASE_URL:", supabaseUrl || "(não definida)");
  console.warn("   VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "[PRESENTE]" : "(não definida)");
}

try {
  export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  console.log("✅ supabaseClient: Cliente criado com sucesso");
} catch (error) {
  console.error("❌ supabaseClient: Erro ao criar cliente:", error);
  throw error;
}
