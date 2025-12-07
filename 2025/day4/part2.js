import { input } from "./input.js"

const example = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

// first index controls north south, second controls east west
const direction = [
  [-1, -1], // ne
  [-1, 0], // n
  [-1, 1], // nw
  [0, -1], // e
  [0, 1], // w
  [1, -1], // se
  [1, 0], // s
  [1, 1] // sw
]

let output = 0;
let removedPaper = 0;
let currentLayout = input.split('\n').map((line) => line.split(''));

do {
  removedPaper = 0;
  const modifiedLayout = currentLayout.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      if (col === '.') return '.'
      const directionsWithPaper = direction.filter(([rowInc, colInc]) => {
        const atLocation = currentLayout[rowInc + rowIndex]?.[colInc + colIndex]
        return atLocation === '@'
      })
      return directionsWithPaper.length < 4 ? 'x' : '@'
    })
  });
  removedPaper = modifiedLayout.flat().filter((cell) => cell === 'x').length;
  output += removedPaper;
  currentLayout = modifiedLayout.map((row) => row.map((col) => col === 'x' ? '.' : col))
} while (removedPaper > 0)

console.log(output)