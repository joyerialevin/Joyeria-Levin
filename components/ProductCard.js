"use client";

import { useState } from "react";
import { MATERIAL_LABEL, TIPO_LABEL } from "../lib/categorias";
import BotonComprar from "./BotonComprar";
import ProductModal from "./ProductModal";

export default function ProductCard({ producto }) {
  const [abierto, setAbierto] = useState(false);

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(producto.precio);

  const badge = producto.material ? MATERIAL_LABEL[producto.material] : null;

  const subtitulo = [
    producto.tipo ? TIPO_LABEL[producto.tipo] : null,
    producto.marca,
    !producto.tipo && producto.material ? MATERIAL_LABEL[producto.material] : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div
        onClick={() => setAbierto(true)}
        className="hover-lift"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--line)",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            aspectRatio: "1 / 1",
            background: "var(--porcelain-dim)",
            position: "relative",
          }}
        >
          {producto.imagen_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={producto.imagen_url}
              alt={producto.titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {badge && (
            <span
              className="stamp"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                padding: "4px 8px",
                borderRadius: 2,
                background: "rgba(255,255,255,0.92)",
                color:
                  producto.material === "oro_18k"
                    ? "var(--oro-deep)"
                    : "var(--plata-deep)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ padding: "16px 16px 20px" }}>
          <h5 className="display" style={{ fontSize: 16, marginBottom: 4 }}>
            {producto.titulo}
          </h5>
          {subtitulo && (
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 12 }}>
              {subtitulo}
            </div>
          )}
          {producto.precio > 0 ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{precioFormateado}</div>
              <div onClick={(e) => e.stopPropagation()}>
                <BotonComprar productoId={producto.id} />
              </div>
            </>
          ) : (
            <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
              Precio a consultar
            </div>
          )}
        </div>
      </div>

      {abierto && (
        <ProductModal
          producto={producto}
          subtitulo={subtitulo}
          precioFormateado={precioFormateado}
          onClose={() => setAbierto(false)}
        />
      )}
    </>
  );
}
