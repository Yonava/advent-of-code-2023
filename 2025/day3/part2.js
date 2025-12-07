import { input } from "./input.js";

const example = `987654321111111
811111111111119
234234234234278
818181911112111`

const getChosenDigit = (bank, currentIndex, wiggleRoom) => {
  const bankSlice = bank.slice(currentIndex, currentIndex + wiggleRoom)
  const digitsToChooseFrom = bankSlice.split('').map((digit, i) => ({
    indexIncrement: i,
    digit,
  }));
  const [digitChosen] = digitsToChooseFrom.toSorted((a, b) => Number(b.digit) - Number(a.digit))
  return digitChosen;
}

const banks = input.split('\n')

const output = []

for (const bank of banks) {
  let wiggleRoom = bank.length - 11;
  let digits = '';
  let currentIndex = 0;
  while (digits.length < 12) {
    const digitChosen = getChosenDigit(bank, currentIndex, wiggleRoom)
    currentIndex += digitChosen.indexIncrement + 1;
    wiggleRoom -= digitChosen.indexIncrement;
    digits += digitChosen.digit;
  }
  output.push(digits)
}

const finalOutput = output
  .reduce((acc, curr) => acc + Number(curr), 0)

console.log(finalOutput)
