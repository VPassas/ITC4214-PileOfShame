// the team members (data in one place to avoid repeating card HTML)
const team = [
  { name: "Vaggelis Passas",   role: "Founder & Developer", bio: "Built Pile of Shame to conquer his own backlog.", avatar: "img/avatar1.png" },
  { name: "Nikos Tsakos",      role: "UI Designer",         bio: "Makes the pile look good while you ignore it.",   avatar: "img/avatar2.png" },
  { name: "Pavlos Katsikadis", role: "QA Tester",           bio: "Plays everything so he never finishes anything.", avatar: "img/avatar3.png" }
];

const teamContainer = document.querySelector("#teamContainer");

// build team cards
let teamHTML = "";
team.forEach(function (member) {
  teamHTML += `
    <div class="col-md-4 mb-4">
      <div class="card h-100 text-center">
        <img src="${member.avatar}" class="card-img-top" alt="${member.name}">
        <div class="card-body">
          <h3 class="card-title h5">${member.name}</h3>
          <p class="text-muted">${member.role}</p>
          <p class="card-text">${member.bio}</p>
        </div>
      </div>
    </div>
  `;
});

// send cards to the page
teamContainer.innerHTML = teamHTML;
