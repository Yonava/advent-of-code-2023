const { dayEighteenSm, dayEighteen } = require('./inputs')

const dirs = { U: [-1, 0], R: [0, 1], L: [0, -1], D: [1, 0] }

const seq = dayEighteenSm.split('\n').map(l => {
  [dir, num, hex] = l.split(' ')
  return [dir, Number(num), hex.slice(1, -1)]
})

let depth = 1
seq.reduce((acc, [dir, num]) => {
  const nd = dir == 'D' ? acc + num : dir == 'U' ? acc - num : acc
  depth = Math.max(nd, depth)
  return nd
}, 1)

let breadth = 1
seq.reduce((acc, [dir, num]) => {
  const nb = dir == 'R' ? acc + num : dir == 'L' ? acc - num : acc
  breadth = Math.max(nb, breadth)
  return nb
}, 1)

const arr = Array.from(Array(depth), () => Array(breadth).fill('.'))

console.log(seq)

seq.reduce((acc, [dir, num]) => {
  for (let i = 0; i < num; i++) {
    acc = acc.map((n, ind) => n + dirs[dir][ind])
    arr[acc[0]][acc[1]] = '#'
  }
  return acc
}, [0, 0])

const dfs = ([y, x] = [1, 1]) => {
  if (!arr?.[y]?.[x] || arr[y][x] === '#') return
  arr[y][x] = '#'
  Object.values(dirs).forEach(([pY, pX]) => dfs([y+pY, x+pX]))
}

// dfs()

const out = arr.reduce((total, line) => total + line.reduce((sum, tile) => tile === '#' ? sum+1 : sum, 0), 0)

console.log(arr.map(l => l.join('')), out)