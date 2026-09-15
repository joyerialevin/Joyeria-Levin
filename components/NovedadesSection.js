import ProductCard from "./ProductCard";

function GrupoNovedades({ titulo, productos }) {
  return (
    <div>
      <div
        className="stamp"
        style={{
          color: "var(--ink)",
          marginBottom: 18,
          paddingBottom: 10,
          borderBottom: "1px solid var(--line)",
        }}
      >
        {titulo}
      </div>
      <div
        className="novedades-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 22,
        }}
      >
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}

export default function NovedadesSection({ productos }) {
  if (!productos || productos.length === 0) return null;

  const caballero = productos.filter((p) => p.tipo === "caballero");
  const dama = productos.filter((p) => p.tipo === "dama");
  const otros = productos.filter((p) => p.tipo !== "caballero" && p.tipo !== "dama");

  // Caballero y Dama van lado a lado (con divisoria) en pantallas grandes,
  // apilados en mobile. El split solo tiene sentido si hay de los dos —
  // si solo hay novedades de un género, se muestra a todo el ancho.
  const hayAmbosGeneros = caballero.length > 0 && dama.length > 0;

  return (
    <section className="container" style={{ padding: "84px 6% 0" }}>
      <div style={{ marginBottom: 40 }}>
        <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
          Nuevos ingresos
        </h2>
      </div>

      {hayAmbosGeneros ? (
        <div className="novedades-split">
          <GrupoNovedades titulo="Caballero" productos={caballero} />
          <GrupoNovedades titulo="Dama" productos={dama} />
        </div>
      ) : (
        <>
          {caballero.length > 0 && <GrupoNovedades titulo="Caballero" productos={caballero} />}
          {dama.length > 0 && <GrupoNovedades titulo="Dama" productos={dama} />}
        </>
      )}

      {otros.length > 0 && (
        <div style={{ marginTop: caballero.length > 0 || dama.length > 0 ? 48 : 0 }}>
          <GrupoNovedades titulo="Otros" productos={otros} />
        </div>
      )}
    </section>
  );
}
