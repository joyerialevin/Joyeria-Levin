"use client";

import { usePathname } from "next/navigation";

// El panel de Sanity (/studio) necesita toda la pantalla para sí mismo —
// el header, footer y botón de WhatsApp del sitio se ocultan ahí para
// no tapar los controles del panel (como "Publish").
//
// Header, Footer, etc. son Server Components (Header es async) y se
// reciben ya renderizados como props desde el layout, en vez de
// importarlos acá — un Client Component no puede importar y renderizar
// un Server Component directamente, eso rompe en navegaciones del lado
// del cliente (ej. al volver atrás) con "a client-side exception".
export default function SiteChrome({ children, announcement, header, footer, whatsapp, instagram }) {
  const pathname = usePathname();
  const esStudio = pathname?.startsWith("/studio");

  if (esStudio) return children;

  return (
    <>
      {announcement}
      {header}
      {children}
      {footer}
      {whatsapp}
      {instagram}
    </>
  );
}
