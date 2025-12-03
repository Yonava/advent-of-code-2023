import { input } from './input.js'

const rotations = input.split('\n').map((str) => ({
  direction: str.slice(0, 1),
  steps: Number(str.slice(1))
}))

let currentLocation = 50;
let password = 0;

for (const { steps, direction } of rotations) {
  const distance = direction === 'R' ? (steps + currentLocation) : (currentLocation === 0 ? steps : (100 - currentLocation) + steps);
  const revolutions = Math.trunc(distance / 100);
  password += revolutions;
  currentLocation = direction === 'R' ? distance % 100 : (100 - (distance % 100)) % 100;
}

console.log(password)