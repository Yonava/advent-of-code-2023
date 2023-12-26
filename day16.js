const { readFileSync } = require('fs')

const maze = readFileSync('./input.txt').toString().split('\n')
let mazeCpy = [...maze].map(l => l.split(''))

const dirs = { n: [-1, 0], e: [0, 1], w: [0, -1], s: [1, 0] }

const reflectors = {
  '\\': { e: 's', s: 'e', w: 'n', n: 'w' },
  '/': { e: 'n', s: 'w', w: 's', n: 'e' }
}

const splitters = {
  '|': { e: ['n', 's'], w: ['n', 's'] },
  '-': { n: ['e', 'w'], s: ['e', 'w'] }
}

const visited = new Set()
const tilesHit = new Set()

const dfs = async (x, y, dir) => {
  await new Promise(res => setTimeout(res, 10))
  const tile = maze?.[y]?.[x]
  if (tile === undefined || visited.has(`${y},${x},${dir}`)) return
  visited.add(`${y},${x},${dir}`)
  tilesHit.add(`${y},${x}`)

  mazeCpy[y][x] = '#'
  console.log(mazeCpy.map(l => l.join('')))

  const go = async (newDir) => await dfs(x + dirs[newDir][1], y + dirs[newDir][0], newDir)

  if (reflectors[tile]) return await go(reflectors[tile][dir])
  if (splitters[tile]?.[dir]) return await Promise.all(splitters[tile][dir].map((d) => go(d)))

  await go(dir)
}

// PART 1
// dfs(0, 0, 'e').then(() => console.log('done'))

// PART 2
const pt2 = async () => {
  const trials = []
  const run = async (...args) => {
    await dfs(...args)
    trials.push(tilesHit.size)
    mazeCpy = [...maze].map(l => l.split(''))
    tilesHit.clear()
    visited.clear()
  }

  for (const i in maze) await run(0, i, 'e')
  for (const i in maze) await run(maze[0].length - 1, i, 'w')
  for (let i = 0; i < maze[0].length; i++) await run(i, 0, 's')
  for (let i = 0; i < maze[0].length; i++) await run(i, maze[0].length - 1, 'n')

  return Math.max(...trials)
}

pt2().then(console.log)