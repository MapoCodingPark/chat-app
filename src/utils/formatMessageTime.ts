export function formatMessageTime(isoString: string) {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
