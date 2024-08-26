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
      rsvpButton.parentElement.classList.add("expanded");
      document.getElementById("rsvp-options").classList.remove("hidden");
      rsvpButton.textContent = "¡CONFIRMAR!";
    } else {
      rsvpButton.classList.add("disabled");
      rsvpButton.textContent = "...";
      setTimeout(() => {
        rsvpButton.textContent = "¡NOS VEMOS!";
        rsvpButton.parentElement.classList.remove("expanded");
      document.getElementById("rsvp-options").classList.add("hidden");
    }, 1000);
    }
  });

  // Present handlers
  const presentButton = document.getElementById("present");
  presentButton.addEventListener("click", (event) => {
    if (presentButton.textContent === "HACER REGALO") {
      presentButton.parentElement.classList.add("expanded");
      document.getElementById("present-options").classList.remove("hidden");
      presentButton.style.display = "none";
      presentButton.style.height = 0;
    }
  });


  // Alias handlers
  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Copiaste los datos de cuenta a tu portapapeles");
  };
  document.getElementById("alias-ars").addEventListener("click", () => {
    copyToClipboard("MISHU.GALICIA");
  });
  document.getElementById("alias-usd").addEventListener("click", () => {
    copyToClipboard("MISHU.GALICIA.D");
  });
})();
