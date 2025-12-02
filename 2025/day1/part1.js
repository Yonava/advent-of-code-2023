import { input } from './input.js'

const rotations = input.split('\n').map((str) => ({
  direction: str.slice(0, 1),
  steps: Number(str.slice(1))
}))

let curr = 50;
let password = 0;

for (const { steps, direction } of rotations) {
  curr += direction === 'L' ? -steps : steps;
  if (curr % 100 === 0) password++;
}

console.log(password)