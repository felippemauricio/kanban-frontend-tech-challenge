export function toNormalizedUpperCase(str?: string | number | null): string | null | undefined {
  if (str === undefined || str === null) return str;
  return String(str).trim().toUpperCase();
}

export function isEmptyString(str?: string | number | null): boolean {
  return str === undefined || str === null || toNormalizedUpperCase(str) === '';
}

export function isEqualIgnoreCase(
  str1?: string | number | null,
  str2?: string | number | null
): boolean {
  if (str1 === undefined || str1 === null) return false;
  if (str2 === undefined || str2 === null) return false;
  return toNormalizedUpperCase(str1) === toNormalizedUpperCase(str2);
}

export function containsIgnoreCase(
  str1?: string | number | null,
  str2?: string | number | null
): boolean {
  if (!str1 || !str2) return false;
  return toNormalizedUpperCase(str2)!.includes(toNormalizedUpperCase(str1)!);
}
