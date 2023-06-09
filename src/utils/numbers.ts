/* eslint-disable import/prefer-default-export */
export function reduceNumber(number: number) {
  let reduceSum = number;
  while (reduceSum > 9 && !(reduceSum === 22 || reduceSum === 11)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  }
  return reduceSum;
}
export function reduceNumberISK(number: number, karmicos: number[] = [13, 14, 16, 19]) {
  let reduceSum = number;
  while (reduceSum > 9 && !karmicos.includes(reduceSum)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += Number(c), 0);
  }
  return Number(reduceSum);
}
