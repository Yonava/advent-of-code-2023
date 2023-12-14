const { dayTwo } = require('./inputs')

const gameArr = dayTwo.split('\n')
const bags = gameArr.map((game) => game.split(':')[1].trim().split(';').map((bagContents) => {
  return bagContents.trim().split(',').map((cubes) => cubes.trim()).map((pull) => {
    const [quant, color] = pull.split(' ')
    return [parseInt(quant), color]
  })
}))

const allowance = {
  'red': 12,
  'green': 13,
  'blue': 14
}

// part 1
console.log(bags.reduce((acc, bag, index) => {
  const valid = bag.every((round) => round.every(([quant, color]) => allowance[color] >= quant))
  return valid ? acc + index + 1 : acc
}, 0))

// part 2
console.log(bags.reduce((acc, bag) => {
  const colors = { red: 0, blue: 0, green: 0 }
  bag.forEach((round) => round.forEach(([quant, color]) => {
    colors[color] = Math.max(colors[color], quant)
  }))
  return acc + colors.red * colors.blue * colors.green;
}, 0))