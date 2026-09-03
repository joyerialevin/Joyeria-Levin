"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// El panel de Sanity (/studio) necesita toda la pantalla para sí mismo —
// el header, footer y botón de WhatsApp del sitio se ocultan ahí para
// no tapar los controles del panel (como "Publish").
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const esStudio = pathname?.startsWith("/studio");

  if (esStudio) return children;

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
