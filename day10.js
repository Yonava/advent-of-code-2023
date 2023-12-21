const { dayTen, dayTenSm } = require('./inputs')

const dirs = {
  n: [-1, 0],
  e: [0, 1],
  s: [1, 0],
  w: [0, -1]
}

const conns = {
  '|': [dirs.n, dirs.s],
  '-': [dirs.e, dirs.w],
  'L': [dirs.n, dirs.e],
  'J': [dirs.n, dirs.w],
  '7': [dirs.s, dirs.w],
  'F': [dirs.s, dirs.e]
}

// parse pipe system
const pipes = dayTenSm.split('\n').map(l => l.split(''))

// find starting coordinates
let startCoords;
for (let row = 0; row < pipes.length; row++) {
  for (let col = 0; col < pipes[0].length; col++) {
    if (pipes[row][col] !== 'S') continue
    startCoords = [row, col]
    break
  }
  if (startCoords) break
}

// row/col to string helper to map coordinate tuple into a primitive
const rcStr = (r, c) => `${r},${c}`

let curr = [startCoords[0], startCoords[1] + 1];
const visited = new Set()

while (pipes[curr[0]][curr[1]] !== 'S') {
  const [row, col] = curr
  const currentPipe = pipes[row][col]
  const pipeConns = conns[currentPipe]
  const adjustment = pipeConns.find(([r, c]) => !visited.has(rcStr(r + row, c + col)))
  visited.add(rcStr(...curr))
  curr = adjustment.map((adj, i) => adj + curr[i])
}

visited.add(rcStr(...startCoords))

// part 1
console.log('Part 1:', (visited.size) / 2)

// ray casting
const isInside = (row, col) => {
  return pipes[row].slice(col).reduce((acc, curr, i) => {
    return '|F7'.includes(curr) && visited.has(rcStr(row, col + i)) ? acc + 1 : acc
  }, 0) % 2 === 1
}

const out = pipes.reduce((total, row, rowI) => total + row.reduce((acc, _, colI) => {
  return !visited.has(rcStr(rowI, colI)) && isInside(rowI, colI) ? acc + 1 : acc
}, 0), 0)

// part 2
console.log('Part 2:', out)
