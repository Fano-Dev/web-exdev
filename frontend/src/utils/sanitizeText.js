// utils/sanitizeText.js
export function sanitizeText(value, allowExtra = "") {
  // allowExtra permite agregar caracteres válidos extra (ej: @ / : para redes)
  const regex = new RegExp(`[^\\p{L}\\p{N}\\s.,-${allowExtra}]`, "gu");
  return value.replace(regex, "");
}
