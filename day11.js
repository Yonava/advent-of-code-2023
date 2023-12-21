const { dayEleven, dayElevenSm } = require('./inputs')

const input = dayElevenSm.split('\n').map(l => l.split(''))

const getDist = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1)

// row order traversal
for (let i = input.length - 1; i >= 0; i--) {
  const filtered = input[i].filter(x => x === '#')
  if (!filtered.length) input.splice(i, 0, Array(input[0].length).fill('.'))
}

// col order traversal
for (let i = input[0].length - 1; i >= 0; i--) {
  const colArr = []
  for (let j = 0; j < input.length; j++) {
    colArr.push(input[i][j])
  }
  console.log(colArr.every(i => i === '.'))
}

// console.log(input)

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

console.log(out)