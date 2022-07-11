"use strict";

const PLAYER_1_SCORE = document.getElementById("score--0");
const PLAYER_2_SCORE = document.getElementById("score--1");
const PLAYER_1_CURRENT_SCORE = document.getElementById("current--0");
const PLAYER_2_CURRENT_SCORE = document.getElementById("current--1");
const PLAYER_1_FRAME = document.querySelector(".player--0");
const PLAYER_2_FRAME = document.querySelector(".player--1");
const BTN_HOLD = document.querySelector(".btn--hold");
const BTN_ROLL_DICE = document.querySelector(".btn--roll");
const BTN_NEW_GAME = document.querySelector(".btn--new");
const IMG_DICE = document.querySelector(".dice");
let scoresArr, currentScore, activePlayer, gameActive;

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  PLAYER_1_FRAME.classList.toggle("player--active");
  PLAYER_2_FRAME.classList.toggle("player--active");
};

const startGame = () => {
  PLAYER_1_FRAME.classList.remove("player--winner");
  PLAYER_2_FRAME.classList.remove("player--winner");
  PLAYER_1_FRAME.classList.add("player--active");
  PLAYER_2_FRAME.classList.remove("player--active");
  IMG_DICE.classList.add("hidden");
  PLAYER_1_SCORE.textContent = 0;
  PLAYER_2_SCORE.textContent = 0;
  PLAYER_1_CURRENT_SCORE.textContent = 0;
  PLAYER_2_CURRENT_SCORE.textContent = 0;
  scoresArr = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameActive = true;
};

startGame();

// Roll the dice

BTN_ROLL_DICE.addEventListener("click", () => {
  if (gameActive) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    IMG_DICE.classList.remove("hidden");
    IMG_DICE.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score

BTN_HOLD.addEventListener("click", () => {
  if (gameActive) {
    scoresArr[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scoresArr[activePlayer];
    if (scoresArr[activePlayer] < 100) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle("player--active");
      IMG_DICE.classList.toggle("hidden");
      gameActive = false;
    }
  }
});

// Reset the game

BTN_NEW_GAME.addEventListener("click", () => {
  startGame();
});
