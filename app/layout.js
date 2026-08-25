import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Joyería Levin — Joyería & Relojería",
  description:
    "Relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
