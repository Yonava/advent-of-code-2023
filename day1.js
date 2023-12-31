const { dayOne } = require('./inputs')
const PART_2 = true

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

  // start of part 2 block
  if (PART_2) {
    words.forEach((word) => {
      const firstIndex = str.indexOf(word)
      if (firstIndex === -1) return
      strArr[firstIndex] = wordMap[word]
      strArr[str.lastIndexOf(word)] = wordMap[word]
    })
  }
  // end of part 2 block

  return parseInt(strArr.find(isNum) + strArr.findLast(isNum))
}

const compute = (input) => input.reduce((acc, curr) => decode(curr) + acc, 0)
console.log(compute(dayOne.split('\n')))