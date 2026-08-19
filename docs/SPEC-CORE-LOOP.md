# Incubatore — spec del loop (CORE)

**Versione:** 2.0 (incubatore vuoto)  
**Stato:** implementabile

Piano d’insieme: [`../APP/PIANO.md`](../APP/PIANO.md). Contratto tipi: [`../APP/schema.ts`](../APP/schema.ts).

Loop:

> **INGEST** frammenti → **INCASELLA** creando o riempiendo caselle che prima non esistevano → **GENERA** solo i buchi del materiale approvato.

All’avvio non esiste uno scaffale di N tracce. N, i nomi, il genere, gli argomenti sono sconosciuti.

---

## 0. Oggetti

| Oggetto | Nome UI | Ruolo |
|---|---|---|
| App | **Incubatore** | Superficie |
| Work | **Lavoro** | Un’incubazione. Title/genre nullable |
| Piece | **Pezzo** | Brano o frammento nato da conferma. Title nullable |
| Cell | **Cella** | Faccia di un pezzo o del lavoro |
| Inbox | **Inbox** | Arrivo, mai silent-apply |
| Decision | **Decisione** | Pin emergente, lista iniziale `[]` |
| Compilatore | **Genera** | Riempie celle empty, sotto pack runtime |

### 0.1 Vietato nel core

| Vietato | Perché |
|---|---|
| Seed di 9 / 15 / 16 cassetti | Il totale non è noto alla creazione |
| Enum di epoche, atti, generi, personaggi | Non sono predeterminati |
| System prompt con The Distance / π / Cassandra | È un lavoro, non il prodotto |
| Creare pezzi in silent-apply | Solo conferma umana |
| Generare un album da un prompt a incubatore vuoto | Non c’è materiale da cui essere coerenti |
| Linter “mancano le 15” | Nessun tetto nel codice |

### 0.2 The Distance

Fuori dal core. Se importi *quel* repo, un **adapter** opzionale riconosce markdown `ALBUM/nn-slug.md` e propone pezzi. Le decisioni in `RICONCILIAZIONE.md` arrivano come `proposed`, non locked.

---

## 1. Lifecycle del lavoro

```
uninitialized
    │
    ▼
empty                  ← 0 pezzi, title null, decisions []
    │
    ├─ inbox.accept che crea pezzo ──► emerging
    ├─ piece.create ─────────────────► emerging
    └─ work.reset ───────────────────► empty

emerging ── (almeno 1 pezzo, struttura ancora fluida) ──► drafting
drafting ── (tu locki “lavoro chiuso” o criterio che hai scelto) ──► closing
```

Non esiste `empty_shelf_seeded` con cassetti precotti.  
Non esiste `first_run_chooser` “Apri The Distance”.

Schermo empty: due CTA, vedi [`../APP/UI.md`](../APP/UI.md).

---

## 2. Inbox

Stati: `received → classifying → proposed | needs_human | conflict → accepted | rejected`.

`proposed → accepted` richiede click.

### 2.1 Target

Oltre a riempire una cella esistente:

- `new_piece` — crea Piece + cella;
- `decision` nuova;
- `research` nuovo tema;
- `uncertain`.

### 2.2 Classifier

**Passo A — forma (deterministico)**  
Filename, mime, tag `[Verse]`, heading `#`, durata audio, hash duplicato.

**Passo B — match sull’incubazione corrente**  
Similarità con titoli/testi dei pezzi *esistenti*. Se 0 pezzi, B non trova nulla.

**Passo C — LLM structured output** (se A+B non bastano)

```json
{
  "targets": [
    {
      "scope": "new_piece",
      "suggestedTitle": null,
      "cell": "lyrics",
      "confidence": 0.7,
      "createsPiece": true,
      "reasons": ["strofe, nessun pezzo in incubazione"]
    }
  ],
  "needsHuman": false
}
```

Niente gazetteer `Room→09`.  
Se un heading è “Room Pt.2” e esiste già un pezzo “Room Pt.1”, può proporre *altro pezzo* o *stessa famiglia* — `needs_human`.

### 2.3 Conferma

- **Crea e incasella** — `createsPiece=true`
- **Incasella nel pezzo…** — picker dei pezzi esistenti (lista corta, può essere 0)
- **È una decisione** — apre form domanda/scelta
- **Note di lavoro** — va in `work.notes` / archive
- **Scarta**

Batch: “crea un pezzo per ogni proposta > 0.85 con createsPiece”.  
Mai overwrite di cella `approved` senza conflict UI.

---

## 3. Completeness

Non esiste `album_ready = 15 ready`.

| Oggetto | “Fatto” default (cambiabile) |
|---|---|
| Cella | `approved` o `not_applicable` o `locked` |
| Pezzo | le celle che *tu* non hai nascosto: almeno lyrics **o** audio, più concept se il pezzo non è strumentale |
| Lavoro | decisione emergente `work_closed` **oppure** (debole) tutti i pezzi non archiviati `ready` |

