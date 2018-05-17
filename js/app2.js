
// ************ Udacity Memory Game Project JS ****************

// variable declarations
var timerWasStarted = false;//boolean switch used to ensure timer.start() only runs once per game session, until game is reset
var cardPair = [];// array storing 2 html objects, objects later added/removed of classes eg. addClass('match') or removeClass('show open')
//var cardPairAttr = [];
var cardPairSymbol = [];// array storing  max 2 strings, strings later compared for a match eg 'fa fa-leaf'
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
 * set up the event listener for a card. If a card is clicked,
 call a series of functions (playMatchPair is instantiated in
 i)once on load of this file, ii) on restart, when restartGame() is called
 */
function playMatchPair() {
    $('.card').on('click', function(evt) {
        //checkTimerStatus - and do either 3 things i)start ii)set event listener for reset or iii)do nothing.
        checkTimerStatus();

        // start the counter functionS: COULD THESE BE PLACED SOMEPLACE SO THAT THEY'RE NOT ALWAYS CALLLED ON CARD CLICK?
        //counterMaker();
        //pairMatchedCounter();
/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
*/
        reveal(evt);
/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*/
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
    timerWasStarted = false;//this boolean switch will re-enable timer.start() to be called by checkTimerStatus()
    cardPair = [];
    //cardPairAttr = [];
    cardPairSymbol = [];
    moveCounter = [];//reset our counter function closure created by counterMaker()
    counterMaker();

    // array = [];
    pairMatchedCounter();
    $('span.moves').html('0');// resets move 0 value
    $('ul.stars').html(threeStars);// resets to 3stars again
    playMatchPair();
}



function reveal(evt) {
    //console.log('reveal fx activated')
        $(evt.target).addClass('show open');
        $(evt.target).css("pointer-events", "none");// this code 'desensitizes' event listener from responding (fast second click) while card is "showing"/open
        //from: https://stackoverflow.com/questions/1263042/how-to-temporarily-disable-a-click-handler-in-jquery
}



function addToOpenLists(evt) {

    var clickedCard = $(evt.target);
    cardPair.push(clickedCard);
    //var clickedCardAttr = clickedCard.attr('class');
    //cardPairAttr.push(clickedCardAttr);

    var cardChild = $(evt.target).find('i');
    var childAttr = cardChild.attr('class');
    cardPairSymbol.push(childAttr);
}


/*
*  - if the list already has another card, check to see if the two cards match
*/
function checkPair() {
    if (cardPairSymbol.length === 2) {
/*
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*/
        if (cardPairSymbol[0] === cardPairSymbol[1]) {
            setTimeout(matchedPair, 100);
        }
/*
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/
        else {
            setTimeout(noMatchedPair, 700);
        }
        //two cards have just been evaluated, so increment counter
// *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
        moveCounter[0]();
    }
}



function matchedPair(card) {
    console.log('matchedPair instantiated')
    for (var i = 0; i<cardPair.length; i++) {
        $(cardPair[i]).addClass('match');
        $(cardPair[i]).off();
        //console.log(cardPair);
    }
    // trigger a matched-pair counter
    console.log('allMatchedPairsCounter called');
    allMatchedPairsCounter[0]();

    cardPair.splice(0, 2);
    cardPairSymbol.splice(0,2);

    console.log(cardPair + " should be empty");
}



function noMatchedPair() {
    for (var i = 0; i<cardPair.length; i++) {
        $(cardPair[i]).removeClass('show open');
        $(cardPair[i]).css("pointer-events", "auto");//this re-activates event listener 'sensitivity'
        //from: https://stackoverflow.com/questions/1263042/how-to-temporarily-disable-a-click-handler-in-jquery
        console.log(cardPair); //bug: sometimes it is three b/c user clicks 3 in a row VERY FAST
    }
    //bug fix: instead of cardPair.splice(0, 2), use (0, 3) - sometimes arrays have 3 items when user clicks 3 in a row VERY FAST
    cardPair.splice(0, 3); //empties array
    cardPairSymbol.splice(0,3); // emties array

    console.log(cardPair.length + ' ' + cardPairSymbol.length + ' values of cardPair and cardPairSymbol');
}


function gameOver() {
    //slide the overlay
    $('#game-over-overlay').addClass('show');

    //get the stars final count
    var starTally = $('ul.stars').html();
    $('h1#your-score').find('ul.final-score').html(starTally);

    //get the final num of moves
    var moveTally = $('span.moves').html()
    $('h1#your-moves').find('span.final-moves').html(moveTally);

    //get the final time
    var timeTally = $('div.clock').html()
    $('h1#your-time').find('span.final-time').html(timeTally);

    //event listener to play again on repeat icon
    $('.game-over-content > .fa-repeat').on('click', function() {
        restartGame();
        $('#game-over-overlay').removeClass('show');
    })
}

var moveCounter = [];// an array designed to contain one closure function that increments counter, generated by counterMaker() below:
function counterMaker() {
    var counter = 0;
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

var allMatchedPairsCounter = [];// an array designed to contain one closure function that increments with every matched pair
function pairMatchedCounter() {
    pairCounter = 0;
    allMatchedPairsCounter.push( function() {
        pairCounter++;
        console.log(pairCounter)
        if (pairCounter === 8) {
            //open game over overlay
            setTimeout(gameOver, 800);
        }
    })
}

// CALLING THESE FUNCTIONS TO INSTANTIATE AT THE VERY START/ON LOAD
generateFullDeck();
playMatchPair();

// CALLING THESE FUNCTIONS TO INSTATIATE AND INITIALIZE COUNTER CLOSURES
counterMaker();
pairMatchedCounter();

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
