import { NextResponse } from "next/server";
import { getMpPreference } from "../../../../lib/mercadopago";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getSanity } from "../../../../lib/sanityClient";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { items, cliente } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const ids = items.map((i) => i.id);
    const productos = await getSanity().fetch(
      `*[_type == "producto" && _id in $ids]{ "id": _id, titulo, precio }`,
      { ids }
    );

    const itemsMp = items.map((i) => {
      const producto = productos.find((p) => p.id === i.id);
      if (!producto) throw new Error(`Producto ${i.id} no encontrado`);
      return {
        id: producto.id,
        title: producto.titulo,
        quantity: i.cantidad || 1,
        unit_price: Number(producto.precio),
        currency_id: "ARS",
      };
    });

    const total = itemsMp.reduce(
      (acc, i) => acc + i.unit_price * i.quantity,
      0
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const mpPreference = getMpPreference();
    const preference = await mpPreference.create({
      body: {
        items: itemsMp,
        back_urls: {
          success: `${siteUrl}/checkout/exito`,
          failure: `${siteUrl}/checkout/error`,
          pending: `${siteUrl}/checkout/pendiente`,
        },
        auto_return: "approved",
      },
    });

    await supabaseAdmin.from("pedidos").insert({
      total,
      items: itemsMp,
      cliente_nombre: cliente?.nombre || null,
      cliente_email: cliente?.email || null,
      mp_preference_id: preference.id,
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo crear el pago" },
      { status: 500 }
    );
  }
}

