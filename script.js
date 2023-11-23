// Initialize variables
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Set initial scores to 0
  document.getElementById("score--0").textContent = "0";
  document.getElementById("score--1").textContent = "0";
  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";

  // Hide the dice at the beginning
  document.querySelector(".dice").style.display = "none";
  // Reset player names
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";

  // Enable the Roll Dice and Hold buttons
  document.getElementById("roll-dice").disabled = false;
  document.getElementById("hold").disabled = false;

  // Add active class to the first player
  document
    .querySelector(".player--0")
    .classList.add("player--active");
  document
    .querySelector(".player--1")
    .classList.remove("player--active");
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = "0";
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle the "player--active" class
  document
    .querySelector(".player--0")
    .classList.toggle("player--active");
  document
    .querySelector(".player--1")
    .classList.toggle("player--active");
}

function rollDice() {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice
    const diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Check for a rolled 1
    if (dice !== 1) {
      // Add dice value to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
}

function hold() {
  if (playing) {
    // 1. Add the current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player has won
    if (scores[activePlayer] >= 55) {
      document.getElementById(`name--${activePlayer}`).textContent = "Winner!";
      playing = false;
      document.querySelector(".dice").style.display = "none";
      document.getElementById("roll-dice").disabled = true;
      document.getElementById("hold").disabled = true;
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
}

// Event listeners
document.getElementById("new-game").addEventListener("click", init);
document.getElementById("roll-dice").addEventListener("click", rollDice);
document.getElementById("hold").addEventListener("click", hold);

// Initialize the game
init();
