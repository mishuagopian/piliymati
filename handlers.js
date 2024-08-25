(function() {
  // Query params names parser
  const searchParams = new URLSearchParams(window.location.search);
  const allNames = searchParams.get("i").split(",").map((n) => n[0].toUpperCase() + n.slice(1));
  const names = allNames.slice(0, -1);
  const last = allNames[allNames.length - 1];
  const greetings = document.querySelector(".details .heading");
  greetings.textContent = `${names.join(", ")} y ${last}`;

  // RSVP handlers
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
