import { input } from "./input.js";

const banks = input.split('\n')

const highestDigit = (str) => str
  .split('')
  .toSorted()
  .at(-1);

const firstDigits = banks.map((bank) => highestDigit(bank.slice(0, bank.length - 1)))
const secondDigits = banks.map((bank, i) => {
  const firstDigitIndex = bank.indexOf(firstDigits[i])
  return highestDigit(bank.slice(firstDigitIndex + 1));
})

const output = firstDigits
  .map((_, i) => Number(firstDigits[i] + secondDigits[i]))
  .reduce((acc, curr) => acc + curr)

console.log(output)
