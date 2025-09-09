(function() {
  // Check URL for biblioteca and add class if found
  const onlyCocktail = window.location.href.toLowerCase().includes('biblioteca');
  if (onlyCocktail) {
    document.body.classList.add('only-cocktail');
  }
  
  // Query params names parser
  const searchParams = new URLSearchParams(window.location.search);
  const allNames = searchParams.get("i") ? searchParams.get("i").split(",").map((n) => n.trim()[0].toUpperCase() + n.trim().slice(1)) : [];
  const validNames = allNames.length > 0;
  if (validNames) {
    const names = allNames.slice(0, -1);
    const last = allNames[allNames.length - 1];
    const joinedNames = allNames.length > 1 ? `${names.join(", ")} y ${last},` : last;
    const rsvpName = document.getElementById("rsvp-name");
    rsvpName.innerHTML = joinedNames;
    const rsvpQuestion = document.getElementById("rsvp-question");
    const verb = allNames.length > 1 ? "Tienen" : "Tenes";
    rsvpQuestion.innerHTML = `¿${verb} alguna restricción alimentaria?`;
  }

  // RSVP handlers
  const rsvpOptions = document.getElementById("rsvp-options");
  const rsvpButton = document.getElementById("rsvp-open");
  rsvpButton.addEventListener("click", (event) => {
    if (!validNames) return;
    if (rsvpButton.classList.contains("disabled")) return;
    rsvpOptions.classList.remove("hidden");
    rsvpButton.style.display = "none";
    rsvpButton.parentElement.scrollIntoView({ behavior: "smooth" });
  });

  const rsvpConfirm = document.getElementById("rsvp-confirm");
  rsvpConfirm.addEventListener("click", (event) => {
    if (!validNames) return;
    const noneChecked = document.getElementById("rsvp-none").checked;
    const veggieChecked = document.getElementById("rsvp-veggie").checked;
    const veganoChecked = document.getElementById("rsvp-vegano").checked;
    const celiacChecked = document.getElementById("rsvp-celiac").checked;

    if (!noneChecked && !veggieChecked && !veganoChecked && !celiacChecked) {
      return alert("Por favor seleccioná una opción para confirmar tu asistencia");
    }
    const answer = noneChecked ? ["Ninguna"] : [];
    if (veggieChecked) answer.push("Vegetariana");
    if (veganoChecked) answer.push("Vegana");
    if (celiacChecked) answer.push("Celíaca");

    rsvpConfirm.classList.add("disabled");
    rsvpConfirm.textContent = "...";

    const formId = '1FAIpQLSewrtiL4_BS-cK69YoMQ1A_AIuWbNWT7Re5CPbH7uQJ01Ocmg';
    const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
    const body = new URLSearchParams();
    body.append('entry.1303125680', allNames.join(",")); // Nombres
    body.append('entry.2088391464', allNames.length); // PAX
    body.append('entry.1417187734', answer.join(",")); // Dieta
    body.append('entry.400129118', onlyCocktail ? "Biblioteca" : "FULL"); // Evento
    body.append('fvv', "1");
    body.append('submit', "Submit");
    const opts = {
      method: "POST",
      mode: "no-cors", // Required for Google Forms
      redirect: "follow",
      referrer: "no-referrer",
      body,
    };
    fetch(formUrl, opts).then((response) => {
      rsvpOptions.classList.add("hidden");
      rsvpButton.classList.add("disabled");
      rsvpButton.style.display = "block";
      rsvpButton.textContent = "¡NOS VEMOS!";
      rsvpButton.parentElement.scrollIntoView({ behavior: "smooth" });
    }).catch((error) => {
      rsvpConfirm.classList.remove("disabled");
      rsvpConfirm.textContent = "¡CONFIRMAR!";
      alert("Error al enviar la respuesta. Por favor intentá nuevamente.");
    });
  });

  // Present handlers
  const presentButton = document.getElementById("present");
  presentButton.addEventListener("click", (event) => {
    if (presentButton.style.height === 0) return;
    document.getElementById("present-options").classList.remove("hidden");
    presentButton.style.display = "none";
    presentButton.style.height = 0;
    presentButton.scrollIntoView({ behavior: "smooth" });
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
    copyToClipboard("pilarbozzotti");
  });
  document.getElementById("alias-usd").addEventListener("click", () => {
    copyToClipboard("pilarbozzotti.usd");
  });
})();
