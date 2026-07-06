export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const at = trimmed.indexOf("@");
  if (at <= 0) return trimmed;

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at);

  if (local.length <= 3) {
    return `${local[0] ?? ""}***${domain}`;
  }

  const visibleStart = Math.min(3, Math.floor(local.length / 3));
  const visibleEnd = Math.min(2, Math.floor(local.length / 4));
  const masked = `${local.slice(0, visibleStart)}***${local.slice(-visibleEnd)}`;
  return `${masked}${domain}`;
}
