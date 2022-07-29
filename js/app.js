const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

let shuffledDeck;
let cardHtml = '';
let playerDeck;
let computerDeck;
let initialPlayerScore = 26;
let initialComputerScore = 26;

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
    // Use nested forEach to generate card objects
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

let playerDeal;
let computerDeal;
let tiePlayerCards;
let tieComputerCards;
let secondPlayerTieCards;
let secondComputerTieCards;

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
    console.log(playerDeck);
    console.log(computerDeck);

  } else if (computerDeal.value > playerDeal.value) {
 
    computerScore.innerText = initialComputerScore++;
    playerScore.innerText = initialPlayerScore--;
    computerDeck.unshift(computerDeal);
    computerDeck.unshift(playerDeal);
    console.log(playerDeck);
    console.log(computerDeck);
} 
if (winGame() === false) {
  tie();
} 
console.log(initialPlayerScore,  '<---- Player Score');
console.log(initialComputerScore, '<---- Computer Score');
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
    playerDeck.pop();
    playerDeck.pop();
    playerDeck.pop();
    playerDeck.pop();
    console.log(playerDeck);
    tieComputerCards = computerDeck.slice(-4);
    computerDeck.pop();
    computerDeck.pop();
    computerDeck.pop();
    computerDeck.pop();
    console.log(computerDeck);
    for (let i = 0; i < 4; i++) {
      if (tiePlayerCards[i] && tieComputerCards[i]) {
        playerTie.innerHTML += `<div class="card ${tiePlayerCards[i].face}"</div>`
        computerTie.innerHTML += `<div class="card ${tieComputerCards[i].face}"</div>`
      }
    };
    console.log(tiePlayerCards[3].value, tieComputerCards[3].value)
    if (tiePlayerCards[3].value > tieComputerCards[3].value) {
     playerDeck.unshift(playerDeal);
     playerDeck.unshift(computerDeal);
     playerDeck.unshift(tiePlayerCards[0]);
     playerDeck.unshift(tiePlayerCards[1]);
     playerDeck.unshift(tiePlayerCards[2]);
     playerDeck.unshift(tiePlayerCards[3]);
     playerDeck.unshift(tieComputerCards[0]);
     playerDeck.unshift(tieComputerCards[1]);
     playerDeck.unshift(tieComputerCards[2]);
     playerDeck.unshift(tieComputerCards[3]);
     initialPlayerScore = initialPlayerScore + 5;
     initialComputerScore = initialComputerScore - 5;
     playerScore.innerText = initialPlayerScore;
     computerScore.innerText = initialComputerScore;
     console.log(playerDeck);
     console.log(computerDeck);
   } else if (tieComputerCards[3].value > tiePlayerCards[3].value) {
     computerDeck.unshift(playerDeal);
     computerDeck.unshift(computerDeal);
     computerDeck.unshift(tieComputerCards[0]);
     computerDeck.unshift(tieComputerCards[1]);
     computerDeck.unshift(tieComputerCards[2]);
     computerDeck.unshift(tieComputerCards[3]);
     computerDeck.unshift(tiePlayerCards[0]);
     computerDeck.unshift(tiePlayerCards[1]);
     computerDeck.unshift(tiePlayerCards[2]);
     computerDeck.unshift(tiePlayerCards[3]);
     initialComputerScore = initialComputerScore + 5;
     initialPlayerScore = initialPlayerScore - 5;
     computerScore.innerText = initialComputerScore;
     playerScore.innerText = initialPlayerScore;
     console.log(playerDeck);
     console.log(computerDeck);
   } else {
    playerDeck.unshift(playerDeal);
    playerDeck.unshift(tiePlayerCards[0]);
    playerDeck.unshift(tiePlayerCards[1]);
    playerDeck.unshift(tiePlayerCards[2]);
    playerDeck.unshift(tiePlayerCards[3]);
    computerDeck.unshift(computerDeal);
    computerDeck.unshift(tieComputerCards[0]);
    computerDeck.unshift(tieComputerCards[1]);
    computerDeck.unshift(tieComputerCards[2]);
    computerDeck.unshift(tieComputerCards[3]);
    console.log(playerDeck);
    console.log(computerDeck);
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
    console.log("You win! The computer doesn't have enough cards for war!");
    return true;
} if (initialPlayerScore <= 4 && playerDeal.value === computerDeal.value) {     
    playerTie.innerHTML = '';
    computerTie.innerHTML = '';
    winner.innerHTML = "The computer wins! You don't have enough cards for war!";
    console.log("The computer wins! You don't have enough cards for war!");
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
createNewShuffledDeck();
separateDecks();
console.log(shuffledDeck);
console.log(playerDeck);
console.log(computerDeck);
cardHtml = '';
winner.innerHTML = '';

}
restartButton.addEventListener('click', init);
