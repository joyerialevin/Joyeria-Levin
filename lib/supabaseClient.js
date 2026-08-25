import { createClient } from "@supabase/supabase-js";

// Igual que con los otros clientes: se crea recién cuando se usa, no al
// cargar el módulo, para que Next.js no intente conectarse durante el
// proceso de build.
let client;

export function getSupabase() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
}
