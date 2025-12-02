const { dayEleven, dayElevenSm } = require('./inputs')

const input = dayEleven.split('\n').map(l => l.split(''))

const colFaults = []
const rowFaults = []

let tolls = 0

const getDist = ([x1, y1], [x2, y2]) => {
  const dist = Math.abs(x2 - x1) + Math.abs(y2 - y1)
  const [minX, maxX, minY, maxY] = [Math.min(x1, x2), Math.max(x1, x2), Math.min(y1, y2), Math.max(y1, y2)]
  const rToll = rowFaults.reduce((acc, curr) => curr > minX && curr < maxX ? acc + 1 : acc, 0)
  const cToll = colFaults.reduce((acc, curr) => curr > minY && curr < maxY ? acc + 1 : acc, 0)
  tolls += rToll + cToll
  return dist
}

for (let i = 0; i < input[0].length; i++) {
  const colArr = []
  for (let j = 0; j < input.length; j++) colArr.push(input[j][i])
  if (colArr.every(i => i === '.')) colFaults.push(i)
}

for (let i = 0; i < input.length; i++) {
  const filtered = input[i].filter(x => x === '#')
  if (!filtered.length) rowFaults.push(i)
}

let id = 1
const pos = new Map()

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    const char = input[i][j]
    if (char !== '.') {
      pos.set(id, [i, j])
      id++
    }
  }
}

const combos = []
for (const [key1, _] of pos) {
  for (const [key2, _] of pos) {
    if (key1 > key2) combos.push([key1, key2])
  }
}

const out = combos.reduce((acc, [x, y]) => acc + getDist(pos.get(x), pos.get(y)), 0)

console.log(out, '+', tolls, '=', out + tolls * 999_999)