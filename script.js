'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, activeplayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // check for 1
    if (dice != 1) {
      //Add dice to current score
      currentscore += dice;

      //dynamic selection of active player
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;

      // current0El.textContent = currentscore; static selection of player
    } else {
      //switch to next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check if player score >==100
    if (scores[activeplayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);
