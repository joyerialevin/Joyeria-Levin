"use client";

import { useEffect } from "react";

// next/script con la misma "src" solo se ejecuta una vez por sesión del
// navegador (Next.js lo deduplica a propósito, para no recargar la misma
// librería en cada navegación). Este script arma la grilla de productos
// (#grid) de forma imperativa, así que si el usuario entra a esta página
// una segunda vez navegando dentro del sitio (sin recargar), <Script> no
// la reejecuta y la grilla queda vacía. Por eso se inyecta el script a
// mano en cada montaje del componente, y se saca al desmontar.
export default function GuiaMamaScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/regalos-dia-de-la-madre/script.js";
    script.async = false;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
