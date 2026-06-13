// backlog.js - runs only on the Backlog page.

// load the saved games from localStorage or start with an empty array.
let games = JSON.parse(localStorage.getItem("games")) || [];

let editingId = null;


let currentFilter = "all";
let currentSort = "none";

// form and body are saved into variables
const gameForm = document.querySelector("#gameForm");
const tableBody = document.querySelector("#gamesTableBody");

// returns a colored badge for a priority level
function priorityBadge(priority) {
  if (priority === "High") {
    return `<span class="badge bg-danger">High</span>`;
  }
  if (priority === "Medium") {
    return `<span class="badge bg-warning text-dark">Medium</span>`;
  }
  return `<span class="badge bg-success">Low</span>`;   // anything else = Low
}

// returns a colored badge for a status
function statusBadge(status) {
  if (status === "Beaten") {
    return `<span class="badge bg-success">Beaten</span>`;
  }
  return `<span class="badge bg-secondary">Backlog</span>`;
}


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

  // we are editing now, so make the button say "Update Game"
  document.querySelector("#submitBtn").textContent = "Update Game";
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

// filter buttons to update the current filter and then call render
document.querySelectorAll(".filter-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.getAttribute("data-filter");
    // highlight the active filter button
    document.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");
    renderGames();
  });
});

// sort buttons to update the current sort and then render
document.querySelectorAll(".sort-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    currentSort = button.getAttribute("data-sort");
    // highlight the active sort button
    document.querySelectorAll(".sort-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");
    renderGames();
  });
});

// every game in the array is represented as a row in the table.
function renderGames() {
  let rows = "";

  // start from all games and narrow down if there is a filter
  let visibleGames = games;
  if (currentFilter === "Backlog") {
    visibleGames = games.filter(function (g) { return g.status === "Backlog"; });
  } else if (currentFilter === "Beaten") {
    visibleGames = games.filter(function (g) { return g.status === "Beaten"; });
  }

  // sort by title or date. slice() copies the array so the original order does not change
  if (currentSort === "title") {
    visibleGames = visibleGames.slice().sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (currentSort === "date") {
    visibleGames = visibleGames.slice().sort(function (a, b) {
      return a.id - b.id;
    });
  }

  // table build
  visibleGames.forEach(function (game) {
    rows += `
      <tr>
        <td>${escapeHTML(game.title)}</td>
        <td class="d-none d-md-table-cell">${escapeHTML(game.platform)}</td>
        <td class="d-none d-md-table-cell">${escapeHTML(game.genre)}</td>
        <td>${priorityBadge(game.priority)}</td>
        <td>${statusBadge(game.status)}</td>
        <td class="d-none d-md-table-cell">${game.dateAdded}</td>
        <td>
            <button class="btn btn-success btn-sm beaten-btn" data-id="${game.id}">Beat</button> <!--these are the action buttons for each game -->
            <button class="btn btn-warning btn-sm edit-btn" data-id="${game.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${game.id}">Delete</button>
        </td>
      </tr>
    `;
  });

  // empty states: show a friendly message instead of a blank table
  if (visibleGames.length === 0) {
    if (games.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Your backlog is empty — add a game above!</td></tr>`;
    } else {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No games match the current filter.</td></tr>`;
    }
  } else {
    tableBody.innerHTML = rows;
  }
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
  // ask before deleting so a misclick does not delete a game
  if (!confirm("Delete this game?")) {
    return;
  }
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

  // read the current input values once. Trim removes leading/trailing spaces
  const title = document.querySelector("#title").value.trim();
  const platform = document.querySelector("#platform").value;
  const genre = document.querySelector("#genre").value.trim();
  const priority = document.querySelector("#priority").value;

  // block whitespace titles
  if (title === "") {
    alert("Please enter a game title.");
    return;
  }

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
  // the button says "Add Game" again
  document.querySelector("#submitBtn").textContent = "Add Game";
});

// for first load, it shows the current backlog.
renderGames();

