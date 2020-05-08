
/*----- constants -----*/
const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const shootAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');

const rpsLookup = {
  r: {
    imgUrl: 'imgs/rock.png',
    beats: 's'
  },
  p: {
    imgUrl: 'imgs/paper.png',
    beats: 'r'
  },
  s: {
    imgUrl: 'imgs/scissors.png',
    beats: 'p'
  }
};

/*----- app's state (variables) -----*/
let scores, results, winner;

/*----- cached element references -----*/
const scoreEls = {
  p: document.getElementById('p-score'),
  t: document.getElementById('t-score'),
  c: document.getElementById('c-score')
};

const resultEls = {
  p: {
    borderEl: document.getElementById('p-result'),
    imgEl: document.querySelector('#p-result img')
  },
  c: {
    borderEl: document.getElementById('c-result'),
    imgEl: document.querySelector('#c-result img')
  }
};

/*----- event listeners -----*/
document.querySelector('main button')
  .addEventListener('click', playRound);

/*----- functions -----*/
init();

function init() {
  scores = {
    p: 0,
    t: 0,
    c: 0
  };
  results = {
    p: 'r',
    c: 'r'
  };
  winner = null;  // 'p', 't', 'c'
  render();
}

function render() {
  // render scores
  for (let score in scores) {
    scoreEls[score].textContent = scores[score];
  }
  // render results
  for (let result in results) {
    resultEls[result].borderEl.style.borderColor =
      winner === result ? 'grey' : 'white';
    resultEls[result].imgEl.src =
      rpsLookup[results[result]].imgUrl;
  }
}

function playRound() {
  // Determine results
  results.p = getRandomRPS();
  results.c = getRandomRPS();
  // Determine winner
  if (results.p === results.c) {
    winner = 't';
  } else if (results.c === rpsLookup[results.p].beats) {
    winner = 'p';
  } else {
    winner = 'c';
  }
  // Update score
  scores[winner]++;
  // After all impacted state has been updated, call render
  render();
}

function getRandomRPS() {
  let rps = Object.keys(rpsLookup);
  let rndIdx = Math.floor(Math.random() * rps.length);
  return rps[rndIdx];
}
