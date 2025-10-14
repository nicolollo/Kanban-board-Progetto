const btnNuovaIssue = document.getElementById("btn-nuova-issue");
const formContainer = document.getElementById("form-container");
const formIssue = document.getElementById("formIssue");
const btnAnnulla = document.getElementById("btn-annulla");

const colonne = ["Backlog", "In Progress", "Review", "Done"];

// Aggiungi pulsante "Svuota tutto"
const btnSvuota = document.createElement("button");
btnSvuota.textContent = "Svuota tutto";
btnSvuota.className = "bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold";
btnSvuota.addEventListener("click", () => {
  const totale = colonne.reduce((acc, col) => {
    const lista = document.querySelector(`[data-status="${col}"] .lista`);
    return acc + lista.children.length;
  }, 0);

  if (totale === 0) return; // nessuna card, non fare nulla

  const conferma = confirm("Vuoi davvero eliminare tutte le card?");
  if (conferma) {
    colonne.forEach(col => {
      const lista = document.querySelector(`[data-status="${col}"] .lista`);
      lista.innerHTML = "";
    });
    localStorage.removeItem("kanbanCards");
    aggiornaContatori();
  }
});
document.querySelector("header .flex").appendChild(btnSvuota);

// Carica card salvate
window.addEventListener("DOMContentLoaded", () => {
  const salvate = JSON.parse(localStorage.getItem("kanbanCards")) || [];
  salvate.forEach(data => {
    const card = creaCard(data.titolo, data.descrizione, data.persona, data.priorita, data.stato);
    document.querySelector(`[data-status="${data.stato}"] .lista`).appendChild(card);
  });
  aggiornaContatori();
});

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
  document.querySelector('[data-status="Backlog"] .lista').appendChild(card);

  salvaCards();
  aggiornaContatori();
  formIssue.reset();
  formContainer.classList.add("hidden");
});

// Crea card
function creaCard(titolo, descrizione, persona, priorita, stato) {
  const card = document.createElement("div");
  card.className = "card bg-gray-50 border rounded-lg shadow p-3";
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

  const btnIndietro = document.createElement("button");
  btnIndietro.textContent = "Indietro";
  btnIndietro.className = "mt-2 mr-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm";

  const btnElimina = document.createElement("button");
  btnElimina.textContent = "Elimina";
  btnElimina.className = "mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm";

  btnSposta.addEventListener("click", () => {
    spostaCard(card, +1);
    salvaCards();
    aggiornaContatori();
  });

  btnIndietro.addEventListener("click", () => {
    spostaCard(card, -1);
    salvaCards();
    aggiornaContatori();
  });

  btnElimina.addEventListener("click", () => {
    card.remove();
    salvaCards();
    aggiornaContatori();
  });

  card.appendChild(testo);
  card.appendChild(btnSposta);
  card.appendChild(btnIndietro);
  card.appendChild(btnElimina);

  return card;
}

// Sposta card avanti o indietro
function spostaCard(card, direzione) {
  const statoAttuale = card.dataset.status;
  const indice = colonne.indexOf(statoAttuale);
  const nuovoIndice = indice + direzione;

  if (nuovoIndice >= 0 && nuovoIndice < colonne.length) {
    const nuovoStato = colonne[nuovoIndice];
    card.dataset.status = nuovoStato;
    document.querySelector(`[data-status="${nuovoStato}"] .lista`).appendChild(card);
  } else {
    alert("La card non può essere spostata oltre.");
  }
}

// Aggiorna contatori accanto al bottone
function aggiornaContatori() {
  colonne.forEach(col => {
    const key = col.replace(" ", "");
    const count = document.querySelector(`[data-status="${col}"] .lista`).children.length;
    document.getElementById(`count-${key}`).textContent = count;
  });
}

// Salva tutte le card in localStorage
function salvaCards() {
  const tutte = [];
  colonne.forEach(col => {
    const cards = document.querySelectorAll(`[data-status="${col}"] .lista .card`);
    cards.forEach(card => {
      const testo = card.querySelector("div");
      const titolo = testo.querySelector("strong").textContent;
      const descrizione = testo.querySelector("em").textContent;
      const persona = testo.querySelector("span.text-sm").textContent;
      const priorita = testo.querySelector("span.text-xs").textContent.trim();
      tutte.push({ titolo, descrizione, persona, priorita, stato: col });
    });
  });
  localStorage.setItem("kanbanCards", JSON.stringify(tutte));
}