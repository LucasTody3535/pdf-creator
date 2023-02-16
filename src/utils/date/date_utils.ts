export function createFormattedDate(): string {
  const d = new Date(Date.now());
  return `${d.getDay}/${d.getMonth}/${d.getFullYear}`;
}
