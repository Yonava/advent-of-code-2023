const { readFileSync } = require('fs')

const maze = readFileSync('./input.txt').toString().split('\n')

const dirs = {
  n: [-1, 0],
  e: [0, 1],
  w: [0, -1],
  s: [1, 0]
}

const visited = new Set()
const tilesHit = new Set()

const dfs = async (x, y, dir) => {
  const tile = maze?.[y]?.[x]
  if (tile === undefined || visited.has(`${y},${x},${dir}`)) return
  visited.add(`${y},${x},${dir}`)
  tilesHit.add(`${y},${x}`)
  switch (tile) {
    case '\\':
      if (dir === 'e') return dfs(x + dirs.s[1], y + dirs.s[0], 's')
      else if (dir === 'w') return dfs(x + dirs.n[1], y + dirs.n[0], 'n')
      else if (dir === 'n') return dfs(x + dirs.w[1], y + dirs.w[0], 'w')
      else return dfs(x + dirs.e[1], y + dirs.e[0], 'e')
    case '/':
      if (dir === 'e') return dfs(x + dirs.n[1], y + dirs.n[0], 'n')
      else if (dir === 'w') return dfs(x + dirs.s[1], y + dirs.s[0], 's')
      else if (dir === 'n') return dfs(x + dirs.e[1], y + dirs.e[0], 'e')
      else return dfs(x + dirs.w[1], y + dirs.w[0], 'w')
    case '|':
      if (dir === 'n' || dir === 's') break
      dfs(x + dirs.n[1], y + dirs.n[0], 'n')
      dfs(x + dirs.s[1], y + dirs.s[0], 's')
      return
    case '-':
      if (dir === 'e' || dir === 'w') break
      dfs(x + dirs.e[1], y + dirs.e[0], 'e')
      dfs(x + dirs.w[1], y + dirs.w[0], 'w')
      return
  }
  dfs(x + dirs[dir][1], y + dirs[dir][0], dir)
}

// PART 2

const trials = []
for (let i = 0; i < maze.length; i++) {
  dfs(0, i, 'e')
  trials.push(tilesHit.size)
  tilesHit.clear()
  visited.clear()
}

for (let i = 0; i < maze.length; i++) {
  dfs(maze[0].length - 1, i, 'w')
  trials.push(tilesHit.size)
  tilesHit.clear()
  visited.clear()
}

for (let i = 0; i < maze[0].length; i++) {
  dfs(i, 0, 's')
  trials.push(tilesHit.size)
  tilesHit.clear()
  visited.clear()
}

for (let i = 0; i < maze[0].length; i++) {
  dfs(i, maze[0].length - 1, 'n')
  trials.push(tilesHit.size)
  tilesHit.clear()
  visited.clear()
}

console.log('done', Math.max(...trials))