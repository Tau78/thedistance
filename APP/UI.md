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

## Social

Alto: **numeri che hai deciso** (o “non decisi”).

```
Per drop “—” :  storie [  ]  post [  ]  foto [  ]
```

Sotto: slot nati da quei numeri, stato empty/draft/scheduled.  
Librarian a destra: cover e pezzo singolo, se ci sono.

---

## Stampa (CRM)

Filtri: giornalista · blog · playlist curator · radio · altro.  
Colonna **Rubrica** | **Mail / solleciti**.

Ogni contatto: testata, tipo, mail, `ultimo esito`, badge “già supportato”.  
Thread: bozza → inviata → waiting → sollecito dovuto.  
Composer pitch: a destra bio/cover/singoli; buchi, non biografie inventate.

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
