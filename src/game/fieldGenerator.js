/**
 * Генерація позицій мін. Єдине місце, де створюються міни.
 * excludeIndex ніколи не буде міною (безпечний перший клік).
 * Індекс комірки: index = row * cols + col
 */

/**
 * Генерує набір індексів мін для поля rows×cols.
 * excludeIndex завжди виключається з множини мін.
 * @param {number} rows
 * @param {number} cols
 * @param {number} totalMines
 * @param {number} excludeIndex — індекс комірки, яка не має стати міною
 * @returns {Set<number>}
 */
export function generateMineIndices(rows, cols, totalMines, excludeIndex) {
  const totalCells = rows * cols;
  const maxMines = Math.max(0, Math.min(totalMines, totalCells - 1));

  const indices = [];
  for (let i = 0; i < totalCells; i++) {
    if (i !== excludeIndex) indices.push(i);
  }

  const mineSet = new Set();
  let remaining = maxMines;
  let poolSize = indices.length;

  while (remaining > 0 && poolSize > 0) {
    const pick = Math.floor(Math.random() * poolSize);
    const index = indices[pick];
    mineSet.add(index);
    indices[pick] = indices[poolSize - 1];
    poolSize -= 1;
    remaining -= 1;
  }

  return mineSet;
}
