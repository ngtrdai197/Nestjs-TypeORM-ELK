export function tryStringify(data: unknown): string {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return `${String(data)} (Cannot stringify due to ${e.toString()})`;
  }
}
