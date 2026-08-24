import { createClient } from "@supabase/supabase-js";

// Cliente para usar en el navegador y en componentes de servidor de solo
// lectura (usa la clave pública "anon", que solo puede leer lo permitido
// por las políticas de seguridad definidas en supabase/schema.sql).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
