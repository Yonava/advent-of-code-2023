const { dayThree } = require('./inputs')

const s = dayThree.split('\n').map(line => line.split(''))
const isNum = (char) => !isNaN(parseInt(char))
const outOfBounds = (row, col) => row >= s.length || row < 0 || col >= s[0].length || col < 0

let numBuff = []

const dfs = (row, col) => {
  if (
    outOfBounds(row, col) ||
    !isNum(s[row][col])
  ) return
  numBuff[col] = s[row][col]
  s[row][col] = '.'
  dfs(row, col + 1)
  dfs(row, col - 1)
}

const neighbors = [
  [-1, -1], // nw
  [0, -1], // n
  [1, -1], // ne
  [1, 0], // e
  [1, 1], // se
  [0, 1], // s
  [-1, 1], // sw
  [-1, 0] // w
]

let output = 0

// part 1
s.forEach((line, lIndex) => line.forEach((char, cIndex) => {
  if (isNum(char) || char === '.') return
  neighbors.forEach(([x, y]) => {
    const [row, col] = [lIndex + x, cIndex + y]
    if (outOfBounds(row, col) || !isNum(s[row][col])) return
    dfs(row, col)
    output += parseInt(numBuff.filter(i => i).join(''))
    numBuff = []
  })
}))


// part 2
let gears = []
s.forEach((line, lIndex) => line.forEach((char, cIndex) => {
  if (char !== '*') return
  neighbors.forEach(([x, y]) => {
    const [row, col] = [lIndex + x, cIndex + y]
    if (outOfBounds(row, col) || !isNum(s[row][col])) return
    dfs(row, col)
    gears.push(parseInt(numBuff.filter(i => i).join('')))
    numBuff = []
  })
  if (gears.length === 2) output += (gears[0] * gears[1])
  gears = []
}))