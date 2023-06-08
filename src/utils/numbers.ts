/* eslint-disable import/prefer-default-export */
export function reduceNumber(number: number) {
  let reduceSum = number;
  while (reduceSum > 9 && !(reduceSum === 22 || reduceSum === 11)) {
    reduceSum = reduceSum.toString().toLowerCase().split('').reduce((r, c) => r += parseInt(c), 0);
  }
  return reduceSum;
}
