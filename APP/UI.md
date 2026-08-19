# Incubatore — UI

Complemento di [`PIANO.md`](PIANO.md). Desktop 1440×900, mobile 390×844.

Niente chrome d’album (anni, π, 5125, “THE DISTANCE”) finché quel materiale non è slottato e tu non lo usi come identità.

---

## Chrome

Stato vuoto:

```
┌─ Incubatore · senza titolo · 0 pezzi ───────────────────────── 0% ─┐
│ ⌕                                                                  │
├──────────┬─────────────────────────────────────────┬───────────────┤
│ Inbox    │                                         │ Contesto      │
│ Scaffale │                                         │ Niente ancora │
│ Canone   │                                         │               │
│ Stile    │                                         │               │
│ Artwork  │                                         │               │
│ Ricerca  │                                         │               │
│ Linter   │                                         │               │
│ Genera   │                                         │               │
│ Sessione │                                         │               │
│ Present. │                                         │               │
│ Impostaz.│                                         │               │
└──────────┴─────────────────────────────────────────┴───────────────┘
```

Dopo l’ingest (esempio: hai accettato un titolo):

```
┌─ The Distance · 11 pezzi · 2 decisioni ─────────────── 28% ─┐
```

Il nome in testata è la cella `work.title` se approved, altrimenti `senza titolo`.  
Percentuale = celle esistenti, non “/15”.

Mobile: `Inbox | Scaffale | Genera | Altro`.

---

## First-run / Scaffale vuoto

Schermo intero, una colonna:

```
INCUBATORE

Non c’è un album.
Non ci sono tracce.
Non c’è un genere.

[ Inserisci materiale ]
[ Nuovo pezzo ]
```

Niente form titolo/genere/numero. Niente anteprima di 15 tile.

---

## Inbox

```
┌ Butta qui quello che hai ─────────────────────────────────────┐
└───────────────────────────────────────────────────────────────┘

scrap.txt                         proposed
  → Crea pezzo (senza nome) · lyrics     0.74
     [ Crea e incasella ] [ Solo testo di lavoro ] [ Scarta ]

playlist-bozza.md                 needs_human
  → Crea 8 pezzi dai heading             0.61
     [ Scegli quali… ] [ Tratta come note ]

room-pt2-idea.txt                 proposed
  → Pezzo già esistente “Room Pt.1”?     0.48
     alt: Crea pezzo “Room Pt.2”
     [ È un altro pezzo ] [ È lo stesso ] [ Non so ]
```

La CTA primaria, se non esiste un pezzo compatibile, è **Crea pezzo**, non “metti nello scaffale 09”.

---

## Scaffale (con materiale)

Lista, non griglia 15×N.

```
Lavoro: (senza titolo)                    [ + Pezzo ]  [ Inserisci ]

○  · untitled-1     concept □  lyrics ◐  audio □
○  · First Ripples  concept ■  lyrics ■  style ■  art □
○  · (wav)          audio ■   lyrics □
```

Drag per riordinare. L’ordine è `listen_order`, editabile, non sacro.  
Click riga → `/pieces/:id`.

---

## Pezzo

Testata: titolo o `Senza nome`. Campo labels a chip (le aggiungi tu o le accetti dal classifier): niente dropdown Anno/Atto precotto.

Tab celle del kit (vuote). Empty lyrics:

> Non c’è testo.  
> Se generi, l’AI userà solo ciò che hai già approvato in questa incubazione.  
> Oggi il pack è: *(elenco o “vuoto — chiederà o resterà minimale”)*.  
> [ Genera ] [ Incolla ]

`not_applicable` è un menu tuo (“strumentale”, “reverse di [pezzo]”, “solo sample”).

---

## Canone

Empty:

> Non ci sono decisioni.  
> Nascono quando confermi una frase del materiale (“il finale è X”)  
> o quando ne scrivi una qui.  
> [ Nuova decisione ]

Niente tabella da 9 pin The Distance.

---

## Stile / Artwork / Ricerca / Linter / Genera / Presentazione

Tutte partono vuote e **si popolano sui pezzi esistenti**.  
Artwork: 0 tile se 0 pezzi.  
Genera: se 0 celle target, bottone spento, copy: *Prima serve almeno un pezzo o una nota slottata.*  
Presentazione: disabilitata se 0 pezzi approved.  
Ricerca: `+ Tema` — zero schede Frantic Caller di default.

---

## Sessione

Composer. Se l’incubazione è vuota e chiedi “scrivimi l’album”, refuse:

> Non c’è materiale. Inserisci qualcosa o apri un pezzo.

`/struttura` lancia `propose_structure` (proposte in inbox), non crea 10 cassetti.

---

## Impostazioni

Chiavi API, modelli per ruolo, git.  
`Nuova incubazione` con conferma.  
Niente “Album: The Distance” in sola lettura.
