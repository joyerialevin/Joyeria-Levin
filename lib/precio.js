export function formatearPrecio(numero) {
  return `$${Number(numero).toLocaleString("es-AR")}`;
}

// Valor exacto de cada cuota (precio de lista / 3, sin redondear a un
// número "más lindo") — se muestra con hasta 2 decimales solo cuando la
// división no da justa.
export function formatearCuota(precio) {
  return `$${(Number(precio) / 3).toLocaleString("es-AR", { maximumFractionDigits: 2 })}`;
}

// % de descuento redondeado contra el precio de lista, para el cartelito
// "X% OFF" — nunca se carga a mano, así no queda desactualizado si cambia
// alguno de los dos precios.
export function calcularDescuento(precioAnterior, precioFinal) {
  if (!precioAnterior || !precioFinal || precioFinal >= precioAnterior) return null;
  return Math.round((1 - precioFinal / precioAnterior) * 100);
}
