export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = seconds % 60;

  // 动态拼接时间部分
  let timeString = '';
  if (hours > 0) {
    timeString += `${String(hours).padStart(2, '0')}:`;
  }
  timeString += `${String(minutes).padStart(2, '0')}:`;
  timeString += `${String(secs).padStart(2, '0')}`;

  return timeString;
}
