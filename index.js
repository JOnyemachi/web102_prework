/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div')

        // add the class game-card to the list
        gameCard.classList.add("game-card");
        //gameCard.className = 'game-card';
        // set the inner HTML using a template literal to display some info 
        // about each game
        //format: gameCard.innerHTML = (`${}`)
        const gameInfo = `
        <img class=“game-img” img src="${game.img}" alt="${game.name} Image" width="300" height="150">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged}</p>
        <p>Backers: ${game.backers}</p>`;

        gameCard.innerHTML = gameInfo
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")



        // append the game to the games-container
        //games-container.appendChild(gameCard)
        document.getElementById('games-container').appendChild(gameCard);
    }
    

}

// call the function we just defined using the correct variable
//addGamesToPage(GAMES_JSON);
console.log(addGamesToPage(GAMES_JSON))
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const backers = GAMES_JSON.reduce((acc, property) => { return acc + property.backers },0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
document.getElementById('num-contributions').innerHTML = (backers).toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raised = GAMES_JSON.reduce((acc, property) => { return acc + property.pledged },0);

const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${(raised).toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const numGames = GAMES_JSON.length;
const card = document.getElementById("num-games");
card.innerHTML = (numGames).toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // grab unfunded button element
    // use filter() to get a list of games that have not yet met their goal
    // i.e: amount raised (pledged) < goal amount.

        /* EXAMPLE:
            let listOfIncreasedSongs = songs.filter ( (song) => {
            return song.playsIn2022 > song.playsIn2021;
            });
        */
                
    let isUnfunded = GAMES_JSON.filter ( (property) => {
        return property.pledged < property.goal;
        });
    
    // use the function we previously created to add the unfunded games to the DOM
    console.log(addGamesToPage(isUnfunded))


}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let isFunded = GAMES_JSON.filter ( (property) => {
        return property.pledged > property.goal;
        });

    // use the function we previously created to add unfunded games to the DOM
    console.log(addGamesToPage(isFunded))

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    const allGames = GAMES_JSON.reduce((acc, property) => { return acc + property.pledged },0);
    console.log(addGamesToPage(GAMES_JSON))

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click",filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click",filterFundedOnly);
document.getElementById("all-btn").addEventListener("click",showAllGames);




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {return game.pledged < game.goal});
const unfundedCount = unfundedGames.length;

const fundedGames = GAMES_JSON.filter((game) => {return game.pledged >= game.goal});
const fundedCount = fundedGames.length;

const amountPledged = fundedGames.reduce((acc,value) => {return acc + game.pledged}, 0);
// create a string that explains the number of unfunded games using the ternary operator
let str = `A total of $${(amountPledged).toLocaleString('en-US')} has been raised for ${fundedCount} games. 
            Currently, ${unfundedCount}games remain to be funded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const x = document.createElement('div');
x.innerHTML = str
//document.getElementById('description-container').appendChild(descriptionContainer);
document.getElementById('description-container').appendChild(x);






/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const f = document.createElement('p');
f.innerHTML = first.name;
document.getElementById('first-game').appendChild(f);
// do the same for the runner up item
const s = document.createElement('p');
s.innerHTML = second.name;
document.getElementById('second-game').appendChild(s);