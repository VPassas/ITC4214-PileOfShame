// contact.js - handles the contact form submit


const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the form from reloading the page

  // capture the submitted values
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;

  // put a confirmation message with the details into the modal body
  const confirmBody = document.querySelector("#confirmBody");
  confirmBody.innerHTML = `
    <p>Thanks <strong>${name}</strong>, we got your message!</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p>We'll reply to <strong>${email}</strong> soon.</p>
  `;

  // create and show the Bootstrap modal
  const confirmModal = new bootstrap.Modal(document.querySelector("#confirmModal"));
  confirmModal.show();
  // clear the form
  contactForm.reset(); 
});
