const { dayNine, dayNineSm } = require('./inputs')

const lines = dayNineSm.split('\n').map(i => i.split(' ').map(i => Number(i)))

const cumulative = []

for (const line of lines) {
  const levels = [line]
  do {
    const next = []
    const lastLevel = levels.at(-1)
    for (let i = 1; i < lastLevel.length; i++) next.push(lastLevel[i] - lastLevel[i-1])
    if (!next.length) next = [0]
    levels.push(next)
  } while (!levels.at(-1).every(num => num === 0))
  // levels.shift()
  cumulative.push(levels)
}

console.log(cumulative)

const out = cumulative.reduce((total, line) => total + line.reduce((acc, curr) => acc + curr.at(0), 0), 0)

console.log(out)