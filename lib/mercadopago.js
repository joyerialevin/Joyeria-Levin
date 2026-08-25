import { MercadoPagoConfig, Preference } from "mercadopago";

// Se crea recién cuando se usa (no al cargar el módulo), para que Next.js
// no intente conectarse a Mercado Pago durante el proceso de build.
let client;

export function getMpPreference() {
  if (!client) {
    client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });
  }
  return new Preference(client);
}
