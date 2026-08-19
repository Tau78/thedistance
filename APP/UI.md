# Incubatore — UI

Desktop 1440×900, mobile 390×844. Banco, non identità di un album.

---

## Chrome

```
┌─ Incubatore · senza titolo · 0 pezzi · fase: raccolta ──── buchi 12 ─┐
│ ⌕  (celle, contatti, mail — non “file”)                              │
├──────────┬────────────────────────────────────────┬──────────────────┤
│ Inbox    │                                        │ ORA SERVE        │
│ Timeline │              PAGINA                    │ (librarian)      │
│ Caselle  │                                        │                  │
│ Pezzi    │                                        │ Buchi di fase    │
│ Singoli  │                                        │                  │
│ Identità │                                        │                  │
│ Social   │                                        │                  │
│ Stampa   │                                        │                  │
│ Genera   │                                        │                  │
│ Sessione │                                        │                  │
│ Cartella │                                        │                  │
│ Impostaz.│                                        │                  │
└──────────┴────────────────────────────────────────┴──────────────────┘
```

Mobile: `Inbox | Timeline | Buchi | Altro`.  
`ORA SERVE` è un foglio dal basso, cambia con la pagina.

---

## First-run

```
INCUBATORE

Non c’è un album. Non c’è un lancio.
C’è un casellario vuoto e una linea senza date.

[ Inserisci quello che hai ]
[ Guarda i buchi del percorso ]
```

---

## Timeline (`/`)

```
RACCOLTA ── CREAZIONE ── PRODOTTO ── IDENTITÀ ── SOCIAL ── STAMPA ── LANCIO ── RICONTACTI
   ●           ●            ○           ○          ○         ○         ○          ○
  4 item      2 pezzi     singoli?     bio?      0 storie   0 mail    data?     —

Prossimo:
  · Quali sono i singoli?
  · Hai i contenuti social?  (storie / post / foto: —)
  · Chi vuoi contattare?

[ Proponi una linea a ritroso ]   (chiede una data di lancio; se manca, la chiede)
```

Click fase → lista buchi + oggetti già slottati in quella famiglia.  
Niente Gantt finto con 40 post inventati.

---

## Inbox

Come prima, più target:

```
mario-rumore.txt              proposed
  → Crea contatto · stampa           0.88
     [ Crea ] [ È una mail ] [ Scarta ]

6-storie-primo-singolo.md     proposed
  → Piano social · 6 storie          0.80
     [ Crea 6 slot storia ] [ Solo nota ]
```

---

## Casellario (`/cabinet`)

Tab: Pezzi · Asset · Singoli · Identità · Social · Stampa · Decisioni.  
Ognuna: lista o empty *“Nessun contatto. Inserisci o importa un foglio.”*

---

## Pezzo

Invariato nel kit creativo (lyrics, audio, art…).  
In testata chip: `è un singolo?` se la fase prodotto è aperta.

---

## Singoli

Empty: *“Non hai scelto singoli. Il produttore può proporre solo dai pezzi che esistono.”*  
Con pezzi: card per pezzo, toggle singolo, wave 1/2/…, data.

---

## Identità

Campi: nome lavoro, artista, bio, one-liner, cover, foto stampa, logo, EPK.  
Tutti vuoti. Generate bio = pack dai pezzi approved, o refuse.

---

## Social

Alto: **numeri che hai deciso** (o “non decisi”).

```
Per drop “—” :  storie [  ]  post [  ]  foto [  ]
```

Sotto: slot nati da quei numeri, stato empty/draft/scheduled.  
Librarian a destra: cover e pezzo singolo, se ci sono.

---

## Stampa

Due colonne: **Rubrica** | **Mail**.

Rubrica: nome, testata, mail, tag.  
Mail: thread per contatto — bozza, inviata, waiting, da ricontattare (badge).  
Composer pitch: a destra bio/cover/singoli; se mancano, link al buco, non testo inventato.

---

## Sessione

Comandi: `/buchi` `/singoli` `/pitch` `/social` `/ricontatti` `/timeline`.  
“Inventami 20 blog da scrivere” → refuse: *inserisci chi vuoi contattare*.

---

## Cartella stampa (`/present`)

EPK da celle approved. Se buchi block (no bio, no cover), export “di lavoro” con watermark.

---

## Impostazioni

Chiavi, modelli, `Nuova incubazione`.  
Promemoria ricontatti (locale / mail a te), non invio automatico alle redazioni.
