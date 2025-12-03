import { input } from "./input.js";

const test = (str) => Array(Math.floor(str.length / 2))
  .fill(0)
  .map((_, i) => str.slice(0, i + 1))
  .map((s) => str.split(s).join(''))
  .some((s) => !s)

const output = input
  .split(',')
  .map((line) => {
    const [bottom, top] = line.split('-')
    return Array(Number(top) - Number(bottom) + 1)
      .fill(0)
      .map((_, i) => Number(bottom) + i)
      .filter((n) => test(n.toString()));
  })
  .flat()
  .reduce((acc, curr) => acc + curr);