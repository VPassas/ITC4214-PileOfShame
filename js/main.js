// main.js - shared code that runs on every page

// The navbar.
const headerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">Pile of Shame</a>

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
    </div>
  </nav>
`;

// The footer.
const footerHTML = `
  <div class="bg-dark text-light py-4 mt-5">
    <div class="container">
      <div class="row">

        <div class="col-md-4">
          <h5>Pile of Shame</h5>
          <p>Track your game backlog and finally beat the pile.</p>
        </div>

        <div class="col-md-4">
          <h5>Contact</h5>
          <p>Email: info@pileofshame.com</p>
          <!-- TODO: add social media links here -->
        </div>

        <div class="col-md-4">
          <!-- TODO: maybe add some quick links to the pages -->
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
