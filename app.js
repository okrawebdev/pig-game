/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Declare variables
var scores, roundScore, activePlayer;

// Assign values to variables
scores = [0,0];
roundScore = 0;
activePlayer = 0;


// Hide dice image
document.querySelector('.dice').style.display = 'none';
// set current scores and roundscores to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// Add click event listener to roll dice button (btn-roll)
document.querySelector('.btn-roll').addEventListener('click', rollDice);

// rollDice function
function rollDice(){
	// output to console for now
	// console.log('Roll dice button clicked')
	// Calculate random number for DICE
	// Math.floor rounds down numbers
	var dice = Math.floor(Math.random() * 6)+1;
	
	// display dice image
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice +'.png';
	
	// update roundScore if dice greater than 1
	// else reset current score and go other player
	if (dice> 1){
		roundScore += dice;
		// append activePlayer value to "current-" to get ID for selection
		document.querySelector('#current-'+activePlayer).textContent = roundScore;
		
	} else {
		// next player
		// reset roundScore and display reset current score
		roundScore = 0;
		document.querySelector('#current-'+activePlayer).textContent = roundScore;
		// toggle activePlayer to chose next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		// console.log('dice:', dice, ' Next player', 'roundScore', roundScore, 'activePlayer', activePlayer);
		
		// toggle css class to highlight active player
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
	}
	
}