/**
 * Convierte un valor Decimal128 (que viene del backend) a number para cálculos
 */
export const parseDecimal128ToNumber = (value: any): number => {
  if (!value) return 0;

  // Si ya es un number
  if (typeof value === "number") {
    return value;
  }

  // Si es string (después del toJSON transform)
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  // Si es objeto Decimal128 con $numberDecimal
  if (value.$numberDecimal) {
    const parsed = parseFloat(value.$numberDecimal);
    return isNaN(parsed) ? 0 : parsed;
  }

  // Si tiene método toString
  if (value.toString && typeof value.toString === "function") {
    const parsed = parseFloat(value.toString());
    return isNaN(parsed) ? 0 : parsed;
  }

  console.warn("Could not parse decimal value:", value);
  return 0;
};

/**
 * Suma array de valores Decimal128
 */
export const sumDecimal128Values = (values: any[]): number => {
  return values.reduce((sum, value) => {
    return sum + parseDecimal128ToNumber(value);
  }, 0);
};

/**
 * Formatea un valor para mostrar en UI (elimina ceros innecesarios)
 */
export const formatDecimalForDisplay = (
  value: number,
  decimals: number = 6
): string => {
  if (value === 0) return "0";

  // Si es muy pequeño, usar notación científica
  if (value < 0.000001) {
    return value.toExponential(2);
  }

  // Formatear con decimales y quitar ceros al final
  return parseFloat(value.toFixed(decimals)).toString();
};

export function formatMoney(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toLocaleString()}`;
}
