console.log('JavaScript is working!');

/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks.
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/ // There's more past this section of code. 

let shuffledDeck;
let cardHtml = '';
let playerDeck;
let computerDeck;
let initialPlayerScore = 26;
let initialComputerScore = 26;

/*----- cached element references -----*/

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

/*----- event listeners -----*/

// All event listeners can be found under the functions that they call. See below. 

/*----- functions -----*/

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
          // The 'face' property maps to the library's CSS classes for cards.
          face: `${suit}${rank}`,
          // Setting the 'value' property.
          value: Number(rank) || Number(letterRank)                                                                     
        });
      });
    });
    return deck;
  }
  createNewShuffledDeck();

// In the function above, the masterDeck is built and each rank is given numerical values. 


function getMasterDeckCopy() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    let rndCard = tempDeck.splice(rndIdx, 1)[0];
    newShuffledDeck.push(rndCard);
  }
  return newShuffledDeck;
}

// In the function above, a tempDeck is made as a COPY of the masterDeck to ensure that the masterDeck isn't changed. 
// Then the tempDeck is shuffled randommly and placed into a new deck called newShuffledDeck. 


function createNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getMasterDeckCopy();
  //console.log(shuffledDeck);
  // renderDeckInContainer(shuffledDeck, shuffledContainer);
}

// In the function above, the newShuffledDeck created from the function is set equal to shuffledDeck.


// Now, create a function that separates shuffledDeck into 2: one for the player and one for the computer.

function separateDecks() {
    playerDeck = shuffledDeck.slice(0, 26);
    computerDeck = shuffledDeck.slice(26, 52);
    //console.log(playerDeck);
    //console.log(computerDeck);
}
separateDecks();

// Below are the other state variables mentioned earlier. 

let playerDeal;
let computerDeal;
let tiePlayerCards;
let tieComputerCards;
let secondPlayerTieCards;
let secondComputerTieCards;

// Write a function below that pulls from the computerDeck and playerDeck arrays and 
// displays it on the UI. 

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

// Write a function below that compares the two cards that each player puts down. 

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

// Write a function below that will update the scores on the UI as the game plays out. 

function render() {
computerScore.innerText = initialComputerScore;
playerScore.innerText = initialPlayerScore;
}

// Write a function below that will account for a tie. 

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

// Write a function below that removes the tie cards from the UI. 

function resetTie() {
  playerTie.innerHTML = '';
  computerTie.innerHTML = '';
}

// Write a function below for the winning logic.

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


// The init() function is a reset button. So, create the init() function such that it resets the
// game to its original state. Start with the Master Deck.

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
