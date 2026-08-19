# The Distance Desk — UI pagina per pagina

Complemento di [`PIANO.md`](PIANO.md). Misure per desktop 1440×900; mobile 390×844.

---

## Chrome

```
┌─ 1997 · 5125 · π ──────────────────────────────── CANON LOCK ● ── 41% ─┐
│ ⌕  Cerca celle, versi, decisioni                                       │
├──────────────┬────────────────────────────────────────────┬────────────┤
│ INBOX  (7)   │                                            │ CONTESTO   │
│ Scaffale     │              PAGINA                        │ 09 · 1984  │
│ Canone       │                                            │ Atto III   │
│ Stile        │                                            │ Hit. Non   │
│ Artwork      │                                            │ spoilerare │
│ Ricerca      │                                            │ 15.        │
│ Linter  (4)  │                                            │            │
│ Presentazione│                                            │ DIVIETI    │
│ Sessione     │                                            │ · Cassandra│
│ Impostazioni │                                            │ · π ovunque│
└──────────────┴────────────────────────────────────────────┴────────────┘
```

- Logo testo: `THE DISTANCE` in mono, `DESK` in muted.
- `CANON LOCK` click → `/canon`. Ambra se esiste una mozione aperta.
- Cerca: palette tipo command-K, risultati = celle e decisioni, non “file”.

Mobile: barra bassa `Inbox | Scaffale | Genera | Altro`. Contesto in foglio dal basso.

---

## Inbox

```
┌ Butta qui quello che hai — file, testo, voce, link Suno ─────────────┐
│                        [ Importa repo ]                               │
└───────────────────────────────────────────────────────────────────────┘
┌ LOOKING THROUGH THE STARS.mp3          classifying  ░░░░░░           │
├ scrap-hit.txt                          proposed                      │
│  → 09 Room Pt.2 · lyrics_en   0.81                                   │
│     alt: 09 concept 0.44                                             │
│     [ Incasella ] [ Archivio ] [ Non è questo album ]                │
├ nota-1993.md                           CONFLICT                      │
│  ⚠ locked year-prologue = 1997                                       │
│     [ Tieni 1997 ] [ Apri mozione ] [ Archivio ]                     │
└───────────────────────────────────────────────────────────────────────┘
```

Empty state copy: *Lo scaffale c’è già. Manca solo ciò che hai in tasca.*

---

## Scaffale

```
  1983 ──radio──► 5125 ──SOS──► 1984
    ▲                              │
    └──── ARK ── Landing ──────────┴── ► Distance Proof ★

  celle: meta conc lyrIT anal sunoL sunoS art audio link  ?
01 1997  ■    ■    ■     ■    □     □     ◐   □     ◐    ◐
02 5125  ■    ■    ■     ■    □     □     ◐   □     ■    ◐
…
09 1984  ■    ■    □     □    □     □     ◐   □     ■    □   ← CTA
15 1984  ■    ■    ◐     ■    □     □     ◐   □     ■    ■
```

- `■` approved  `◐` partial/draft  `□` empty  `✕` N/A  `*` generated  `⚠` conflict
- Hover cella: tooltip “First Ripples · Suno Style · approved”
- Click: `/tracks/{id}?cell=suno_style`
- Filtro chip: `Buchi` `Conflitti` `Atto III` `1984` `Generabili`

---

## Traccia (Room Pt.2, vuota)

Testata split: metà magenta 1984 / metà cyan “origine 5125”. Titolo grande, sottotitolo *The Anthem from Nowhere*.

Tab verticali a sinistra della card: Concetto · Testo · ITA · Analisi · Suno L · Suno S · Audio · Link · Domande.

Empty Testo:

> Questa è la hit. Code Within (10) deve poterla decodificare.  
> Non nominare π, 5125, “we are them”.  
> [ Genera prima bozza ] [ Incolla ciò che hai ]

Dock basso fisso: `Genera questa cella` · `Catena: EN→IT→analisi→Suno` · costo ~.

Dopo generate: due colonne **Bozza** | **Canone usato** (pack in chip). Pulsanti Approva / Rigenera (con nota) / Modifica.

---

## Canone

Tabella 9 righe locked. Colonna destra “Impatto se tocchi”.  
Bottone fantasma in fondo: `Apri mozione` — form: domanda, scelta nuova, perché. Preview impatti dal Steward **prima** del lock.

---

## Style Lab

Sinistra: textarea template (syntax highlight banale).  
Destra: tabella anti-monotonia editabile.  
Sotto: card varianti 05 / 13 / 12 (override rock).  
Toggle “π nel style: vietato / raro / solo 15”.

---

## Artwork

Griglia 4 colonne. Tile mancante = rettangolo tratteggiato con anno.  
Drop sulla tile = inbox pre-riempita.  
Menu tile: Brief AI · Genera immagine · Segna primaria (solo 07).  
Cassandra in una riga “Bonus — fuori playlist”.

---

## Ricerca

4 schede fisse a tab. Ogni scheda: fonti slotted (URL + note) + campo “Aggiungi fonte”.  
Niente search box universale che sembra ChatGPT.

---

## Linter

Lista tipo issue tracker. Severity color: block oro, warn muted, info cyan.  
Click: split file-A vs file-B (ReNew vs STORIA).  
Azioni: `Risolvi con scelta canone` / `Eccezione` / `Ignora fino all’export`.

---

## Genera

Kanban orizzontale: In coda · In corso · Da approvare · Fatto.  
Card job: icona ruolo, target `09.lyrics_en`, modello, tempo.  
“Prosegui il lavoro” in testata = Producer riempie In coda (max 3 senza conferma; oltre chiede).

---

## Sessione

Composer con chip contesto già attaccati (`pack:09`).  
Comandi `/` autocompletati.  
Messaggio utente “scrivimi la 16” → risposta Steward in card rossa *rifiuto*, nessun job.

---

## Presentazione

Thumb slide orizzontali. Slide con buco = cornice tratteggiata + label `TESTO MANCANTE`.  
Export: `PDF canon-clean` disabilitato se lint block; `PDF di lavoro` sempre ok.

---

## Impostazioni

Sezioni: Identità (solo lettura: The Distance) · Modelli per ruolo · Chiavi · Git · Pesatura completezza.  
Nessun campo “Nome progetto”.
