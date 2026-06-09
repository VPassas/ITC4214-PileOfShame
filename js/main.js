// hamburger menu
const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector("#mainNav");

navToggle.addEventListener("click", function () {
  // .toggle adds the class if missing, removes it if it is present
  // it returns true when the menu is open, false when it is closed
  const isOpen = navMenu.classList.toggle("show");

  // keep the accessibility state in sync for screen readers
  navToggle.setAttribute("aria-expanded", isOpen);
});
