# Matching Card Memory Game Project

- Project: constructing a web-browser based card-matching game via HTML5/CSS3 and JS.
- This project is a student submission for [Udacity's Front End Web Development Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).
- It has been cloned from GitHub [here](https://github.com/udacity/fend-project-memory-game).
- You can view Udacity's rubric/instructions for students in the [Udacity Classroom](https://classroom.udacity.com/me).


## Table of Contents

- [Dependencies](#dependencies)
- [Instructions](#instructions)
- [Game Behavior](#game behavior)


## Dependencies
The project uses several CDNs and dependencies - you will need to have internet access and a browser for the game to work:
- [Font Awesome's Icon Library](https://fontawesome.com/v4.7.0/get-started/)
- [jQuery's CDN Library](https://code.jquery.com/jquery/)
- [Easytimer.js Library by Albert Gonzales](https://github.com/albert-gonzalez/easytimer.js/)


## Instructions

Feel free to clone/download from here/Github.
For basic functionality, the following files are needed:
- index.html
- app2.js
- easytimer.min.js ()
- app.css
- jpg file from the img folder

If you change the folder structure, you will need to change the file path src/href calls.


## Game Behavior
- There are 8 pairs of face down cards, arranged in a 4x4 grid
- Goal is to match the pairs together
- Card is selected with a user click, where the card flips to face up
- Only two cards are viewable at any given time during selection
- Pairs are matched when pairs are consecutively chosen
- If pairs clicked are not a match, cards revert to face down orientation
- During game play, a timer is activated, displayed top right
- During game play, the number of moves is registered, displayed top left
-- a move is defined as every 2 cards being chosen for a pair-match
- At the start of the game, player has 3 stars, when 12 moves are accrued, 1 star is subtracted, and after 22 moves, another star is subtracted
- When all 16 cards have been matched, the game concludes with a 'Game Over!' overlay, with a report on
-- how many stars the player has remaining (more stars mean fewer moves)
-- the total number of moves
-- the time taken to complete the game
-- a replay button is provided to restart the game





