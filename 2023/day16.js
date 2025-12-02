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

const dfs = async (y, x, dir) => {
  // await new Promise(res => setTimeout(res, 500))
  const tile = maze?.[y]?.[x]
  if (tile === undefined || visited.has(`${y},${x},${dir}`)) return
  visited.add(`${y},${x},${dir}`)
  tilesHit.add(`${y},${x}`)

  mazeCpy[y][x] = '#'
  console.log(mazeCpy.map(l => l.join('')))

  const go = async (newDir) => await dfs(y + dirs[newDir][0], x + dirs[newDir][1], newDir)

  if (reflectors[tile]) return await go(reflectors[tile][dir])
  if (splitters[tile]?.[dir]) return await Promise.all(splitters[tile][dir].map(go))

  await go(dir)
}

// PART 1
// dfs(0, 0, 'e').then(() => console.log('done'))

// PART 2
const pt2 = async () => {
  let maxEnergized = 0
  const run = async (...args) => {
    await dfs(...args)
    maxEnergized = Math.max(tilesHit.size, maxEnergized)
    mazeCpy = [...maze].map(l => l.split(''))
    tilesHit.clear()
    visited.clear()
  }

  for (const i in maze) await run(i, 0, 'e')
  for (const i in maze) await run(i, maze[0].length - 1, 'w')
  for (let i = 0; i < maze[0].length; i++) await run(0, i, 's')
  for (let i = 0; i < maze[0].length; i++) await run(maze[0].length - 1, i, 'n')

  return maxEnergized
}

pt2().then(console.log)