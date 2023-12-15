const { dayFour } = require('./inputs')

const input = dayFour.split('\n').map((line) => line.split(':')[1].split('|')).map(([ticket, winners]) => {
  return [ticket.split(' ').filter(i => i), new Set(winners.split(' ').filter(i => i))]
});

// part 1
// const out = input.reduce((acc, [ticket, winners]) => {
//   const matches = ticket.reduce((acc, num) => winners.has(num) ? acc + 1 : acc, 0)
//   return !matches ? acc : acc + 2**(matches - 1)
// }, 0)

// part 2
const matches = input.reduce((acc, [ticket, winners], index) => {
  return acc.set(index + 1, ticket.reduce((acc, num) => winners.has(num) ? acc + 1 : acc, 0))
}, new Map())

const memo = new Map()
const dfs = (id) => {
  if (memo.get(id) !== undefined) return memo.get(id)

  const matchNum = matches.get(id)
  if (matchNum === 0) return 1

  let sum = 1
  for (let i = 1; i <= matchNum; i++) sum += dfs(id + i)
  memo.set(id, sum)
  return sum
}

const out = input.reduce((acc, _, index) => {
  const id = index + 1
  dfs(id)
  const nMatches = matches.get(id)
  return acc + (nMatches ? memo.get(id) : 1)
}, 0)

console.log(out)