// main.js - shared code that runs on every page

// escape user text so it cannot inject html/scripts. The text is placed into a div
// as plain text and then read back as html. it is used wherever we show user input.
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// The navbar
const headerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top bg-dark shadow-sm" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <img src="img/favicon.svg" alt="" width="24" height="24" class="me-2">Pile of Shame
      </a>

      <!-- hamburger button (we open and close it in main.js) -->
      <button class="navbar-toggler" type="button"
              aria-controls="mainNav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- navbar links -->
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="backlog.html">Backlog</a></li>
          <li class="nav-item"><a class="nav-link" href="tips.html">Gaming Tips</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- dark mode button -->
      <button class="btn btn-outline-light btn-sm" id="themeToggle" type="button">Dark mode</button>
    </div>
  </nav>
`;

// The footer
const footerHTML = `
  <div class="bg-dark text-light py-4 mt-5 border-top border-secondary">
    <div class="container">
      <div class="row">

        <div class="col-md-4">
          <h5>Pile of Shame</h5>
          <p>Track your game backlog and finally beat the pile.</p>
        </div>

        <div class="col-md-4">
          <h5>Contact</h5>
          <p>Email: info@pileofshame.com</p>
        </div>

        <div class="col-md-4">
          <h5>Follow Us</h5>
          <a href="https://facebook.com" class="text-light fs-4 me-3" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="https://x.com" class="text-light fs-4 me-3" aria-label="X"><i class="bi bi-twitter-x"></i></a>
          <a href="https://instagram.com" class="text-light fs-4 me-3" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://github.com/VPassas" class="text-light fs-4" aria-label="GitHub"><i class="bi bi-github"></i></a>
        </div>

      </div>
      <p class="text-center mb-0">&copy; 2026 Pile of Shame. All rights reserved.</p>
    </div>
  </div>
`;

// the next two lines inject the navbar and footer
document.querySelector("header").innerHTML = headerHTML;
document.querySelector("footer").innerHTML = footerHTML;


// get the current page we are on. The root "/" defaults to index.html.
const page = window.location.pathname.split("/").pop() || "index.html";

// iterates through links until it finds the page we are on. When it finds it, it highlights it with bootstrap
document.querySelectorAll(".nav-link").forEach(function (link) {
  if (link.getAttribute("href") === page) {
    link.classList.add("active");
  }
});

// hamburger button
const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector("#mainNav");

navToggle.addEventListener("click", function () {
  // .toggle adds the class if missing, removes it if it is present
  // it returns true when the menu is open, false when it is closed
  const isOpen = navMenu.classList.toggle("show");

  // the line below updates the aria-expanded attribute for accessibility
  navToggle.setAttribute("aria-expanded", isOpen);
});

// dark mode functionality
const htmlEl = document.querySelector("html");
const themeToggle = document.querySelector("#themeToggle");

// update the button to show what it will switch TO
function updateThemeButton(theme) {
  if (theme === "dark") {
    themeToggle.innerHTML = `<i class="bi bi-sun"></i> Light mode`;
  } else {
    themeToggle.innerHTML = `<i class="bi bi-moon-stars"></i> Dark mode`;
  }
}

// when the page loads apply the saved theme (default is light)
const savedTheme = localStorage.getItem("theme") || "light";
htmlEl.setAttribute("data-bs-theme", savedTheme);
updateThemeButton(savedTheme);

// when the button is clicked switch the theme and remember it
themeToggle.addEventListener("click", function () {
  const current = htmlEl.getAttribute("data-bs-theme");
  let next;
  if (current === "dark") {
    next = "light";
  } else {
    next = "dark";
  }
  htmlEl.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
  updateThemeButton(next);
});