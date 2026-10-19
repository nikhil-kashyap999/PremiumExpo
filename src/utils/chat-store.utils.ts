export const getConversationId = (a: string, b: string) =>
  [a, b].sort().join("-");

export const toMillis = (value?: number | string): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const t = Date.parse(value);
    if (!Number.isNaN(t)) return t;
  }
  return Date.now(); // fallback
};