Un pezzo può essere ready da solo in un lavoro di un solo brano.  
Un lavoro può restare `emerging` con 20 pezzi se non hai deciso che è un album.

---

## 4. Generazione

Permessa solo se:

- il target esiste (pezzo/cella) **oppure** il job è `propose_structure` (output → inbox);
- la cella è `empty` | `draft` | `generated` (rigenera);
- la cella non è `not_applicable`;
- lo Steward non refuse sul pack.

Pack = decisioni locked (forse zero) + approved del target + approved dei link + style bible se c’è.  
Se pack quasi vuoto: lyricist produce minimale o chiede; non inventa un concept album.

Refuse di default (codice, non lore):

- “crea 12 tracce” senza job `propose_structure`;
- scrivere in una cella N/A;
- contraddire una decisione locked *di questa incubazione*.

I refuse tipo “niente lyrics su Dadej” esistono solo se quella decisione è locked qui.

---

## 5. Conflitti

Nuovo insert vs cella approved → ConflictReview: tieni approved / nuova versione / archivia vecchio.  
Nuovo insert vs decisione locked → tieni lock / apri mozione (due conferme).  
Due proposte `new_piece` che sembrano lo stesso brano → disambiguazione.

Nessun conflitto “H1 dice 09 ma PLAYLIST dice 15” finché entrambi i testi non sono slottati.

---

## 6. Versioning

Come v1: linea ingested/promoted vs draft.  
Promote non è silent.  
Write-back è sessione esplicita.

---

## 7. Walkthrough A — incubatore vuoto, tre scarti

1. Empty.  
2. Incolli 8 righe senza titolo → `new_piece` lyrics. Confermi. 1 pezzo untitled.  
3. Drop `demo.wav` → match basso → `new_piece` audio **o** stesso pezzo. Scegli stesso.  
4. Drop PNG → artwork di quel pezzo.  
5. Genera: può pulire lyrics e fare un style prompt da *quel* wav+testo. Non propone “traccia 02”.

---

## 8. Walkthrough B — import The Distance (adapter)

1. Empty. Import repo.  
2. Inbox: ~20 item.  
3. Accetti in lotto i markdown `ALBUM/*` come pezzi (tanti quanti i file).  
4. Decisioni da RICONCILIAZIONE restano `proposed` finché non le locki.  
5. Linter (dopo lo slot): drift H1, ReNew 1984 vs 1983, ART assenti, testi vuoti *sui pezzi creati*.  
6. Generate Room Pt.2 solo se quel pezzo esiste e le decisioni che vietano spoiler le hai lockate. Altrimenti il pack non contiene quel divieto — e tu puoi lockarlo prima.

Dettaglio file-per-file di *quel* repo: [`../APP/esempio-the-distance.json`](../APP/esempio-the-distance.json). Non è lo skeleton dell’app.

---

## 9. Walkthrough C — “non so quante tracce”

Materiale: un ODT con 6 heading e 2 paragrafi di lore.  
`propose_structure` → 6 `new_piece` + 1 concept di lavoro.  
Accetti 4 heading, scarti 2, il lore va in `work.concept`.  
Scaffale: 4 pezzi. Domani ne aggiungi un quinto da un vocal.

---

## 10. Write-back

```
WORK.md                 # title se c’è, concept, decisioni locked
PIECES/{index?}-{slug-or-id}.md
```

Sezioni di pezzo: le celle non empty. Ordine del kit default, poi custom.

Adapter The Distance (opzionale): se `work.exportAdapter = "thedistance-v3"` *scelto da te*, scrive `ALBUM/nn-slug.md` + PLAYLIST. Il core non lo assume.

Commit: preview hunk, mai `git add -A` cieco.

---

## 11. Superficie v1

1. Empty screen + inbox + `piece.create`  
2. Accept che crea pezzo  
3. Celle + edit umano  
4. Classifier forma + match  
5. Generate lyrics/analisi/prompt sul pack runtime  
6. Decisioni emergenti + lint interno  
7. Export markdown  
8. Adapter import The Distance (dopo, non nel first-run)

Chat libera fuori dal loop. Sessione solo con comandi e @celle.

---

## 12. Stati — quick ref

```
work:     empty | emerging | drafting | closing
piece:    born | in_progress | ready | archived
cell:     empty | partial | draft | slotted | generated | approved | locked | not_applicable
inbox:    received | classifying | proposed | needs_human | conflict | accepted | rejected | archived
job:      queued | running | needs_review | approved | rejected | failed
decision: proposed | locked | superseded
```

---

## 13. Copy UI (IT)

| Dove | Copy |
|---|---|
| Empty | Non c’è un album. Non ci sono tracce. Non c’è un genere. |
| Crea pezzo da inbox | Crea pezzo e mettici questo |
| Genera su pack vuoto | C’è troppo poco di approvato. Genero comunque in forma minimale, o aspetti? |
| Sessione senza materiale | Inserisci qualcosa prima. |
| Reset | Nuova incubazione: si torna a zero. Questo lavoro non fa da stampo al prossimo. |
