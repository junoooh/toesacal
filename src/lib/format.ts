export function formatWon(value: number): string {
  if (!Number.isFinite(value)) return "0원";
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export function formatDate(value: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
