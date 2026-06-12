// the team members. this is done to reduce duplicate html segments
const team = [
  { name: "Vaggelis Passas", role: "Founder & Developer", bio: "Built Pile of Shame to conquer his own backlog." },
  { name: "Nikos Tsakos",     role: "UI Designer",         bio: "Makes the pile look good while you ignore it." },
  { name: "Pavlos Katsikadis",     role: "QA Tester",           bio: "Plays everything so he never finishes anything." }
];

const teamContainer = document.querySelector("#teamContainer");

// build team cards
let teamHTML = "";
team.forEach(function (member) {
  teamHTML += `
    <div class="col-md-4 mb-4">
      <div class="card h-100 text-center">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200"
             class="card-img-top" alt="${member.name}">
        <div class="card-body">
          <h5 class="card-title">${member.name}</h5>
          <p class="text-muted">${member.role}</p>
          <p class="card-text">${member.bio}</p>
        </div>
      </div>
    </div>
  `;
});

//send cards to the page
teamContainer.innerHTML = teamHTML;
