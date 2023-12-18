const { dayEight, dayEightSm } = require('./inputs')

const seq = dayEight.split('\n').shift().split('')
const rawMap = dayEight.split('\n').slice(2)

const pMap = rawMap.reduce((acc, curr) => {
  const [node, lr] = curr.split(' = ')
  return acc.set(node, lr.slice(1, lr.length - 1).split(', '))
}, new Map())

const map = Array.from(pMap).map(i => i[0]).reduce((m, loc) => m.set(loc, seq.reduce((curr, mv) => {
  return pMap.get(curr)[mv == 'L' ? 0 : 1]
}, loc)), new Map())

const findFirstEndWithZ = (start) => {
  let steps = 0;
  let location = start
  while (!location.endsWith('Z')) {
    location = map.get(location)
    steps++
  }
  return steps
}

const lcm = (a, b) => (a * b) / gcd(a, b);
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const out = Array.from(pMap).map(i => i[0]).filter(loc => loc.endsWith('A')).map(findFirstEndWithZ)
console.log(out.reduce(lcm) * seq.length)