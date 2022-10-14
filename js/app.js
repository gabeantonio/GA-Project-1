const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

let shuffledDeck;
let cardHtml = '';
let playerDeck;
let computerDeck;
let initialPlayerScore = 26;
let initialComputerScore = 26;
let playerDeal;
let computerDeal;
let tiePlayerCards;
let tieComputerCards;
let secondPlayerTieCards;
let secondComputerTieCards;

const shuffledPlayerContainer = document.getElementById('p-container');
const shuffledComputerContainer = document.getElementById('c-container');
const shuffledContainer = document.getElementById('main-container');
const dealButton = document.getElementById('deal');
const restartButton = document.getElementById('restart');
let pCard = document.querySelector('.p-card');
let cCard = document.querySelector('.c-card');
let playerScore = document.getElementById('player-score');
let computerScore = document.getElementById('computer-score');
let computerTie = document.getElementById('computerTieContainer');
let playerTie = document.getElementById('playerTieContainer');
let winner = document.getElementById('winner');

function buildMasterDeck() {
    const deck = [];
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
          let letterRank;
          if (rank === 'A') {
              letterRank = 14;
          } else if (rank === 'K') {
              letterRank = 13;
          } else if (rank === 'Q') {
              letterRank = 12;
          } else if (rank === 'J') {
              letterRank = 11;
          }
        deck.push({
          face: `${suit}${rank}`,
          value: Number(rank) || Number(letterRank)                                                                     
        });
      });
    });
    return deck;
  }
  createNewShuffledDeck();


function getMasterDeckCopy() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    let rndCard = tempDeck.splice(rndIdx, 1)[0];
    newShuffledDeck.push(rndCard);
  }
  return newShuffledDeck;
}

function createNewShuffledDeck() {
  shuffledDeck = getMasterDeckCopy();
}

function separateDecks() {
    playerDeck = shuffledDeck.slice(0, 26);
    computerDeck = shuffledDeck.slice(26, 52);
}
separateDecks();

function dealACard() {
  resetTie();
  if (playerDeck.length > 0 && computerDeck.length > 0) {
    playerDeal = playerDeck.pop();
    computerDeal = computerDeck.pop();

    pCard.innerHTML = `<div class="card ${playerDeal.face}"</div>`;
    cCard.innerHTML = `<div class="card ${computerDeal.face}"</div>`;
  }
  compareValues();
}
dealButton.addEventListener('click', dealACard);

function compareValues() {
  if (playerDeal.value > computerDeal.value) {
    playerScore.innerText = initialPlayerScore++;
    computerScore.innerText = initialComputerScore--;
    playerDeck.unshift(playerDeal);
    playerDeck.unshift(computerDeal);
  } else if (computerDeal.value > playerDeal.value) {
    computerScore.innerText = initialComputerScore++;
    playerScore.innerText = initialPlayerScore--;
    computerDeck.unshift(computerDeal);
    computerDeck.unshift(playerDeal);
  } 
  if (winGame() === false) {
    tie();
  }
  winGame();
  render();
}

function render() {
computerScore.innerText = initialComputerScore;
playerScore.innerText = initialPlayerScore;
}

function tie() {
  if (playerDeal.value === computerDeal.value) {
      tiePlayerCards = playerDeck.slice(-4);
      playerDeck.splice(-4);
      tieComputerCards = computerDeck.slice(-4);
      computerDeck.splice(-4);
    for (let i = 0; i < 4; i++) {
      if (tiePlayerCards[i] && tieComputerCards[i]) {
        playerTie.innerHTML += `<div class="card ${tiePlayerCards[i].face}"</div>`
        computerTie.innerHTML += `<div class="card ${tieComputerCards[i].face}"</div>`
      }
};
  if (tiePlayerCards[3].value > tieComputerCards[3].value) {
      playerDeck.unshift(playerDeal);
      playerDeck.unshift(computerDeal);
      playerDeck.unshift.apply(playerDeck, tiePlayerCards);
      playerDeck.unshift.apply(playerDeck, tieComputerCards);
      initialPlayerScore = initialPlayerScore + 5;
      initialComputerScore = initialComputerScore - 5;
      playerScore.innerText = initialPlayerScore;
      computerScore.innerText = initialComputerScore;
  } else if (tieComputerCards[3].value > tiePlayerCards[3].value) {
      computerDeck.unshift(playerDeal);
      computerDeck.unshift(computerDeal);
      computerDeck.unshift.apply(computerDeck, tieComputerCards);
      computerDeck.unshift.apply(computerDeck, tiePlayerCards);
      initialComputerScore = initialComputerScore + 5;
      initialPlayerScore = initialPlayerScore - 5;
      computerScore.innerText = initialComputerScore;
      playerScore.innerText = initialPlayerScore;
  } else {
      playerDeck.unshift(playerDeal);
      playerDeck.unshift.apply(playerDeck, tiePlayerCards);
      computerDeck.unshift(computerDeal);
      computerDeck.unshift.apply(computerDeck, tieComputerCards);
  }
}
render(); 
}

function resetTie() {
  playerTie.innerHTML = '';
  computerTie.innerHTML = '';
}

function winGame() {
  if (initialComputerScore <= 4 && playerDeal.value === computerDeal.value) {
    computerTie.innerHTML = '';
    playerTie.innerHTML = '';
    winner.innerHTML = "You win! The computer doesn't have enough cards for war!";
    return true;
} if (initialPlayerScore <= 4 && playerDeal.value === computerDeal.value) {     
    playerTie.innerHTML = '';
    computerTie.innerHTML = '';
    winner.innerHTML = "The computer wins! You don't have enough cards for war!";
    return true;
} if (playerDeck.length === 52) {
    winner.innerHTML = 'You win!';
} if (computerDeck.length === 52) {
    winner.innerHTML = 'The computer wins!';
} 
  return false;
}

function init() {
  initialComputerScore = 26;
  initialPlayerScore = 26;
  computerScore.innerText = initialComputerScore;
  playerScore.innerText = initialPlayerScore;
  cCard.innerHTML = '';
  pCard.innerHTML = '';
  tiePlayerCards = [];
  tieComputerCards = [];
  computerTie.innerHTML = '';
  playerTie.innerHTML = '';
  cardHtml = '';
  winner.innerHTML = '';
  createNewShuffledDeck();
  separateDecks();
}
restartButton.addEventListener('click', init);
