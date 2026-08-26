"use client";

import { useEffect } from "react";
import BotonComprar from "./BotonComprar";

export default function ProductModal({ producto, subtitulo, precioFormateado, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(38,38,31,0.75)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="product-modal"
        style={{
          background: "var(--card-bg)",
          borderRadius: 6,
          maxWidth: 860,
          width: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.92)",
            color: "var(--ink)",
            fontSize: 16,
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          ✕
        </button>

        <div
          style={{
            aspectRatio: "1 / 1",
            background: "var(--porcelain-dim)",
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
        </div>

        <div style={{ padding: 32 }}>
          <h3 className="display" style={{ fontSize: 24, marginBottom: 4 }}>
            {producto.titulo}
          </h3>
          {subtitulo && (
            <div className="stamp" style={{ color: "var(--ink-soft)" }}>
              {subtitulo}
            </div>
          )}
          {producto.descripcion && (
            <p style={{ marginTop: 20, color: "var(--ink-soft)", lineHeight: 1.7 }}>
              {producto.descripcion}
            </p>
          )}
          <div style={{ marginTop: 24 }}>
            {producto.precio > 0 ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 500 }}>{precioFormateado}</div>
                <div style={{ maxWidth: 260 }}>
                  <BotonComprar productoId={producto.id} />
                </div>
              </>
            ) : (
              <div className="stamp" style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
                Precio a consultar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
