import { createClient } from "@supabase/supabase-js";

// Cliente solo para usar del lado del servidor (API routes). Usa la
// service role key, que puede escribir en "pedidos". Nunca importar
// este archivo desde un componente de cliente.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
