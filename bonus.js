const readline = require('readline');

const ranks = '23456789TJQKA'.split('');
const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getDeck = () => suits.reduce((acc, curr) => {
  for (const rank of ranks) {
    if (!'JQK'.includes(rank)) continue
    acc.push(rank + ' of ' + curr)
  };
  return acc;
}, []);

const draw = (n = 52) => shuffle(getDeck()).slice(0, n);

const run = async (n = 52) => {
  const cards = draw(n);
  for (let i = 0; i < cards.length; i++) {
    console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nCard ${i + 1} is ${cards[i]}`);
    await prompt('Press Enter to Continue...');
  }

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  console.log('Lets Hope You Remembered That!')

  let score = 0
  for (let i = 0; i < cards.length; i++) {
    const input = await prompt(`Card ${i + 1} Was: `);
    console.log('\n')
    const correct = cards[i].toLowerCase() === input.toLowerCase()
    if (correct) score++
    console.log(`${correct} - It Was Actually ${cards[i]}!`)
  }

  console.log(`---------------------- \n\nYou Scored ${score}/${n}`)
}

const prompt = (message) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(message, (entered) => {
      rl.close();
      resolve(entered);
    });
  });
}

run(12);