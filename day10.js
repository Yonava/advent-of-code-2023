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
const pipes = dayTen.split('\n').map(l => l.split(''))

let startCoords;
for (let row = 0; row < pipes.length; row++) {
  for (let col = 0; col < pipes[0].length; col++) {
    if (pipes[row][col] !== 'S') continue
    startCoords = [row, col]
    break
  }
  if (startCoords) break
}

const rcStr = (r, c) => `${r},${c}`

let curr = [21, 30];
const visited = new Set()

while (pipes[curr[0]][curr[1]] !== 'S') {
  const [row, col] = curr
  const currentPipe = pipes[row][col]
  const pipeConns = conns[currentPipe]
  const adjustment = pipeConns.find(([r, c]) => rcStr(r + row, c + col) !== prev)
  visited.add(rcStr(...curr))
  curr = adjustment.map((adj, i) => adj + curr[i])
}

console.log(visited.size + 1)
