/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
shuffle(icons);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardsContainer = document.querySelector('.deck');

var openCards = [];
var matchedCard = [];
let firstClick = true;

function startGame(){
    for(var i = 0; i<icons.length;i++){
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class  = "${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
        click(card);
    }

}


//add moves
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = moves;
function addMove(){
    moves++;
    movesContainer.innerHTML = moves;
    rating(moves);
}


//restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener("click",function(){
    //reinit the cards
    cardsContainer.innerHTML = "";
    //restart the game
    restart();
});


function restart(){
    startGame();
    matchedCard = [];
    moves = 0;
    openCards = [];
    movesContainer.innerHTML = moves;   
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    firstClick = true;
    totalTime = 0;
    timerContainer.innerHTML = totalTime + 's';
}



function click(card){
    card.addEventListener("click",function(){
        if(firstClick){
            startTimer();
            firstClick = false;
        }
        // existing showed card
        const currentCard = this;
        const previousCard = openCards[0];
        if(openCards.length ===1){
            card.classList.add("open","show","disable"); 
            openCards.push(this);

            compareCard(currentCard,previousCard);
            
        }else{
            // none card fliped
            card.classList.add("open","show","disable"); 
            openCards.push(this);

        }


        // show the card 
        
    });
}


function compareCard(currentCard,previousCard){
    //compare two cards are opened
    if(currentCard.innerHTML === previousCard.innerHTML){

        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCard.push(currentCard,previousCard);
        openCards = [];
        //check if the game is over
        ifGameOver();

    }else {
        //delay the unshow function
        setTimeout(function(){
            currentCard.classList.remove("open","show","disable");
            previousCard.classList.remove("open","show","disable");
            
        },500);
        openCards = [];
        addMove();
        
    }

    
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function ifGameOver(){
    if(matchedCard.length === 16){
        stopTimer();
        setTimeout(function(){
            alert("success");
        },100);
    }
}
//remove stars
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating(value) {

    switch(value){
        case 1:
            starsContainer.innerHTML = star + star + star;
            break;
        case 2:
            starsContainer.innerHTML = star + star;
            break;
        case 3:
            starsContainer.innerHTML = star;
            break;
        case 4:
        starsContainer.innerHTML = "";

    }
}


//timer
const timerContainer = document.querySelector('.timer');
var timer, totalTime = 0;
timerContainer.innerHTML = totalTime + 's';

function startTimer(){
    timer = setInterval(function(){
        totalTime++;
        timerContainer.innerHTML = totalTime + 's';

    },1000);
}
function stopTimer(){
    clearInterval(timer);
}




startGame();
