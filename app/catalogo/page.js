import { supabase } from "../../lib/supabaseClient";
import CatalogoClient from "../../components/CatalogoClient";

export const revalidate = 60; // vuelve a pedir los productos cada 60s

export default async function CatalogoPage() {
  const { data: productos, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("creado_en", { ascending: false });

  if (error) {
    return (
      <div className="container" style={{ padding: "60px 0" }}>
        <p>No se pudieron cargar los productos. Intentá de nuevo más tarde.</p>
      </div>
    );
  }

  return <CatalogoClient productos={productos || []} />;
}
