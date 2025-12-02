const { dayFifteen: df } = require('./inputs')

const HashMap = (size = 256) => {
  const arr = Array.from(Array(size), () => [])
  const hash = (str) => str.split('').reduce((a, c) => (a + c.charCodeAt(0)) * 17 % size, 0)
  const get = (key) => arr[hash(key)].find(([k]) => k === key)
  return {
    getLenseScore: () => arr.reduce((total, box, boxI) => total + box.reduce((boxTotal, lens, lensI) => {
      return boxTotal + (boxI + 1) * (lensI + 1) * lens[1]
    }, 0), 0),
    set: (key, val) => get(key) ? get(key)[1] = val : arr[hash(key)].push([key, val]),
    del: (key) => {
      const index = arr[hash(key)].findIndex(([k]) => k === key)
      index !== -1 && arr[hash(key)].splice(index, 1)
    }
  }
}

const map = HashMap()
const insert = (str) => str.endsWith('-') ? map.del(str.slice(0, -1)) : map.set(...str.split('='))
df.split(',').forEach(insert)

console.log(map.getLenseScore())