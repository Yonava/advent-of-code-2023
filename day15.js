const { dayFifteen: df } = require('./inputs')

const HashMap = (size = 256) => {
  const arr = Array.from(Array(size), () => [])
  const hash = (str) => str.split('').reduce((a, c) => (a + c.charCodeAt(0)) * 17 % size, 0)
  const get = (key) => arr[hash(key)].find(([iKey]) => iKey === key)
  return {
    arr,
    set: (key, val) => get(key) ? get(key)[1] = Number(val) : arr[hash(key)].push([key, Number(val)]),
    del: (key) => {
      const index = arr[hash(key)].findIndex(([iKey]) => iKey === key)
      if (index !== -1) arr[hash(key)].splice(index, 1)
    }
  }
}

const map = HashMap()
const ins = (str) => str.endsWith('-') ? map.del(str.slice(0, -1)) : map.set(...str.split('='))
df.split(',').forEach(ins)

const out = map.arr.reduce((total, box, boxI) => total + box.reduce((boxTotal, lens, lensI) => {
  return boxTotal + (boxI + 1) * (lensI + 1) * lens[1]
}, 0), 0)

console.log(out)