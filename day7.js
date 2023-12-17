const { daySeven, daySevenSm } = require('./inputs')

const hands = daySeven.split('\n').map(line => [line.split(' ')[0], Number(line.split(' ')[1])])

const rankings = [
  (cards) => new Set(cards).size === 1,
  (cards) => cards.some(card => cards.filter(_card => _card === card).length === 4),
  (cards) => new Set(cards).size === 2,
  (cards) => cards.some(card => cards.filter(_card => _card === card).length === 3),
  (cards) => new Set(cards).size === 3,
  (cards) => new Set(cards).size === 4,
  () => true
]

const cardRank = 'AKQJT98765432'

const out = hands
  .map(([hand, bet]) => ({ rank: rankings.findIndex((rank) => rank(hand.split(''))), bet, hand }))
  .sort((handA, handB) => {
    if (handA.rank !== handB.rank) return handA.rank - handB.rank
    for (let i = 0; i < handA.hand.length; i++) {
      if (handA.hand[i] === handB.hand[i]) continue
      return cardRank.indexOf(handA.hand[i]) - cardRank.indexOf(handB.hand[i])
    }
  })
  .reverse()
  .reduce((acc, { bet }, index) => acc + (index + 1) * bet, 0)

console.log(out)