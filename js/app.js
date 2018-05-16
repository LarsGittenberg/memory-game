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
        //refactor so code allows only two items on list
        var clickedCard = $(evt.target);
        console.log('this is clickedCard val ' + clickedCard);
        cardPair.push(clickedCard);
        console.log('this is cardPair val ' + cardPair);
        var clickedCardAttr = clickedCard.attr('class');
        cardPairAttr.push(clickedCardAttr);


        var cardChild = $(evt.target).find('i');
        var childAttr = cardChild.attr('class');
        cardPairSymbol.push(childAttr);
        //console.log(cardPair + ' ' +cardPairSymbol);
}
/*
*  - if the list already has another card, check to see if the two cards match
*/

function checkPair() {
        console.log('checkPair called')
        //console.log(cardPairSymbol.length);
        if (cardPairSymbol.length === 2) {
                console.log(cardPair + ' ' + ' cardpair value');
                if (cardPairSymbol[0] === cardPairSymbol[1]) {
                console.log("match");
                //if so, add a class that locks card1 open
                cardPairSymbol = [];
                var cardPair = [];
                }
                else {
                    console.log("no match");
                    // if not, close the cards.
                    //var x = $(cardPair[0]);
                    //console.log(x);
                    cardPairSymbol = [];
                    var cardPair = [];
                }
        }
}

var cardPair = [];
var cardPairAttr = [];
var cardPairSymbol = [];

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
















