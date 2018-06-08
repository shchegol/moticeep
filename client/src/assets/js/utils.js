/**
 * Converts a number to words.
 * @example
 * // returns Яблок
 * declOfNum(0, ['Яблоко','Яблока','Яблок']);
 * @example
 * // returns Яблоко
 * declOfNum(1, ['Яблоко','Яблока','Яблок']);
 * @example
 * // returns Яблока
 * declOfNum(2, ['Яблоко','Яблока','Яблок']);
 * @param {int} number Number.
 * @param {array} titles Words for convert.
 * @return {string} Converted word.
 */
export function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/**
 * Generate random number.
 * @param {int} min The minimum number in the range.
 * @param {int} max The maximum number in the range.
 * @return {int} Random number between min snd max.
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
