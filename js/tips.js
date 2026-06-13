// the tips are injected into the page by this script. this is done to reduce duplicate html
// the random game picker and the Tip of the Day are also handled here


// tips of the day
const dailyTips = [
  "Beat one game before buying a new one — your wallet and backlog will thank you.",
  "Knock out short games first to build momentum.",
  "Set a 'one game at a time' rule so you actually finish things.",
  "Refund games you bounce off in the first hour.",
  "Schedule a weekly 'backlog night' for steady progress.",
  "Sort by priority so you always know what to play next.",
  "Don't buy a game just because it's on sale — that's how the pile grows."
];

// use today's date to pick one, so it's the same all day but changes daily
const dayNumber = new Date().getDate();              // day of month (1–31)
const tipIndex = dayNumber % dailyTips.length;       // keeps the index in range
document.querySelector("#tipOfDay").textContent = dailyTips[tipIndex];


// tips
const tips = [
  { title: "Start with shorter games", body: "Quick wins build momentum and shrink the pile fast." },
  { title: "Use a priority system",    body: "Mark games High/Medium/Low so you always know what to play next." },
  { title: "One game at a time",       body: "Finish your current game before starting another." }
];


const tipsAccordion = document.querySelector("#tipsAccordion");

// build the tips into an html string
let tipsHTML = "";
tips.forEach(function (tip, index) {
  // first tip is open and the rest are collapsed
  let buttonClass = "accordion-button";
  let collapseClass = "accordion-collapse collapse";
  if (index === 0) {
    collapseClass += " show";       // open the first one
  } else {
    buttonClass += " collapsed";    // close the others
  }

  tipsHTML += `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="${buttonClass}" type="button"
                data-bs-toggle="collapse" data-bs-target="#tip${index}">
          ${tip.title}
        </button>
      </h3>
      <div id="tip${index}" class="${collapseClass}" data-bs-parent="#tipsAccordion">
        <div class="accordion-body">${tip.body}</div>
      </div>
    </div>
  `;
});


// send the tips to the page
tipsAccordion.innerHTML = tipsHTML;


// random game picker
const pickButton = document.querySelector("#pickButton");
const pickResult = document.querySelector("#pickResult");

pickButton.addEventListener("click", function () {
  // read the saved games and keep only the unbeaten ones
  const games = JSON.parse(localStorage.getItem("games")) || [];
  const backlog = games.filter(function (game) {
    return game.status === "Backlog";
  });

  // nothing to pick from?
  if (backlog.length === 0) {
    pickResult.innerHTML = `<div class="alert alert-warning">Your backlog is empty — add some games first!</div>`;
    return;
  }

  // pick a random game from the backlog
  const randomIndex = Math.floor(Math.random() * backlog.length);
  const game = backlog[randomIndex];

  pickResult.innerHTML = `<div class="alert alert-success">🎮 Play <strong>${escapeHTML(game.title)}</strong> (${escapeHTML(game.platform)}) next!</div>`;
});
