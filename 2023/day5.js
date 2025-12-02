const { dayFive, dayFiveSm } = require('./inputs')

const input = dayFiveSm.split('\n').filter(x=>x)
// const seeds = input.shift().split(':')[1].split(' ').slice(1).map(n => Number(n))
const seeds = new Array(100).fill(0).map((_, indx) => indx + 1)

const seedMaps = []
let stage = []
for (const str of input.slice(1)) {
  if (str.includes('map')) {
    seedMaps.push(stage)
    stage = []
  } else {
    stage.push(str.split(' ').map(n => Number(n)))
  }
}

seedMaps.push(stage)

const temp = []

const out = seeds.reduce((currMin, seed) => {
  const seedLoc = seedMaps.reduce((currLoc, seedMap) => {
    for (const [src, origin, range] of seedMap) {
      const inRange = currLoc >= origin && currLoc <= origin + range
      if (!inRange) continue
      return currLoc + src - origin
    }
    return currLoc
  }, seed)
  temp.push(seedLoc)
  return Math.min(currMin, seedLoc)
}, Infinity)

console.log(temp.map((t,i) => [i+1, t]))