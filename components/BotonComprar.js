"use client";

import { useState } from "react";

export default function BotonComprar({ productoId }) {
  const [cargando, setCargando] = useState(false);

  async function comprar() {
    setCargando(true);
    try {
      const res = await fetch("/api/mercadopago/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: productoId, cantidad: 1 }] }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se pudo iniciar el pago. Probá de nuevo en un momento.");
      }
    } catch (e) {
      alert("No se pudo iniciar el pago. Probá de nuevo en un momento.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <button
      onClick={comprar}
      disabled={cargando}
      className="stamp"
      style={{
        marginTop: 12,
        width: "100%",
        padding: "10px 0",
        background: "var(--ink)",
        color: "var(--porcelain)",
        border: "none",
        borderRadius: 3,
        cursor: cargando ? "default" : "pointer",
        opacity: cargando ? 0.6 : 1,
      }}
    >
      {cargando ? "Redirigiendo..." : "Comprar"}
    </button>
  );
}
