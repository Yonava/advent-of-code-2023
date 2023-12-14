const { dayOne } = require('./inputs')

const wordMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

const words = Object.keys(wordMap)

const isNum = (char) => !isNaN(parseInt(char))

const decode = (str) => {
  const strArr = str.split('')
  words.forEach((word) => {
    const firstIndex = str.indexOf(word)
    if (firstIndex === -1) return
    strArr[firstIndex] = wordMap[word]
    strArr[str.lastIndexOf(word)] = wordMap[word]
  })
  return parseInt(strArr.find(isNum) + strArr.findLast(isNum))
}

const compute = (input) => input.reduce((acc, curr) => decode(curr) + acc, 0)

console.log(compute(dayOne.split('\n')))