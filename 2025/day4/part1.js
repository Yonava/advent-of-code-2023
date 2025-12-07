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

const layout = input.split('\n').map((line) => line.split(''))

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

const output = layout.map((row, rowIndex) => {
  return row.map((col, colIndex) => {
    if (col !== '@') return Infinity
    const directionsWithPaper = direction.filter(([rowInc, colInc]) => {
      const atLocation = layout[rowInc + rowIndex]?.[colInc + colIndex]
      return atLocation === '@'
    })
    return directionsWithPaper.length
  })
}).flat().filter((papers) => papers < 4).length

console.log(output)