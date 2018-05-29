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

// Add click event listener to new game button
document.querySelector('.btn-new').addEventListener('click', newGame);

// Add click event listener to hold button
document.querySelector('.btn-hold').addEventListener('click', hold);


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
		// reset roundScore and display reset current score
		roundScore = 0;
		nextPlayer();
		hideDice();
		
	}
	
}

// newGame function
function newGame(){
	console.log('New Game');
	/* 
	- reset current score & score array
	- diplay new scores
	- hide dice
	*/
	scores = [0,0];
	document.querySelector('#score-0').textContent = scores[0];
	document.querySelector('#score-1').textContent = scores[1];
	hideDice();
	
}

// hold function
function hold(){
	/* Check for winner
	- is activePlayer score > winning score 
	*/
	var winScore = 20;
	// console.log('Entry - Active Player: ',activePlayer, scores[activePlayer],scores[activePlayer] > 19);
	myDebug('Entry-');
	if(scores[activePlayer] >= 19) {
		// display winner, stop roll dice and hold buttons
		displayWinner();
		disablePlay();
		hideDice()
		
	} else {
		// Next player: toggle player from 0 to 1 or vice versa
		nextPlayer();
		// console.log('Hold: ' + roundScore, activePlayer);
	}
	myDebug('Exit-');
}
/* function nextPlayer
	- reset roundScore
	- display current activePlayer roundScore
	- toggle players 0 to 1 or 1 to 0
	- add roundScore to scores
	- display scores
	
*/
function nextPlayer() {
	// add current score to global score
	scores[activePlayer] += roundScore;
	// after adding current score to global score, reset roundScore
	roundScore = 0;
	// Display scores
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	// toggle activePlayer to chose next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	// console.log('dice:', dice, ' Next player', 'roundScore', roundScore, 'activePlayer', activePlayer);

	// toggle css class to highlight active player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	hideDice();

}

function hideDice(){
	// hide dice until next player clicks roll dice
	document.querySelector('.dice').style.display = 'none';
}
function displayWinner(){
	console.log("Winner is Player " + parseInt(activePlayer+1));
	document.querySelector('#name-' + activePlayer).textContent = 'Winner';
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

function disablePlay(){
	console.log('Play disabled');
	// Remove click event listener to roll dice button (btn-roll)
	document.querySelector('.btn-roll').removeEventListener('click', rollDice);
	// Remove click event listener to hold button
	document.querySelector('.btn-hold').removeEventListener('click', hold);
}

function myDebug(prefix){
	console.log(prefix + 'Active Player: ',activePlayer);
	console.log(prefix + 'score[0]: ',scores[0]);
	console.log(prefix + 'score[1]: ',scores[1]);
	console.log(prefix + 'is scores[activelayer]> 19', scores[activePlayer] >= 20);
	console.log('---------------------------------------------')
	
}