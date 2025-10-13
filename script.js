const btnNuovaIssue = document.getElementById("btn-nuova-issue");
const formContainer = document.getElementById("form-container");
const formIssue = document.getElementById("formIssue");
const btnAnnulla = document.getElementById("btn-annulla");

const colonne = ["Backlog", "In Progress", "Review", "Done"];

// Apri form
btnNuovaIssue.addEventListener("click", () => {
  formContainer.classList.remove("hidden");
});

// Chiudi form con Annulla
btnAnnulla.addEventListener("click", () => {
  formContainer.classList.add("hidden");
});

// Aggiungi issue
formIssue.addEventListener("submit", (e) => {
  e.preventDefault();
  const titolo = document.getElementById("titolo").value.trim();
  const descrizione = document.getElementById("descrizione").value.trim();
  const persona = document.getElementById("persona").value.trim();
  const priorita = document.getElementById("priorita").value;

  if (!titolo || !descrizione || !persona || !priorita) return;

  const card = creaCard(titolo, descrizione, persona, priorita, "Backlog");

  // Inserisco in Backlog
  document.querySelector('[data-status="Backlog"] .lista').appendChild(card);

  formIssue.reset();
  formContainer.classList.add("hidden"); // chiude il form dopo Aggiungi
});

// Funzione per creare una card
function creaCard(titolo, descrizione, persona, priorita, stato) {
  const card = document.createElement("div");
  card.className = "bg-gray-50 border rounded-lg shadow p-3";
  card.dataset.status = stato;

  const testo = document.createElement("div");
  testo.innerHTML = `
    <strong class="block text-lg font-semibold">${titolo}</strong>
    <em class="block text-gray-600">${descrizione}</em>
    <span class="block text-sm text-gray-700">${persona}</span>
    <span class="inline-block mt-1 px-2 py-1 text-xs font-bold rounded 
      ${priorita === "Critica" ? "bg-purple-200 text-purple-800" :
        priorita === "Alta" ? "bg-red-200 text-red-800" : 
        priorita === "Media" ? "bg-yellow-200 text-yellow-800" : 
        "bg-green-200 text-green-800"}">
      ${priorita}
    </span>
  `;

  const btnSposta = document.createElement("button");
  btnSposta.textContent = "Sposta";
  btnSposta.className = "mt-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm";

  const btnElimina = document.createElement("button");
  btnElimina.textContent = "Elimina";
  btnElimina.className = "mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm";

  btnSposta.addEventListener("click", () => {
    spostaCard(card);
  });

  btnElimina.addEventListener("click", () => {
    card.remove();
  });

  card.appendChild(testo);
  card.appendChild(btnSposta);
  card.appendChild(btnElimina);

  return card;
}

// Funzione per spostare la card alla colonna successiva
function spostaCard(card) {
  const statoAttuale = card.dataset.status;
  const indice = colonne.indexOf(statoAttuale);

  if (indice < colonne.length - 1) {
    const nuovoStato = colonne[indice + 1];
    card.dataset.status = nuovoStato;
    document.querySelector(`[data-status="${nuovoStato}"] .lista`).appendChild(card);
  } else {
    alert("La card è già in Done!");
  }
}