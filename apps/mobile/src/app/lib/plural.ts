export const plural = (
  base: string,
  count: number,
  customPlural?: string
): string => (count <= 1 ? base : customPlural ?? `${base}s`)
