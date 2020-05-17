/*----- constants -----*/
const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const shootAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');


// Create a data structure to lookup rock paper or scissors
const rpsLookup = {
    r: {
        imgUrl: 'imgs/rock.png',
        beats: 's'// beats scissors
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
let scores; // the player and computers scores, and number of ties
let results; // this is the player and computers results
let winner; // who was the winner

/*----- cached element references -----*/
const scoreElements = {
    player: document.querySelector("#player-score"),
    tie: document.querySelector('#tie-score'),
    computer: document.querySelector('#computer-score')
}

const resultsElements = {
    player: document.querySelector("#player-result img"),
    computer: document.querySelector('#computer-result img')
}

/*----- add event listeners -----*/
document.querySelector('main button')
    .addEventListener('click', playRound)


init()

function init(){
    // initializes our state variables
    scores = {
        player: 1,
        tie: 1,
        computer: 1
    };

    results = {
        player: 'r',
        computer: 'r'
    }

    winner =  null; 'player, tie, computer'
    render()
}

function render(){
    // update our view with the scoress
    for (let score in scores){
        scoreElements[score].textContent = scores[score];
    }
    // update our view with the results
    for (let result in results){
        // What should these be?
        // console.log(resultsElements[result], "<- resultElements[results]");
        // console.log(rpsLookup[results[result]].imgUrl, " rps lookup value");
        resultsElements[result].src = rpsLookup[results[result]].imgUrl
    }
};

function playRound(e){
    console.log('Play roun button is working')

    // Create a function outside of here
    // but use it in here to get a random value from our rpsLookUp
    // this funciton would return r p or s

    // run it twice
    // once for the player
    // once for the computer

    // compare our results and then update our 
    // winner state variable, update the scores

    // run render()

}