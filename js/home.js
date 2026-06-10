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
    // build one big HTML string
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
