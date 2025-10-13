# Kanban-board-Progetto

Viene sviluppata un'applicazione destinata alla gestione di processo volta alla suddivisione di uno o più obiettivi in molteplici compiti di calibro inferiore, ognuno con caratteristiche proprie, quali nome, descrizione, priorità, scadenza e membro del team addetto al completamento dello stesso. È possibile creare nuovi obiettivi (issue) a piacere in base alle proprie necessità e spostarlitra quattro categorie in base allo stato di completamento di ciascuno: "Backlog", "In Progress", "Review" e "Done".

Requisiti funzionali: descrivono le funzioni e i servizi che il sistema deve offrire.
	Facile comprensione delle attività da svolgere.
	Facile comprensione delle priorità.
	Facile comprensione delle scadenze.
	Facile comprensione dei ruoli.
	Facile comprensione dello stato di avanzamento di un progetto.
	Facile comprensione delle funzionalità del sito.
	Facile utilizzo delle funzionalità del sito.

Requisiti non funzionali: specificano le caratteristiche di qualità (prestazioni, sicurezza, usabilità).
	Il sistema deve poter gestire almeno 100 issue contemporaneamente senza degrado percepibile delle prestazioni.
	Le operazioni di spostamento (drag & drop o pulsante “Sposta”) devono avvenire in meno di 1 secondo.
	Il caricamento iniziale della board non deve superare 3 secondi.
	L’interfaccia deve essere intuitiva e navigabile senza formazione preventiva.
	Tutti i pulsanti devono essere accessibili anche da tastiera.
	L’accesso alle issue deve essere protetto da autenticazione.
	Deve essere implementato un sistema di autorizzazione (solo l’assegnatario o un admin può eliminare issue).

Requisiti di dominio: derivano dal contesto applicativo o dalle normative di settore.
	Ogni issue deve contenere campi standard come titolo, descrizione, priorità, stato e assegnatario.
	Gli stati di una issue devono seguire il flusso Backlog → In Progress → Review → Done.
	Le priorità devono rispettare le convenzioni del team di sviluppo.
	Ogni issue può essere assegnata a uno e un solo sviluppatore.

Requisiti di vincolo: limiti tecnici, economici o organizzativi da rispettare.
	Il sistema deve essere compatibile con browser moderni (Chrome, Edge, Firefox, Safari).
	L’hosting deve utilizzare solo servizi gratuiti o open-source dove possibile (es. Vercel, Render, Railway).
	Il team di sviluppo è composto da 3 persone.
