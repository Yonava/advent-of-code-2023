const { daySix } = require('./inputs')
const PART_2 = true

const input = daySix.split('\n').map(l => l.split(':')[1].split(' ').filter(n => n))
const [time, dist] = input.map((l) => PART_2 ? [Number(l.join(''))] : l.map((n) => Number(n)))

const out = time.reduce((acc, t, i) => {
  const p = (t + Math.sqrt((t**2) - (4 * dist[i]) - 4)) / (2 * t)
  return acc * Math.abs(Math.ceil(t * p) - Math.ceil(t * (1 - p)))
}, 1)

console.log(out)

// for the general case where
// t = total time in race,
// p = uniform between [0, 1] where 0 is 0% spent charging and 1 is 100% spent charging,
// d = distance to beat in order to hold the record
// solve for p with tp(t(1 - p)) - d = 1 which, using the quadratic formula, implies
// p = (t +/- sqrt(t^2 - 4d - 4))/2t
// plug m and t into the following formula to get total spread:
// spread = |ceil(tp) - ceil(t(1 - p))|