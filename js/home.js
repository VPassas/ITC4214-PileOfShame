// home.js - runs only on the Home page. Fetches game deals and shows them.

const dealsContainer = document.querySelector("#dealsContainer");

// CheapShark deals: Steam store (storeID=1), limit to 6 results
const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=6";

fetch(url)
  .then(function (response) {
    // convert the reply into a JS array
    return response.json();
  })
  .then(function (deals) {
    // build one HTML string
    let cards = "";

    // deals is an array, so make a card for each game in it
    deals.forEach(function (deal) {
      cards += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${deal.thumb}" class="card-img-top" alt="${deal.title}">
            <div class="card-body">
              <h5 class="card-title">${deal.title}</h5>
              <p class="card-text">
                <span class="fw-bold">$${deal.salePrice}</span>
                <span class="text-muted text-decoration-line-through">$${deal.normalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      `;
    });
    // send the cards to the page
    dealsContainer.innerHTML = cards;
  })
  .catch(function (error) {
    // if the request fails show a message instead of crashing
    dealsContainer.innerHTML = "<p>Could not load deals right now.</p>";
    console.log(error);
  });


// progress chart that reads the games saved on the Backlog page
const savedGames = JSON.parse(localStorage.getItem("games")) || [];

const beatenCount = savedGames.filter(function (g) {
  return g.status === "Beaten";
}).length;
const backlogCount = savedGames.filter(function (g) {
  return g.status === "Backlog";
}).length;

const chartCanvas = document.querySelector("#statusChart");

new Chart(chartCanvas, {
  type: "bar",
  data: {
    labels: ["Backlog", "Beaten"],
    datasets: [{
      label: "Games",
      data: [backlogCount, beatenCount],
      backgroundColor: ["#dc3545", "#198754"]
    }]
  }
});

// latest activity
const activityList = document.querySelector("#activityList");

// take a copy, newest first (id is a timestamp) and keep only the last 5
const recent = savedGames.slice().sort(function (a, b) {
  return b.id - a.id;     // sorts the games by descending order
}).slice(0, 5); // first 5 items

// build the HTML list
let activityHTML = "";
recent.forEach(function (game) {
  activityHTML += `<li class="list-group-item">➕ Added <strong>${game.title}</strong></li>`;
});
// send the list to the page
activityList.innerHTML = activityHTML;
