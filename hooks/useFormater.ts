export function ensureArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

export function ensureObject<T extends object>(value: T | null | undefined): T {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {} as T;
}
