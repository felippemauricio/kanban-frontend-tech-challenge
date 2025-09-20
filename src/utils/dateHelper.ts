import dayjs from 'dayjs';

export function timeAgo(date?: string | Date | null): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;
  return dayjs(d).fromNow();
}
