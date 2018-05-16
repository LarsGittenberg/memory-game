// variable declarations
var timerWasStarted = false;
var cardPair = [];
var cardPairAttr = [];
var cardPairSymbol = [];
var threeStars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';


// easytimer.js code below from: http://albert-gonzalez.github.io/easytimer.js/
var timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {
    $('.clock').html(timer.getTimeValues().toString());
});

/*
 * Create a list that holds all of your cards
 */
var cardList = ["fa-diamond", "fa-diamond",
                "fa-paper-plane-o", "fa-paper-plane-o",
                "fa-anchor", "fa-anchor",
                "fa-bolt", "fa-bolt",
                "fa-cube", "fa-cube",
                "fa-leaf", "fa-leaf",
                "fa-bicycle", "fa-bicycle",
                "fa-bomb", "fa-bomb",];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
*/

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

/*
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function generateFullDeck() {
        var newCardList = shuffle(cardList);
    	$.each(newCardList, function(index, value){
    		$('.deck').append('<li class="card"><i class="fa ' +  value + ' "></i></li>');
    	})
}

/*
 * set up the event listener for a card. If a card is clicked, call playMatchPair:
 */
function playMatchPair() {
    $('.card').on('click', function(evt) {
        //checkTimerStatus - and do either 3 things i)start ii)set event listener for reset or iii)do nothing.
        checkTimerStatus();

        // start the counter function
        counterMaker();

        // *  - display the card's symbol (put this functionality in another function that you call from this one)
        reveal(evt);
        // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
        addToOpenLists(evt);
        checkPair();
    });
}

function checkTimerStatus() {
    if (!timerWasStarted) {
        //initAndStartTimer!
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
    timerWasStarted = false;//this will enable timer.start() to be called by checkTimerStatus();
    cardPair = [];
    cardPairAttr = [];
    cardPairSymbol = [];
    moveCounter = [];
    $('span.moves').html('0');// resets move 0 value
    $('ul.stars').html(threeStars);// resets to 3stars again
    playMatchPair();
}


function reveal(evt) {
    console.log('reveal fx activated')
        $(evt.target).addClass('show open');
}

function addToOpenLists(evt) {
    console.log('addToOpenLists called');
    var clickedCard = $(evt.target);
    cardPair.push(clickedCard);
    var clickedCardAttr = clickedCard.attr('class');
    cardPairAttr.push(clickedCardAttr);

    var cardChild = $(evt.target).find('i');
    var childAttr = cardChild.attr('class');
    cardPairSymbol.push(childAttr);
}

/*
*  - if the list already has another card, check to see if the two cards match
*/
function checkPair() {
    if (cardPairSymbol.length === 2) {

        if (cardPairSymbol[0] === cardPairSymbol[1]) {
            console.log("match");
            // if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
            setTimeout(matchedPair, 1000);
        }
        // if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
        else {
            console.log("no match");
            setTimeout(noMatchedPair, 1000);
        }
    //two cards have just been evaluated, so increment counter
// *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    moveCounter[0]();
// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

    }
}

function matchedPair(card) {
    $(cardPair[0]).addClass('match');
    $(cardPair[1]).addClass('match');
    $(cardPair[0]).off();
    $(cardPair[1]).off();

    for (var i=0; i<1; i++) {
        cardPair.splice(0, 2);
        cardPairSymbol.splice(0,2);
    }
}

function noMatchedPair() {
    $(cardPair[0]).removeClass('show open');
    $(cardPair[1]).removeClass('show open');
    for (var i=0; i<1; i++) {
        cardPair.splice(0, 2);
        cardPairSymbol.splice(0,2);
    }
}



var moveCounter = [];//an array designed to contain one closure function that increments counter
function counterMaker() {
    var counter = 0;
    moveCounter.push(function() {
        counter++;
        console.log('counter!')
        $('span.moves').html(counter);
        //remove a star depending on counter value
        var starScoreArray = $('ul.stars').find('i');
        if (counter === 13) {
            starScoreArray[0].className = "";
        }
        else if (counter === 21) {
            starScoreArray[1].className = "";
        }
    })
}

generateFullDeck();
playMatchPair();
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

