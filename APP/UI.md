# Incubatore — UI

Desktop 1440×900, mobile 390×844. Banco scuro, tabelle dense.  
Mix per schermata: [`FONTI.md`](FONTI.md). Non copiamo un look unico.

Mobile: quattro tab come i mockup Gemini (DISCUS), rinominati al nostro mestiere: **Casellario · Lancio · Contenuti · PR**. Inbox e Oggi stanno dentro Casellario / Lancio, non come quinto tab.

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

Mobile: `Casellario | Lancio | Contenuti | PR`.  
`AZIONI NECESSARIE` (non un librarian astratto) è il blocco in cima o in fondo a ogni scheda: lista buchi + CTA contestuali.

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

## Timeline (`/timeline`)

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

---

## Riferimento mockup Gemini (DISCUS)

Due tavole mobile, tema notte. Non copiamo il nome, gli album di esempio, né “Progetti” al plurale come identità. Copiamo i **pattern che si leggono in un colpo**.

### Cosa funziona (lo adottiamo)

| Pattern | Dove sta nel mockup | Da noi |
|---|---|---|
| **4 tab** Casellario / Lancio / Contenuti / PR | bottom bar | IA mobile definitiva |
| **Stepper orizzontale** Idea → Demo → Studio → Master → Pronta | dettaglio traccia | `productionStatus` a pill, una evidenziata |
| **Micro-badge** Mix / Rec / Arr / Voci rosso-verde | sotto lo stepper | mappa su MissingItem + celle; rosso = buco |
| **Box AZIONI NECESSARIE** | alert marrone/oro in scheda | il buco *detto*, non un’icona; 2–4 CTA sotto (*Scrivi testi*, *Allega voci*, *Apri credits*) |
| **Avviso in lista album** | “Avviso ai naviganti” + % | Casellario: progress = celle approved, non un 68% inventato; banner solo se missing `open` |
| **Roadmap a data vera** | 11 apr Distributore, 25 apr Social… | Countdown −N *e* giorno di calendario (mix Harment + questa tavola) |
| **Matrice X/Y + badge** | 5/8 In lavorazione, 2/5 Mancante | Content matrix: giallo/rosso/verde |
| **Editor mail + allegati grandi** | Cartella stampa PDF, Cover JPG | Composer CRM; v1 *Copia / Condividi*, Invia dopo |
| **Scheda contatto** log + genere + link playlist | “21 ott inviata / 23 ott confermata” | `promoStatus` + timeline interazioni + URL Spotify se slottato |
| **PR a card per categoria** | Riviste / Blog / Radio / Playlist | griglia + stato colore |

### Cosa non copiamo

- App **DISCUS** e album precotti (Illusori, Ecosistema).
- Tab **Progetti** come prodotto multi-album in v1 (una incubazione; “nuova” è in impostazioni).
- **Invia email** come bottone primario prima dell’invio vero.
- Percentuale progetto se non è calcolata dalle caselle.
- CTA “Registra voci” che apre uno studio: da noi apre la cella audio o un reminder.

### Scheda pezzo (mobile, da tavola 1)

```
[ titolo lavoro ]           [ nome pezzo o senza nome ]

Ideazione  Demo  Studio  Master  [Pronta]
Mix ●  Rec ●  Arr ○  Voci ○

┌ AZIONI NECESSARIE ─────────────────────┐
│ Testo ritornello 2 incompleto          │
│ Mancano le voci. Manca credito         │
│ compositore.                           │
│ [ Scrivi testi ] [ Allega voci ]       │
│ [ Apri credits ]                       │
└────────────────────────────────────────┘
```

Empty: stepper su Idea, badge tutti ○, box *Nessun buco detto — butta materiale o aggiungi “manca…”*.

### Tavola 3 — setup, cover IA, team, report

| Pattern | Giudizio |
|---|---|
| **Definisci i bit mancanti** (tracce, testi, copertina, bio, reel, feed) | Sì, come *filtro di attenzione*, non come setup obbligatorio day-1. Checklist spuntabile: “voglio che mi navi su questi tipi”. Non crea i brani. |
| **Genera cover** prompt + anteprima + stile | Sì: è il nostro Art Director. “Salva” incasella; niente “Invia” a un team inesistente. |
| **Membri + chat** | No in v1. Una incubazione, un utente. |
| **Attività recenti** | Sì, anche da soli: “hai slottato un wav”, “l’AI ha proposto un pitch”. Senza avatars finti. |
| **Progress 45%** | Solo se calcolato (celle + content line). Altrimenti niente barra. |
| **Grafici Spotify / IG** | No in v1. Fase post-lancio = log e export, non analytics da dashboard. Report = markdown/PDF dei buchi chiusi e delle outreach, non ascolti. |

Schermata bit (opzionale, da Impostazioni o da “Guarda i buchi”):

```
Cosa vuoi che ti segnali

☐ Tracce audio    ☐ Testi    ☐ Copertina
☐ Bio / press kit ☐ Reel     ☐ Feed
☐ Credits

[ Salva ]
```

Tutto spento = niente nags. Tutto acceso = METHOD_HOLES interi. Non è “configura l’album ISTORTOFIA”.
