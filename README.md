# Project One: War!

War is a card game based on random outcomes. 

A deck of 52 cards, with 4 suits of each number (2-A), is **shuffled randomly** at the start of the game. The deck is then split in half between **two** players. Neither player may look at their cards, and must keep their respective decks face down. At each deal, both players will take the card on top of their decks and flip it face-up in front of one another. The card out of the two with the higher value wins, and the player that put the higher card down keeps **both of the cards** that were put down in that deal. Then, the winning player puts the two cards they just won face down back into the bottom of their deck. 

The rank of each card is as follows, from lowest to highest, with 2 being the lowest rank and Ace (A) being the highest:

2, 3, 4, 5 , 6, 7, 8, 9, 10, J, Q, K, A 

If both players deal cards with the same value, then you have what's called a War (otherwise known as a tie). When there's a War, both players must put down **four** cards at the same time. Then, the winner of the deal is determined by the **fourth** card that the players put down after the inital tie. Like before, the winning card is determined by the higher value card. The player that wins the War gets to keep all **10** cards that were put down on the table during the War (tie). This results in a net value of 5 extra cards (points) for the winning player and a 5 less cards (points) for the losing player. 

In this version of the game, if the fourth card of each player dealt during the War is also the same value as the other (another tie), then each player takes the 5 cards that they dealt in the current round and places it back into the bottom of their respective decks. Neither player wins any new cards or points. Then, continue the game as normal to proceed. 

There are **two (2)** ways to win War: 

1. One of the two players obtains all 52 cards in their deck, leaving the other player with 0 cards. 
2. One of the two players has enough cards that if a War (tie) is initiated, the other player does not have enough cards to put another 4 cards down to settle the War. 

For the second scenario, if one of the players has **48 or more** cards (meaning the other has **4 or less** cards) and a War (tie) is initiated, the player with less cards would not have enough to put down another **4 cards** to settle the War. In this case, the opposite player who **does** have enough cards automatically wins.   

 

 When the board first loads, you should find it empty, with no cards dealt and no scores displayed. On the bottom of the page, you will find a "Deal Card" button and a "Restart Game" button. 

![alt text](https://i.imgur.com/ceeBAFp.png)

 Pressing the "Deal Card" button will start the game automatically. This means that a full 52-card deck is created, shuffled randomly, and divided into two equal decks (26 each) for the computer and for the player (you). Then, the card on top of your deck is shown on the user interface along with the computer's, simultaneously. 

 The card positioned above the other on the screen is the **computer's card**, while the other is the **player's (yours)**. In the image below, the **Queen of Spades** is the **computer's dealt card** and the **4 of Diamonds** is the **player's (your) card**. 

Essentially: 

- Top card displayed: Computer's Deal.
- Bottom card displayed: Player (your) Deal.

Then, you may continue to press the "Deal Card" button to progress the game. The scores automatically update upon pressing the "Deal Card" button, based on who won and who lost the current deal. Keep in mind that the scores are also representative of how many cards you and the computer have left in your respective decks. 

![alt text](https://i.imgur.com/GxSMJoQ.png)

In the case of a War, 8 new cards will display on the user interface, below the 2 cards that were tied. The set of 4 cards on the **right** of the screen are **your War cards**, while the set of 4 cards on the **left** of the screen are the **computer's War cards**. The cards being **compared** to determine the **winner** of the war is the **rightmost** card in each set. For example, in the image below, the cards being compared to settle the War are the **Ace of Spades** in the set of cards on the left (computer's cards) and the **King of Diamonds** in the set of cards on the right (your cards). They are the **rightmost** positioned cards in their sets. In this case, the player who put down the **Ace of Spades** wins **all 10** cards that were put down on the table as a result of the War. 

![alt text](https://i.imgur.com/8bExU6Y.png)

Remember, there are two ways a player can win this game, as stated above. Below are examples of each scenario that merits a win for either player. 

![alt text](https://i.imgur.com/Abnqqyy.png)

In the image above, the computer won because it was able to obtain all 52 cards in the deck, leaving the other player with 0 cards.

![alt text](https://i.imgur.com/x891aPI.jpg)

In the image above, the computer won because the other player did not have enough cards to put down to settle the War (a tie between a  7 of Hearts and 7 of Spades). 

To play a new game with a newly shuffled deck, press the "Restart Game" button. This will also reset each player's deck to 26 cards each. 