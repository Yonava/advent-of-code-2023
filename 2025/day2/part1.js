import { input } from "./input.js";

const badIds = [];
for (const line of input.split(',')) {
  const [bottom, top] = line.split('-')
  for (let i = Number(bottom); i <= Number(top); i++) {
    const str = i.toString();
    const first = str.slice(0, Math.floor(str.length / 2))
    const second = str.slice(Math.floor(str.length / 2))
    if (first === second) badIds.push(Number(str))
  }
}

console.log(badIds.reduce((acc, curr) => acc + curr))