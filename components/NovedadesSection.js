"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const INTERVALO_MS = 15000;
const TAMANO_TANDA = 4;

// Ventana circular: siempre devuelve TAMANO_TANDA relojes (salvo que
// haya menos cargados), completando con los primeros de vuelta si la
// tanda se pasa del final de la lista.
function tandaActual(productos, indice) {
  const total = productos.length;
  if (total === 0) return [];
  const cantidad = Math.min(TAMANO_TANDA, total);
  const inicio = (indice * TAMANO_TANDA) % total;
  return Array.from({ length: cantidad }, (_, i) => productos[(inicio + i) % total]);
}

function FilaNovedades({ titulo, productos }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (productos.length <= TAMANO_TANDA) return;
    const id = setInterval(() => setIndice((i) => i + 1), INTERVALO_MS);
    return () => clearInterval(id);
  }, [productos.length]);

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
      <div className="novedades-fila">
        {tandaActual(productos, indice).map((p) => (
          <ProductCard key={p.id} producto={p} soloMarca />
        ))}
      </div>
    </div>
  );
}

export default function NovedadesSection({ productos }) {
  if (!productos || productos.length === 0) return null;

  const dama = productos.filter((p) => p.tipo === "dama");
  const caballero = productos.filter((p) => p.tipo === "caballero");

  if (dama.length === 0 && caballero.length === 0) return null;

  return (
    <section style={{ background: "var(--card-bg)" }}>
      <div className="container" style={{ padding: "84px 6% 84px" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 className="display" style={{ fontSize: 40, lineHeight: 1.1, margin: 0 }}>
            Nuevos ingresos
          </h2>
        </div>

        {dama.length > 0 && (
          <div style={{ marginBottom: caballero.length > 0 ? 48 : 0 }}>
            <FilaNovedades titulo="Dama" productos={dama} />
          </div>
        )}
        {caballero.length > 0 && <FilaNovedades titulo="Caballero" productos={caballero} />}
      </div>
    </section>
  );
}
