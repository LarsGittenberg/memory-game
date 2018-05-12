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
 * set up the event listener for a card. If a card is clicked:
 */
function playMatchPair() {
    $('.card').on('click', function(evt) {
        // *  - display the card's symbol (put this functionality in another function that you call from this one)
        reveal(evt);
        // *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
        addToOpenLists(evt);
        checkPair();
    });
}

function reveal(evt) {
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
                    //*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
                    setTimeout(matchedPair, 1000);
                }
// *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

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

var cardPair = [];
var cardPairAttr = [];
var cardPairSymbol = [];

/*
function addCounter() {
    counter++;
    console.log(counter);
    return counter;
}
*/

var moveCounter = [];//an array designed to contain one closure function that increments counter
function counterMaker() {
    var counter = 0;
    moveCounter.push(function() {
        counter++;
        $('span.moves').html(counter);
    })

}
counterMaker();

generateFullDeck();
playMatchPair();

$('.restart').on('click', function() {
    location.reload();
})


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



