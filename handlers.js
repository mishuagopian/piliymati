(function() {
  // Query params names parser
  const searchParams = new URLSearchParams(window.location.search);
  const allNames = searchParams.get("i") ? searchParams.get("i").split(",").map((n) => n.trim()[0].toUpperCase() + n.trim().slice(1)) : [];
  if (allNames.length > 0) {
    const names = allNames.slice(0, -1);
    const last = allNames[allNames.length - 1];
    const greetings = document.querySelector(".details .heading");
    greetings.textContent = allNames.length > 1 ? `${names.join(", ")} y ${last}` : last;
  }

  // RSVP handlers
  const rsvpButton = document.getElementById("rsvp");
  rsvpButton.addEventListener("click", (event) => {
    if (rsvpButton.classList.contains("disabled")) return;

    if (rsvpButton.textContent === "CONFIRMAR ASISTENCIA") {
      rsvpButton.parentElement.classList.add("expanded");
      document.getElementById("rsvp-options").classList.remove("hidden");
      rsvpButton.textContent = "¡CONFIRMAR!";
    } else {
      const noneChecked = document.getElementById("rsvp-none").checked;
      const veggieChecked = document.getElementById("rsvp-veggie").checked;
      const veganoChecked = document.getElementById("rsvp-vegano").checked;
      const celiacChecked = document.getElementById("rsvp-celiac").checked;

      if (!noneChecked && !veggieChecked && !veganoChecked && !celiacChecked) {
        return alert("Por favor seleccioná una opción para confirmar tu asistencia");
      }

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
    if (presentButton.style.height === 0) return;
    presentButton.parentElement.classList.add("expanded");
    document.getElementById("present-options").classList.remove("hidden");
    presentButton.style.display = "none";
    presentButton.style.height = 0;
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
