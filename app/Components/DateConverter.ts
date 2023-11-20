export function transformDateFormat(apiDate: string) {
  const originalDate = new Date(apiDate);
  const day = originalDate.getDate().toString().padStart(2, '0');
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = originalDate.getFullYear();

  return `${day}.${month}.${year}`;
}
