/**
 * Утиліти для роботи з полем. Чисті функції, без побічних ефектів.
 * Індекс комірки: index = row * cols + col
 */

/**
 * Перевіряє, чи координата в межах поля.
 * @param {number} row
 * @param {number} col
 * @param {number} rows
 * @param {number} cols
 * @returns {boolean}
 */
export function isValidCoord(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

/**
 * Повертає масив координат сусідніх комірок (8 напрямків).
 * Не фільтрує за межами поля — це робить викликач при потребі.
 * @param {number} row
 * @param {number} col
 * @param {number} rows
 * @param {number} cols
 * @returns {{ row: number, col: number }[]}
 */
export function getNeighbors(row, col, rows, cols) {
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (isValidCoord(r, c, rows, cols)) {
        neighbors.push({ row: r, col: c });
      }
    }
  }
  return neighbors;
}

/**
 * Рахує кількість мін у сусідніх комірках.
 * mineSet — Set індексів (index = row * cols + col).
 * @param {number} row
 * @param {number} col
 * @param {Set<number>} mineSet
 * @param {number} rows
 * @param {number} cols
 * @returns {number}
 */
export function countMinesAround(row, col, mineSet, rows, cols) {
  const neighbors = getNeighbors(row, col, rows, cols);
  let count = 0;
  for (const { row: r, col: c } of neighbors) {
    const index = r * cols + c;
    if (mineSet.has(index)) count += 1;
  }
  return count;
}
