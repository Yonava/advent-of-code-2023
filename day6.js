const input =
`Time:        41     66     72     66
Distance:   244   1047   1228   1040`.split('\n')

const time = parseInt(input[0].split(':')[1].split('').filter(n => !isNaN(parseInt(n))).join(''))
const dist = parseInt(input[1].split(':')[1].split('').filter(n => !isNaN(parseInt(n))).join(''))

const spreads = []

// time.forEach((raceTime, raceIndex) => {
//   let raceSpread = 0
//   for (let i = 0; i < raceTime; i++) {
//     const remainingTime = raceTime - i
//     const raceDist = remainingTime * i
//     if (raceDist > dist[raceIndex]) raceSpread++
//     else if (raceSpread) break
//   }
//   spreads.push(raceSpread)
// })

// console.log(spreads.reduce((acc, curr) => acc * curr))