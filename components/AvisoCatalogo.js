"use client";

import { useEffect, useState } from "react";

// Para apagar la franja o cambiar el texto más adelante: tocar solo estas
// constantes, no hace falta tocar el resto del componente.
const AVISO_ACTIVO = true;
const AVISO_TEXTO = "Estamos actualizando nuestro catálogo. ";
const AVISO_LINK_TEXTO = "Consultá disponibilidad por WhatsApp";
const AVISO_LINK_HREF =
  "https://api.whatsapp.com/send?phone=5493434728312&text=Hola%2C%20vengo%20desde%20la%20web.%20Quer%C3%ADa%20consultar%20disponibilidad.";

const SESSION_KEY = "aviso-catalogo-cerrado";

export default function AvisoCatalogo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!AVISO_ACTIVO) return;
    if (sessionStorage.getItem(SESSION_KEY) !== "1") setVisible(true);
  }, []);

  if (!AVISO_ACTIVO || !visible) return null;

  function cerrar() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  return (
    <div className="aviso-catalogo">
      <div className="aviso-catalogo-inner">
        <p className="aviso-catalogo-texto">
          {AVISO_TEXTO}
          <a href={AVISO_LINK_HREF} target="_blank" rel="noopener" className="aviso-catalogo-link">
            {AVISO_LINK_TEXTO}
          </a>
        </p>
        <button type="button" className="aviso-catalogo-cerrar" aria-label="Cerrar aviso" onClick={cerrar}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
