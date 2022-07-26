
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks.
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
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
//const clearTieButton = document.getElementById('clear-tie');
const shuffleAndPlay = document.getElementById('shuffle');
const restartButton = document.getElementById('restart');
let pCard = document.querySelector('.p-card');
let cCard = document.querySelector('.c-card');
let playerScore = document.getElementById('player-score');
let computerScore = document.getElementById('computer-score');
let computerTie = document.getElementById('computerTieContainer');
let playerTie = document.getElementById('playerTieContainer');
/*----- event listeners -----*/
shuffleAndPlay.addEventListener('click', createNewShuffledDeck);
shuffleAndPlay.addEventListener('click', separateDecks);

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
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || Number(letterRank)                                                                     
        });
      });
    });
    console.log(deck);
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

/* function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}
renderDeckInContainer(playerDeck, shuffledPlayerContainer);
renderDeckInContainer(computerDeck, shuffledComputerContainer);

// The cards now show on the screen and they're randomized every time.  Congrats!

// Now, create a function that allows you to pass the image of a random card into the containers placed in the middle of the screen. 
*/ 

let playerDeal;
let computerDeal;
let tiePlayerCards;
let tieComputerCards;

function dealACard() {

  resetTie();

  playerDeal = playerDeck.pop();
  computerDeal = computerDeck.pop();

  pCard.innerHTML = `<div class="card ${playerDeal.face}"</div>`;
  cCard.innerHTML = `<div class="card ${computerDeal.face}"</div>`;

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
} else {
  tie();
}
console.log(initialPlayerScore,  '<---- Player Score');
  console.log(initialComputerScore, '<---- Computer Score');
render();
}

function render() {
computerScore.innerText = initialComputerScore;
playerScore.innerText = initialPlayerScore;
}

function tie() {
  if (playerDeal.value === computerDeal.value) {
    tiePlayerCards = playerDeck.slice(-3);
    console.log(tiePlayerCards);
    tieComputerCards = computerDeck.slice(-3);
    console.log(tieComputerCards);
   playerTie.innerHTML += `<div class="card ${tiePlayerCards[0].face}"</div>`
   playerTie.innerHTML +=`<div class="card ${tiePlayerCards[1].face}"</div>` 
   playerTie.innerHTML += `<div class="card ${tiePlayerCards[2].face}"</div>`
   computerTie.innerHTML += `<div class="card ${tieComputerCards[0].face}"</div>` 
   computerTie.innerHTML += `<div class="card ${tieComputerCards[1].face}"</div>` 
   computerTie.innerHTML += `<div class="card ${tieComputerCards[2].face}"</div>`;

   if (tiePlayerCards[2].value > tieComputerCards[2].value) {
     playerDeck.unshift(tiePlayerCards[0]);
     playerDeck.unshift(tiePlayerCards[1]);
     playerDeck.unshift(tiePlayerCards[2]);
     playerDeck.unshift(tieComputerCards[0]);
     playerDeck.unshift(tieComputerCards[1]);
     playerDeck.unshift(tieComputerCards[2]);
     initialPlayerScore = initialPlayerScore + 4;
     initialComputerScore = initialComputerScore -4;
     playerScore.innerText = initialPlayerScore;
     computerScore.innerText = initialComputerScore;
     console.log(initialPlayerScore);
     console.log(initialComputerScore);
   } else if (tieComputerCards[2].value > tiePlayerCards[2].value) {
     computerDeck.unshift(tieComputerCards[0]);
     computerDeck.unshift(tieComputerCards[1]);
     computerDeck.unshift(tieComputerCards[2]);
     computerDeck.unshift(tiePlayerCards[0]);
     computerDeck.unshift(tiePlayerCards[1]);
     computerDeck.unshift(tiePlayerCards[2]);
     initialComputerScore = initialPlayerScore + 4;
     initialPlayerScore = initialComputerScore - 4;
     computerScore.innerText = initialComputerScore;
     playerScore.innerText = initialPlayerScore;
     console.log(initialPlayerScore);
     console.log(initialComputerScore);

}
}
render(); 
}

function resetTie() {
  playerTie.innerHTML = '';
  computerTie.innerHTML = '';
}

function gameOver() {
  if (initialPlayerScore === 52) {
    
  }
}

// Write a function that will change the scores on the DOM. 


/*function compareCards() {


    for (let i = 0; i < playerDeck.length; i++) {

    if (playerDeck[i].value > computerDeck[i].value) {
        playerScore.innerText = initialPlayerScore++;
        computerScore.innerText = computerScore--;
    } else if (computerDeck[i].value > playerDeck[i].value) {
        computerScore.innerText = initialComputerScore++;
        playerScore.innerText =  playerScore--;
    } else if (computerDeck[i].value === playerDeck[i].value) {
        console.log('Its a tie!');
    }
    }
    for (let i = 0; i < computerDeck.length; i++) {

        if (playerDeck[i].value > computerDeck[i].value) {
            playerScore.innerText = initialPlayerScore++;
            computerScore.innerText = computerScore--;
        } else if (computerDeck[i].value > playerDeck[i].value) {
            computerScore.innerText = initialComputerScore++;
            playerScore.innerText =  playerScore--;
        } else if (computerDeck[i].value === playerDeck[i].value) {
            console.log('Its a tie!');
        }
}
}
dealButton.addEventListener('click', compareCards);
*/

// Create the init function below. 

/* function init() {
  scores = {
    initialPlayerScore: 26,
    initialComputerScore: 26,
};
  winner = null;
  cardHtml = '';
  
}
restartButton.addEventListener('click', init);
*/ 

// The init() function is a reset button. So, create the init() function such that it resets the
// game to its original state. Start with the Master Deck.

function init() {

  buildMasterDeck();
  separateDecks();
  scores = {
    initialPlayerScore: 26,
    initialComputerScore: 26,
  };
  cardHtml = '';
  winner = null;
}
restartButton.addEventListener('click', init);

