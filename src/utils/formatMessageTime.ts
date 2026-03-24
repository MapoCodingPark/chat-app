export function formatMessageTime(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  const daysDiff = Math.floor(diff / oneDay);

  // 오늘
  if (daysDiff === 0) {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }

  // 어제
  if (daysDiff === 1) {
    return '어제';
  }

  // 일주일 이내
  if (daysDiff < 7) {
    return new Intl.DateTimeFormat('ko-KR', {
      weekday: 'long',
    }).format(date);
  }

  // 그 이상
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  }).format(date);
}
