import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { adaptarProductoSupabase } from "../../../lib/productosSupabase";
import NuevoIngresoCard from "../../../components/NuevoIngresoCard";
import ProductModalPreview from "../../../components/ProductModalPreview";

// Es una página de verificación en tiempo real — sin esto, Next.js la
// puede cachear y mostrar datos viejos después de un cambio en Supabase
// (pasó varias veces: se veía "cache del navegador" pero en realidad
// esta página server-side estaba sirviendo una respuesta vieja).
export const dynamic = "force-dynamic";

export default async function PreviewSupabasePage({ params }) {
  const supabase = getSupabaseAdmin();

  const { data: producto, error } = await supabase
    .from("productos")
    .select("*, producto_fichas(*), producto_imagenes(*)")
    .eq("codigo", params.codigo)
    .single();

  if (error || !producto) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <p>No se encontró el producto {params.codigo}.</p>
      </div>
    );
  }

  const productoAdaptado = adaptarProductoSupabase(producto);

  return (
    <div className="container" style={{ padding: "40px 0 90px" }}>
      <div
        className="stamp"
        style={{
          background: "#FBF6EC",
          border: "1px solid var(--oro)",
          borderRadius: 4,
          padding: "10px 16px",
          marginBottom: 32,
          color: "var(--oro-deep)",
          fontSize: 11,
        }}
      >
        Vista previa interna (datos de Supabase) — esta página no es parte de la web pública todavía.
      </div>

      <p className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 16 }}>
        Cómo se ve en la tira de Nuevos ingresos:
      </p>
      <div style={{ width: 280, marginBottom: 40 }}>
        <NuevoIngresoCard producto={productoAdaptado} />
      </div>

      <p className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
        Código {producto.codigo} · Estado {producto.estado} · Stock {producto.stock}
      </p>

      <p className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", margin: "32px 0 16px" }}>
        Ficha completa (lo que se abre al apretar "Ver producto"):
      </p>
      <ProductModalPreview producto={productoAdaptado} />
    </div>
  );
}
