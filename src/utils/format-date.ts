export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return dateStr;
}
