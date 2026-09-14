export function formatearPrecio(numero) {
  return `$${Number(numero).toLocaleString("es-AR")}`;
}

// % de descuento redondeado contra el precio de lista, para el cartelito
// "X% OFF" — nunca se carga a mano, así no queda desactualizado si cambia
// alguno de los dos precios.
export function calcularDescuento(precioAnterior, precioFinal) {
  if (!precioAnterior || !precioFinal || precioFinal >= precioAnterior) return null;
  return Math.round((1 - precioFinal / precioAnterior) * 100);
}
