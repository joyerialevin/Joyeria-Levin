import { createClient } from "@supabase/supabase-js";

// Igual que con Mercado Pago: se crea recién cuando se usa, no al cargar
// el módulo, para que Next.js no intente conectarse durante el build.
let client;

export function getSupabaseAdmin() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return client;
}
