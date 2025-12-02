const { daySeven, daySevenSm } = require('./inputs')
const PART_2 = true

const hands = daySevenSm.split('\n').map(line => [line.split(' ')[0], Number(line.split(' ')[1])])

const frq = (card, cards) => cards.split('').filter(_card => _card === card).length
const handify = (h) => h.split('').sort((a, b) => frq(b, h) !== frq(a, h) ? frq(a, h) - frq(b, h) : a > b ? -1 : 1)

const rankings = new Array(4).fill(0).map((_, i) => (cards) => cards.slice(i).every(card => cards.at(-1) === card))
rankings.splice(2, 0, (cards) => new Set(cards).size === 2)
rankings.splice(4, 0, (cards) => new Set(cards).size === 3)
rankings.push(() => true)

const getRank = (rank, hand) => rank(PART_2 ? hand.filter(c => c !== 'J') : hand)
const cardRank = PART_2 ? 'AKQT98765432J' : 'AKQJT98765432'

const out = hands
  .map(([hand, bet]) => ({ rank: rankings.findIndex((rank) => getRank(rank, handify(hand))), bet, hand }))
  .sort((a, b) => {
    if (a.rank !== b.rank) return b.rank - a.rank
    for (let i = 0; i < a.hand.length; i++) {
      if (a.hand[i] === b.hand[i]) continue
      return cardRank.indexOf(b.hand[i]) - cardRank.indexOf(a.hand[i])
    }
  })
  .reduce((acc, { bet }, index) => acc + (index + 1) * bet, 0)

console.log(out)