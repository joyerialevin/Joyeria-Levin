import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Sharp Grotesk es una fuente paga (Lineto) sin licencia disponible acá.
// Hanken Grotesk es la alternativa gratuita más cercana en espíritu
// (grotesca geométrica, neutra) y se puede self-hostear vía next/font.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata = {
  title: "Joyería Levin — Joyería & Relojería",
  description:
    "Relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={hanken.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
