const { dayFour } = require('./inputs')

const input = dayFour.split('\n').map((line) => line.split(':')[1].split('|')).map(([ticket, winners]) => {
  return [ticket.split(' ').filter(i => i), winners.split(' ').filter(i => i)]
});

const res = input.reduce((acc, [ticket, winners]) => {
  const matches = ticket.reduce((acc, num) => winners.includes(num) ? acc + 1 : acc, 0)
  return !matches ? acc : acc + 2**(matches - 1)
}, 0)

console.log(res)