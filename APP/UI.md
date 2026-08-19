# Incubatore — UI

Desktop 1440×900, mobile 390×844. Banco scuro, tabelle dense.  
Mix per schermata: [`FONTI.md`](FONTI.md). Non copiamo un look unico.

Mobile: `Oggi | Inbox | Piano | Altro`.

---

## Chrome

```
┌─ Incubatore · senza titolo · 0 pezzi · fase: raccolta ──── buchi 12 ─┐
│ ⌕  (celle, contatti, mail — non “file”)                              │
├──────────┬────────────────────────────────────────┬──────────────────┤
│ Oggi     │                                        │ ORA SERVE        │
│ Inbox    │                                        │ (librarian)      │
│ Timeline │              PAGINA                    │                  │
│ Calendario│                                       │                  │
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

## Oggi (`/` se c’è materiale o una data) — pattern ReleaseLoop

```
Prossimo drop  —  /  tra — giorni
Urgenti oggi   2            Buchi aperti  6
  · −42 Distributore  blocked  manca cover
  · Ricontatto blog X

[ T  nuovo task ]
```

Senza data e senza pezzi: first-run incubatore, non questa dashboard.

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

[ Imposta data di uscita ]     [ Formato: single / EP / album / non so ]
```

Con data, la stessa pagina diventa **countdown** (Orphiq/Harment):

```
Drop: ven 15 mag  ·  tra 41 giorni  ·  singolo “—”

OGGI                      MANCA
−42  Distributore         cover, credits     [ apri caselle ]
−28  Spotify for Artists  one-liner
−14  Mail stampa          0 contatti
−10  Teaser social        numeri non decisi
  0  Uscita
 +7  Ricontatti

Data spostata?  ricalcolo automatico degli offset.
```

Task `blocked_missing` = riga ambra, non spuntabile. Click → librarian.  
Click fase senza data → solo buchi di metodo, come prima.

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

Tab: **Brani** · Asset · Singoli · Identità · Social · Stampa · Decisioni.

### Brani — tabella (Notion/Airtable)

```
        Titolo           Stato        Mancanti              Testo  Accordi  Audio
        ──────────────   ──────────   ───────────────────   ─────  ───────  ─────
        (senza nome)     Idea         —                     ◐      □        □
        First Ripples    Demo         voci ritornello       ■      ■        ◐
        —                Mix          accredito produttore  ■      □        ■

Vista: Tabella | Kanban (Idea / Scrittura / Demo / Mix / Master)
```

0 righe: header colonne + *Nessun brano. L’incasellamento c’è, le tracce no.*

Click riga → scheda pezzo.

---

## Pezzo (scheda)

Testata: titolo, select **Idea / Scrittura / Demo / Mix / Master**.  
Blocco **Elementi mancanti**: chip + “+ manca…” (voci coro, credito, altro).  
Sezioni: Testo · Accordi · Audio (lista allegati: demo.wav, mix.wav) · resto del kit.  
Chip `è un singolo?` se la fase prodotto è aperta.

---

## Singoli

Empty: *“Non hai scelto singoli. Il produttore può proporre solo dai pezzi che esistono.”*  
Con pezzi: card per pezzo, toggle singolo, wave 1/2/…, data.

---

## Identità

Campi: nome lavoro, artista, bio, one-liner, cover, foto stampa, logo, EPK.  
Tutti vuoti. Generate bio = pack dai pezzi approved, o refuse.

---

## Social / Content Matrix (`/social`)

Alto, conteggio dinamico:

```
Singoli  1 / 4 pezzi
Contenuti  2 / 10 caselle   ← somma planned vs done
```

Blocco singoli: tabella pezzi, toggle, onda, data.

Blocco piano (spuntabile):

```
☐☐☐  Reel di backstage          0/3   BUCO
☐☐☐☐☐  Storie di annuncio       0/5   BUCO
☐  Photoshoot ufficiale         0/1   BUCO
☐  Video ufficiale              0/1   BUCO
[+ linea]  [cambia numeri]
```

Casella vuota = buco in timeline. Librarian: cover / singolo se ci sono.

---

## Stampa / CRM (`/press`)

Raggruppa: Riviste | Blog | Radio | Playlist curator.

```
Testata        E-mail              Stato
────────────   ─────────────────   ─────────────────────
(vuoto)                            Da contattare
```

Stati: Da contattare · E-mail inviata · In attesa di risposta · Recensione confermata.

Pannello **Template:** Cartella stampa · Pitch · Follow-up → [ Copia ].  
Se il pack ha buchi, banner *manca bio/cover* prima del testo.

---

## Sessione

Comandi: `/buchi` `/singoli` `/pitch` `/social` `/ricontatti` `/timeline`.  
“Inventami 20 blog da scrivere” → refuse: *inserisci chi vuoi contattare*.

---

## Cartella stampa (`/present`)

EPK da celle approved. Se buchi block (no bio, no cover), export “di lavoro” con watermark.

---

## Calendario — pattern ReleaseLoop

Mese / settimana. Cover sul giorno di drop. Filtri: solo uscite / solo marketing. iCal.

## Pitch 500 — pattern Harment Pitch500

Un form: genere, mood, strumenti, comparable, storia, fit. Contatore 500. [ Copia per S4A ].

## Metadata — pattern Harment MetaAid

Checklist DSP; rosso se manca obbligatorio. Sblocca il task distributore.

## EPK — pattern ReleaseLoop

Pagina/URL: foto, quote, pezzi approved, mail pubbliche scelte. Bozza privata finché non pubblichi.

## Impostazioni

Chiavi, modelli, `Nuova incubazione`.  
Promemoria ricontatti (locale / mail a te), non invio automatico alle redazioni.
