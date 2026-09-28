import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import NuevoIngresoCard from "../../../components/NuevoIngresoCard";
import ProductModalPreview from "../../../components/ProductModalPreview";

const TIPO_LABEL_CORTO = { dama: "Dama", caballero: "Caballero" };

// Adapta una fila de Supabase (productos + producto_fichas + producto_imagenes)
// a la forma que espera NuevoIngresoCard/ProductModal (pensados originalmente
// para Sanity), para previsualizar con los componentes reales, no unos nuevos.
function adaptarProducto(producto) {
  // producto_fichas es 1 a 1 (la clave primaria de esa tabla ES el
  // producto_id), así que Supabase lo devuelve como objeto, no array.
  const ficha = producto.producto_fichas || null;
  const imagenes = (producto.producto_imagenes || [])
    .sort((a, b) => a.orden - b.orden)
    .map((img) => img.url);

  // Mismo orden que usa la página oficial de Citizen para este reloj
  // (citizenwatch.com.ar/productos/BI501750E): colección, género y función
  // primero, la sumergibilidad al final — no como un dato principal.
  const detalles = [
    ["Colección", producto.linea],
    ["Género", TIPO_LABEL_CORTO[producto.tipo]],
    ["Función", ficha?.funciones],
    ["Movimiento", ficha?.movimiento],
    ["Material caja", ficha?.material_caja],
    ["Material malla", ficha?.material_malla],
    ["Color esfera", ficha?.color_esfera],
    ["Color malla", ficha?.color_malla],
    ["Diámetro", ficha?.diametro_mm && `${ficha.diametro_mm} mm`],
    ["Cristal", ficha?.cristal],
    [
      "Sumergibilidad",
      ficha?.resistencia_agua_m && `${ficha.resistencia_agua_m / 10} ATM (${ficha.resistencia_agua_m} mts)`,
    ],
  ]
    .filter(([, valor]) => valor)
    .map(([etiqueta, valor]) => ({ etiqueta, valor }));

  return {
    id: producto.id,
    // El título mira marca + línea (ej. "Citizen Quartz") en vez de marca +
    // código de referencia — el código es un dato interno, no algo que le
    // importe al cliente. Si el producto no tiene línea cargada, se cae a
    // marca sola en vez de mostrar el código.
    titulo: [producto.marca, producto.linea].filter(Boolean).join(" ") || producto.marca,
    precio_transferencia: producto.precio_transferencia,
    marca: producto.marca,
    tipo: producto.tipo,
    precio: producto.precio,
    precio_anterior: producto.precio_anterior,
    ocultar_precio: producto.ocultar_precio,
    imagen_url: imagenes[0] || null,
    imagenes,
    // Si la descripción de la ficha solo repite la sumergibilidad (ej. "5
    // ATM: no apto para sumergir."), no se muestra aparte — ese dato ya
    // está en el detalle "Sumergibilidad". Si tiene más info real (ej.
    // "Ancho de malla 21,4 mm."), se mantiene.
    descripcion: /^\d+\s*atm\b/i.test(ficha?.descripcion || "") ? null : ficha?.descripcion || null,
    detalles,
    stock: producto.stock,
  };
}

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

  const productoAdaptado = adaptarProducto(producto);

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
