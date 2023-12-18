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

let [start, end] = ['AAA', 'ZZZ']
let out = 0
while (start !== end) {
  start = map.get(start)
  out += seq.length
}

console.log(out)