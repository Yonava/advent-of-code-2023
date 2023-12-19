const { dayEight, dayEightSm } = require('./inputs')
const PART_2 = true

const seq = dayEight.split('\n').shift().split('')
const rawMap = dayEight.split('\n').slice(2)

const pMap = rawMap.reduce((acc, curr) => {
  const [node, lr] = curr.split(' = ')
  return acc.set(node, lr.slice(1, lr.length - 1).split(', '))
}, new Map())

const map = Array.from(pMap).map(i => i[0]).reduce((m, loc) => m.set(loc, seq.reduce((curr, mv) => {
  return pMap.get(curr)[mv === 'L' ? 0 : 1]
}, loc)), new Map())

const getSteps = (start, cond) => {
  for (var steps = 0; !cond(start); steps++) start = map.get(start)
  return steps
}

const p1 = () => getSteps('AAA', (s) => s === 'ZZZ')

const p2 = () => {
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  return Array.from(pMap)
    .map(i => i[0])
    .filter(loc => loc.endsWith('A'))
    .map((loc => getSteps(loc, (s) => s.endsWith('Z'))))
    .reduce(lcm)
}

const out = (PART_2 ? p2() : p1()) * seq.length

console.log(out)