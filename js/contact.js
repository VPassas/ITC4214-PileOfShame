// contact.js - handles the contact form submit


const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the form from reloading the page

  // capture the submitted values (trimmed)
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const subject = document.querySelector("#subject").value.trim();
  const message = document.querySelector("#message").value.trim();

  // block whitespace-only entries that sneak past "required"
  if (name === "" || subject === "" || message === "") {
    alert("Please fill in all the fields.");
    return;
  }

  // put a confirmation message into the modal body
  // (escapeHTML stops user input from injecting HTML)
  const confirmBody = document.querySelector("#confirmBody");
  confirmBody.innerHTML = `
    <p>Thanks <strong>${escapeHTML(name)}</strong>, we got your message!</p>
    <p><strong>Subject:</strong> ${escapeHTML(subject)}</p>
    <p>We'll reply to <strong>${escapeHTML(email)}</strong> soon.</p>
  `;

  // create and show the Bootstrap modal
  const confirmModal = new bootstrap.Modal(document.querySelector("#confirmModal"));
  confirmModal.show();
  // clear the form
  contactForm.reset(); 
});
