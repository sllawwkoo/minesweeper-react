/**
 * Форматує число у рядок з 3 цифр (000–999)
 */
export function formatThreeDigits(value) {
  if (value < 0) return '000';
  const n = Math.min(999, Math.floor(value));
  return String(n).padStart(3, '0');
}

/**
 * Повертає CSS-клас стану клітинки сапера
 */
export function getCellStateClass({ isOpen, isFlagged, isMine, isTriggeredMine, minesAround }) {
  if (!isOpen && isFlagged) return 'flaged';
  if (isOpen && isMine) return isTriggeredMine ? 'bombed' : 'bomb';
  if (isOpen && !isMine) {
    if (minesAround === 0) return 'zero';
    if (minesAround > 0) return `num${minesAround}`;
  }
  return 'closed';
}

/**
 * Генерує випадковий hex-колір
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
