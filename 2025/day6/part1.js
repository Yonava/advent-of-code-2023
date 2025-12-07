import { input } from "./input.js";

const example = `123 328  51 64 1
 45 64  387 23 1
  6 98  215 314 1
*   +   *   + +`

const problems = input.split('\n').map((row) => row.split(' ').filter((c) => c))

const array = []
for (let i = 0; i < problems[0].length; i++) {
  const tempArr = []
  for (let j = 0; j < problems.length; j++) {
    tempArr.push(problems[j][i])
  }
  array.push(tempArr)
}

const solutions = array.map((numberSet) => {
  const numbers = numberSet.slice(0, -1).map(Number)
  const op = numberSet.at(-1)
  return numbers.reduce((acc, curr) => op === '*' ? acc * curr : acc + curr)
})

console.log(solutions.reduce((acc, curr) => acc + curr))