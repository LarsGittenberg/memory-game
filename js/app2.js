
/*     ************ Udacity Memory Game Project JS ****************     */


/*     ************ VARIABLE DECLARATIONS  ****************     */
let timerWasStarted = false;//boolean switch used to ensure timer.start() only runs once per game session, until game is reset

let cardPair = [];// array dynamically storing 2 html objects, objects later added/removed of classes eg. addClass('match') or removeClass('show open')

let cardPairSymbol = [];// array dynamically storing  max 2 strings, strings later compared for a match eg 'fa fa-leaf'

const threeStars = '<li><i class="fa fa-star"></i></li>\
<li><i class="fa fa-star"></i></li>\
<li><i class="fa fa-star"></i></li>';


// easytimer.js code below from: http://albert-gonzalez.github.io/easytimer.js/
let timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {
    $('.clock').html(timer.getTimeValues().toString());
});

/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond",
                "fa-paper-plane-o",
                "fa-anchor",
                "fa-bolt",
                "fa-cube",
                "fa-leaf",
                "fa-bicycle",
                "fa-bomb",];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
function generateFullDeck() {
    let doubleCardList = cardList.concat(cardList);
    let newShuffledCardList = shuffle(doubleCardList);
	$.each(newShuffledCardList, function(index, value){
		$('.deck').append('<li class="card"><i class="fa ' +  value + ' "></i></li>');
	})
}


/*
 * set up the event listener for a card. If a card is clicked,
 call a series of functions (playMatchPair is instantiated
 i)once on load of this file, ii) on restart, when restartGame() is called
 */
function playMatchPair() {
    $('.card').on('click', function(evt) {
        //checkTimerStatus - and do either 3 things i)start ii)set event listener for reset or iii)do nothing.
        checkTimerStatus();
/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
*/
        reveal(evt);
/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*/
        addToTempOpenLists(evt);
        checkPair();
    });
}



function checkTimerStatus() {
    if (!timerWasStarted) {
        timer.start();
        timerWasStarted = true;
    }
    //so if timerWasStarted is true provide this eventlistener option to reset
    $('.restart-clock').on('click', restartGame);
    //unless restart-clock is clicked,  do nothing, exit function
}



function restartGame() {
    timer.reset();
    $('.card').remove();//this is doing the opposite of generateFullDeck();
    generateFullDeck();
    timerWasStarted = false;//this boolean switch reset will re-enable timer.start() to be called by checkTimerStatus()

    cardPair = [];
    cardPairSymbol = [];
    moveCounter = [];//reset/empty out our counter function closure created by counterMaker()
    allMatchedPairsCounter = [];

    counterMaker();
    pairMatchedCounterMaker();
    $('span.moves').html('0');// resets move 0 value
    $('ul.stars').html(threeStars);// resets to 3stars again
    playMatchPair();
}



function reveal(evt) {
    $(evt.target).addClass('show open');
    $(evt.target).css("pointer-events", "none");// this code 'desensitizes' event listener from responding (fast second click) while card is "showing"/open
    //from: https://stackoverflow.com/questions/1263042/how-to-temporarily-disable-a-click-handler-in-jquery
}



function addToTempOpenLists(evt) {
    // collect temp list of html objects/cards
    let clickedCard = $(evt.target);
    cardPair.push(clickedCard);

    // collect temp list of fa classes ie fa fa-leaf etc.
    let cardChild = $(evt.target).find('i');
    let childAttr = cardChild.attr('class');
    cardPairSymbol.push(childAttr);
}


/*
*  - if the list already has another card, check to see if the two cards match
*/
function checkPair() {
    if (cardPairSymbol.length === 2) {
/*
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/
    (cardPairSymbol[0] === cardPairSymbol[1]) ? setTimeout(matchedPair, 100) : setTimeout(noMatchedPair, 700);

/*
// *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*/
    moveCounter[0]();
    }
}



function matchedPair(card) {
    for (let i = 0; i<cardPair.length; i++) {
        $(cardPair[i]).addClass('match');
        $(cardPair[i]).off();
        //console.log(cardPair);
    }
    // trigger a matched-pair counter to increment up to 8 pairs
    allMatchedPairsCounter[0]();

    cardPair = []; //empty out temp array pair lists -NOTE was originally using cardPair.splice(0, 2);
    cardPairSymbol = []; //empty out temp array pair lists

}



function noMatchedPair() {
    for (var i = 0; i<cardPair.length; i++) {
        $(cardPair[i]).removeClass('show open');
        $(cardPair[i]).css("pointer-events", "auto");//this re-activates event listener 'sensitivity'
        //from: https://stackoverflow.com/questions/1263042/how-to-temporarily-disable-a-click-handler-in-jquery

    }

    cardPair = []; //empties array list -NOTE was using this code instead: cardPair.splice(0, 3) especially for 3 fast clicks
    cardPairSymbol = []; //empties array list
 }



// function definition which displays message with the final score, triggered by allMatchedPairsCounter (reaching max 8)
function gameOver() {
    //slide the overlay
    $('#game-over-overlay').addClass('show');

    //get the stars final count
    let starTally = $('ul.stars').html();
    $('h1#your-score').find('ul.final-score').html(starTally);

    //get the final num of moves
    let moveTally = $('span.moves').html()
    $('h1#your-moves').find('span.final-moves').html(moveTally);

    //get the final time
    let timeTally = $('div.clock').html()
    $('h1#your-time').find('span.final-time').html(timeTally);

    //event listener to play again on repeat icon
    $('.game-over-content > .fa-repeat').on('click', function() {
        restartGame();
        $('#game-over-overlay').removeClass('show');
    })
}


//as explained in: https://classroom.udacity.com/nanodegrees/nd001/parts/9e34624d-cdc8-4cd7-9d7e-78943413e645/modules/269645859775460/lessons/2593668698/concepts/26167986420923
let moveCounter = [];// an array designed to contain one closure function that increments counter, generated by counterMaker() below:
function counterMaker() {
    let counter = 0;
    moveCounter.push( function() {
        counter++;
        //console.log('counter!')
        $('span.moves').html(counter);
        //remove a star depending on counter value
        var starScoreArray = $('ul.stars').find('i');
        if (counter === 13) {
            starScoreArray[0].className = "";
        }
        else if (counter === 20) {
            starScoreArray[1].className = "";
        }
    })
}


/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let allMatchedPairsCounter = [];// an array designed to contain one closure function that increments with every matched pair
function pairMatchedCounterMaker() {
    let pairCounter = 0;
    allMatchedPairsCounter.push( function() {
        pairCounter++;
        if (pairCounter === 8) {
            //open game over overlay
            setTimeout(gameOver, 800);
        }
    })
}

/*     ************ INITIAL FUNCTION CALLS  ****************     */
// THESE FUNCTIONS WILL INSTANTIATE AT THE VERY START/ON LOAD

generateFullDeck();
playMatchPair();

// THESE FUNCTIONS WILL INSTATIATE AND INITIALIZE COUNTER CLOSURES ON START/LOAD

counterMaker();
pairMatchedCounterMaker();

//Udacity Code Project Instructions
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
