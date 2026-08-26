import { Lato } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// Lato para eyebrows/nav/botones en mayúscula (alternativa gratuita a
// Gill Sans para self-host). Georgia, para títulos y cuerpo, es una
// fuente de sistema y no necesita cargarse acá.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  title: "Joyería Levin — Joyería & Relojería",
  description:
    "Relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={lato.variable}>
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
