(function() {
  const rsvpButton = document.getElementById("rsvp");
  rsvpButton.addEventListener("click", (event) => {
    if (rsvpButton.classList.contains("disabled")) return;

    if (rsvpButton.textContent === "CONFIRMAR ASISTENCIA") {
      document.getElementById("rsvp-options").classList.remove("hidden");
      rsvpButton.textContent = "¡CONFIRMAR!";
    } else {
      rsvpButton.classList.add("disabled");
      rsvpButton.textContent = "...";
      setTimeout(() => {
        rsvpButton.textContent = "¡NOS VEMOS!";
      document.getElementById("rsvp-options").classList.add("hidden");
    }, 1000);
    }
  });
})();
