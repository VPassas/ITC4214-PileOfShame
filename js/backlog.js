// backlog.js - runs only on the Backlog page.

// load the saved games from localStorage or start with an empty array.
let games = JSON.parse(localStorage.getItem("games")) || [];

let editingId = null;


// form and body are saved into variables
const gameForm = document.querySelector("#gameForm");
const tableBody = document.querySelector("#gamesTableBody");

// save the current games array into localStorage. It is turned into a string because it is the only acceptable format for localStorage.
function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

// when edit is clicked, the features of the game are put back into the form
function editGame(id) {
  // iterate through games until the one we aare looking for is found
  const game = games.find(function (g) {
    return g.id === id;
  });
  // put the game's values back into the form
  document.querySelector("#title").value = game.title;
  document.querySelector("#platform").value = game.platform;
  document.querySelector("#genre").value = game.genre;
  document.querySelector("#priority").value = game.priority;

  editingId = id;
}

//this function counts the number of games in each field and updates the summary
function renderSummary() {
  const total = games.length;
  const beaten = games.filter(function (g) {
    return g.status === "Beaten";
  }).length;
  const backlog = total - beaten;

  document.querySelector("#totalCount").textContent = total;
  document.querySelector("#backlogCount").textContent = backlog;
  document.querySelector("#beatenCount").textContent = beaten;
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
        <td>
            <button class="btn btn-success btn-sm beaten-btn" data-id="${game.id}">Beat</button>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${game.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${game.id}">Delete</button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;
  renderSummary();
}

// click anywhere inside the table
tableBody.addEventListener("click", function (event) {
  // event.target is the exact element clicked (the button)
  const id = Number(event.target.getAttribute("data-id"));

  if (event.target.classList.contains("delete-btn")) {
    deleteGame(id);
  }

  if (event.target.classList.contains("beaten-btn")) {
    markBeaten(id);
  }

  if (event.target.classList.contains("edit-btn")) {
    editGame(id);
  }
});

function deleteGame(id) {
  games = games.filter(function (game) {
    return game.id !== id;   // keep every game except the one clicked
  });
  saveGames();
  renderGames();
}

function markBeaten(id) {
  // iterate through games until the one we aare looking for is found
  const game = games.find(function (g) {
    return g.id === id;
  });
  game.status = "Beaten";
  saveGames();
  renderGames();
}

// when the form is submitted, add a new game.
gameForm.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();

  // read the current input values once
  const title = document.querySelector("#title").value;
  const platform = document.querySelector("#platform").value;
  const genre = document.querySelector("#genre").value;
  const priority = document.querySelector("#priority").value;

  if (editingId === null) {
    // add a new game
    games.push({ //.push() is a built in array method that appends an element
      id: Date.now(),
      title: title,
      platform: platform,
      genre: genre,
      priority: priority,
      status: "Backlog",
      dateAdded: new Date().toLocaleDateString()
    });
  } else {
    // update the game we are editing
    const game = games.find(function (g) {
      return g.id === editingId;
    });
    game.title = title;
    game.platform = platform;
    game.genre = genre;
    game.priority = priority;
    editingId = null;   // revert to null to prepare it for the next possible edit
  }

  saveGames();
  renderGames();
  // .reset() is a built in form method that clears all the inputs
  gameForm.reset();
});

// for first load, it shows the current backlog.
renderGames();

