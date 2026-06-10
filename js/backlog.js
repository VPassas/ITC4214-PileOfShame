// backlog.js - runs only on the Backlog page.

// load the saved games from localStorage, or start with an empty array.
let games = JSON.parse(localStorage.getItem("games")) || [];

// form and body are saved into variables
const gameForm = document.querySelector("#gameForm");
const tableBody = document.querySelector("#gamesTableBody");

// save the current games array into localStorage. It is turned into a string because it is the only acceptable format for localStorage.
function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

// every game in the array is represented as a row in the table.
function renderGames() {
  let rows = "";

  games.forEach(function (game) {
    rows += `
      <tr>
        <td>${game.title}</td>
        <td>${game.platform}</td>
        <td>${game.genre}</td>
        <td>${game.priority}</td>
        <td>${game.status}</td>
        <td>${game.dateAdded}</td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;
}

// when the form is submitted, add a new game.
gameForm.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();

  // build a new game object from the input values
  const newGame = {
    id: Date.now(),
    title: document.querySelector("#title").value,
    platform: document.querySelector("#platform").value,
    genre: document.querySelector("#genre").value,
    priority: document.querySelector("#priority").value,
    status: "Backlog",
    dateAdded: new Date().toLocaleDateString()
  };
  //.push() is a built in array method that adds an item to the end of the array
  games.push(newGame);
  saveGames();
  renderGames();
  // .reset() is a built in form method that clears all the inputs
  gameForm.reset();
});

// for first load, it shows the current backlog.
renderGames();
