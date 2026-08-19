# Distance Desk — Spec del loop di prodotto (CORE)

**Album:** *The Distance* — Distance Proof Band  
**Autore del lavoro:** Mauro Andreoni  
**Versione spec:** 1.0  
**Stato:** implementabile (stati, rami, mapping file, vincoli)

Questo documento specifica **solo** il loop eroe:

> **INGEST** frammenti esistenti → **INCASELLA** nello scaffale già sagomato da *questo* album → **GENERA** i buchi, coerente col materiale slottato.

Non è uno studio musicale generico. Non è una chat sulla repo. Non esiste “nuovo album vuoto” come percorso principale.

---

## 0. Identità e oggetti

| Oggetto | Nome UI (IT) | Ruolo |
|---|---|---|
| App | **Distance Desk** | Superficie di lavoro |
| Hero object | **Lo Scaffale** | Griglia 15 tracce × celle |
| Ingest | **Inbox** | Vassoio di arrivo, mai silent-apply |
| AI | **Il Compilatore di buchi** | Riempie solo celle `empty`, sotto vincolo |
| Canon bloccato | **Barra decisioni** | Pin non editabili in silenzio |
| Persistenza umana | Repo markdown (questa) | Source of truth dopo write-back |
| Persistenza runtime | `.desk/` | Stato, inbox blob, draft, eventi |

### 0.1 Cosa l’app *non* fa

| Vietato | Perché |
|---|---|
| Canvas vuoto “crea album” | Lo scaffale *è* The Distance |
| Chat libera sul repo | Il lavoro è incasellare e chiudere buchi |
| Generare una 16ª traccia | Canon: 15, Cassandra tagliata |
| Generare un nuovo finale | Finale = 15 Distance Proof, opzione A |
| Resuscitare Cassandra in album | Solo bonus / archivio |
| Cambiare 1997 → 1993 | Frantic Caller verificato |
| Inventare lyrics originali per Dadej | Dadej = reverse di Jaded |
| Promuovere un draft senza Mauro | Canon mai sovrascritto in silenzio |
| π in ogni traccia | π sottile: lore + Distance Proof |

### 0.2 Autorità di numerazione

**Unica chiave di slot:** numerazione PLAYLIST v3 (`01`…`15`).

| Sorgente | Ruolo |
|---|---|
| `PLAYLIST.md` tracklist | Autorità |
| Filename `ALBUM/15-distance-proof.md` | Allineato all’autorità |
| H1 `# 09 — Distance Proof` | `legacy_number` — drift, non chiave |
| `CONCEPT.md` scaletta 16 tracce | Sorgente storica, in conflitto |

Il Desk **non** usa mai il numero nell’H1 come `trackId`.

---

## 1. First-run e scaffale vuoto

### 1.1 Macchina a stati — `app.lifecycle`

```
uninitialized
    │
    ▼
first_run_chooser
    │
    ├─[Apri The Distance / Inserisci materiale]──► empty_shelf_seeded ──► ready
    │
    └─[Apri la repo git]──► hydrating_from_repo
                                │
                                ├─ success ──► ready   (+ drift/conflict tickets)
                                └─ fail    ──► first_run_chooser  (+ errore)
```

Non esiste lo stato `blank_studio`.  
Non esiste lo stato `new_album_wizard` nel first-run.

### 1.2 Schermo `FirstRunChooser`

Sfondo scuro (palette già in `tools/generate_presentation.py`: BG `#0a0e17`, cyan, magenta, gold).

```
THE DISTANCE
Distance Proof Band

Lo scaffale c’è già. I quindici cassetti anche.
Inserisci quello che hai. Poi chiudiamo i buchi.

[ Inserisci quello che hai già ]     → empty_shelf_seeded + Inbox aperto
[ Apri la repo git di questo album ] → hydrating_from_repo
```

Niente campo chat. Niente “descrivi l’album”. Niente “genera 15 tracce”.

Footer piccolo, non hero: `Altro lavoro…` (fuori scope v1 — nascosto o disabilitato).

### 1.3 Seme strutturale (`AlbumSkeleton`)

Al passaggio in `empty_shelf_seeded` l’app **non** chiede a Mauro la scaletta. Istanzia lo scheletro cotto in codice (e/o `.desk/skeleton.the-distance.json`), copiato da PLAYLIST v3 + RICONCILIAZIONE + STORIA.

#### 1.3.1 `CanonLock` — barra decisioni (sempre visibile)

| `key` | `value` | UI |
|---|---|---|
| `track_count` | `15` | 15 tracce |
| `cassandra` | `cut` | Cassandra tagliata |
| `finale` | `15_distance_proof_after_14_landing` | Finale = Distance Proof |
| `origin_year` | `1983` | Canale dal 1983 |
| `future_year` | `5125` | 5125 = 1983 × π |
| `prologue_year` | `1997` | Into the Bore = 1997 |
| `signals` | `bidirectional` | Segnali bidirezionali |
| `dadej` | `jaded_reverse` | Dadej = Jaded reverse |
| `room` | `pt1_5125 + pt2_1984_hit` | Room Pt.1 + Pt.2 |
| `she` | `travel_companion` | She = compagna di viaggio |
| `pi` | `subtle` | π sottile |
| `extras` | `first_ripples, code_within, fifth, landing` | Extra confermati |
| `passage_of_pi` | `replaced_by_dadej` | Passage of Pi sostituito |
| `numbering` | `playlist_v3` | Chiavi 01–15 |

Ogni lock ha:

```ts
{
  key: CanonKey
  value: string
  status: "locked"
  source: "baked_skeleton" | "repo:RICONCILIAZIONE.md" | "human_revision"
  mutable: false
  revision_only_via: "ProposeCanonRevision"
}
```

La barra **non** è un form. Tap su un pin → scheda “perché è bloccato” + link alle fonti. Per cambiarlo serve il flusso §8.4, non un edit inline.

#### 1.3.2 15 cassetti — dati seme (header, non contenuto)

| id | epoch | act | title | subtitle | narrative_role | lyrics_policy |
|---|---|---|---|---|---|---|
| 01 | 1997 | PROLOGO | Into the Bore | The Frantic Caller | Prologo. Radio, Area 51, canzoni = messaggi | original + **sample obbligatorio** |
| 02 | 5125 | I | Jaded | — | Collasso del mondo futuro | original; **fonte di Dadej** |
| 03 | 5125 | I | Room Pt.1 | Echoes from the Void | 5125 riceve il 1983, crede alieni | original |
| 04 | 5125 | I | No Sense | Our Only Clue | Musica = unico linguaggio | original |
| 05 | 1983 | II | First Ripples | — | Prime anomalie dopo il canale | original |
| 06 | 5125 | II | Then Go | — | Decisione: then go | original |
| 07 | 1984 | III | 80s | Eighties SOS | Videomessaggio / SOS 5125→1984 | original |
| 08 | atemporal | III | Dadej | Passage of Pi *(ex)* | Jaded al contrario attraverso il bore | **`reverse_only`** |
| 09 | 1984 | III | Room Pt.2 | The Anthem from Nowhere | Hit planetaria, origine ignota | original; **non spoilerare 15** |
| 10 | 1984 | III | The Code Within | — | La hit è un SOS | original; **decodifica 09** |
| 11 | 5125 | IV | ReNew | The Ark is Built | Parte la navicella verso **1983** | original |
| 12 | 5125 | IV | Fifth | Leaving Home | POV partenza ARK | original; **gramelot-capable** |
| 13 | BH01 | IV | Voyage Through Forever | — | Attraversamento; I + she | original |
| 14 | 1983 | IV | The Landing | Knowledge Bearers | Atterraggio; non possono cambiare il passato | original |
| 15 | 1984 | FINALE | Distance Proof | We Are Them ★ | Stesso mondo, π, tragedia. Chiude. | original; **unico posto π esplicito** |

Header cells in empty-shelf: `status = seeded` (struttura, non ingest).  
Content cells: `status = empty` (buchi).

### 1.4 UI scaffale vuoto (`empty_shelf_seeded`)

Layout a **atti**, non una lista piatta:

```
┌ Barra decisioni (pin) ──────────────────────────────────────────┐
│ 15 · Cassandra ✂ · DP finale · 1997 · She · π sottile           │
└─────────────────────────────────────────────────────────────────┘

PROLOGO        ATTO I              ATTO II         ATTO III
┌────┐    ┌────┬────┬────┐    ┌────┬────┐    ┌────┬────┬────┬────┐
│ 01 │    │ 02 │ 03 │ 04 │    │ 05 │ 06 │    │ 07 │ 08 │ 09 │ 10 │
│1997│    │5125│5125│5125│    │1983│5125│    │1984│ ↔  │1984│1984│
│ ○○ │    │ ○○ │ ○○ │ ○○ │    │ ○○ │ ○○ │    │ ○○ │ ○○ │ ○○ │ ○○ │
│8/8 │    │    │    │    │    │    │    │    │    │rev │HIT │    │
│buco│    │    │    │    │    │    │    │    │    │    │    │    │
└────┘    └────┴────┴────┘    └────┴────┘    └────┴────┴────┴────┘

ATTO IV                         FINALE
┌────┬────┬────┬────┐           ┌────┐
│ 11 │ 12 │ 13 │ 14 │           │ 15 │ ★
│5125│5125│BH01│1983│           │1984│
│ ○○ │ ○○ │ ○○ │ ○○ │           │ ○○ │
└────┴────┴────┴────┘           └────┘

Inbox (chiuso a linguetta)     Completeness: 0/15 tracce pronte · 0 celle ingestite
```

Ogni cassetto mostra:

1. Numero canon (01–15)
2. Anno
3. Titolo (già scritto — non “Track 9”)
4. Ruolo in una riga
5. **Pips** delle celle (vuoto / pieno / draft / conflitto)
6. Badge speciale se applicabile: `HIT`, `REV` (reverse), `★ FINALE`, `SAMPLE`, `GRAM`

CTA principale sotto lo scaffale, non in alto:

```
I buchi sono i cassetti vuoti.
Trascina file, incolla testo, importa la repo — niente si scrive nel canon da solo.
```

Aprire un cassetto vuoto (es. 09) mostra le celle come **pigeonhole**:

```
09  ROOM PT.2  ·  1984  ·  Atto III
The Anthem from Nowhere
Hit planetaria. Nessuno sa da dove venga.

┌ Concetto          ┐  HOLE
┌ Testo EN          ┐  HOLE   ← “da scrivere”
┌ Traduzione IT     ┐  HOLE
┌ Analisi           ┐  HOLE
┌ Suno Lyrics       ┐  HOLE
┌ Suno Style        ┐  HOLE
┌ Artwork           ┐  HOLE   (riferisce ART/09-room-pt2.png, file assente)
┌ Audio             ┐  HOLE
┌ Collegamenti      ┐  SEEDED  ← 07, 08, 10 già noti dallo scheletro
┌ Domande aperte    ┐  HOLE
```

Il buco è **etichettato**. Mauro vede *cosa* manca, non una textarea generica.

Bottone per cella vuota: `Genera questo buco` — disabilitato finché i **vincoli minimi** di quella cella non sono soddisfatti (vedi §7.3). Tooltip: *“Prima incasella 80s, Dadej, Code Within concept — o conferma lo scheletro e genera sotto lock.”*

Eccezione first-run: si può generare sotto **solo** `CanonLock` + header seeded, ma il Compilatore mostra un warning `LOW_CONSTRAINT` e Mauro deve spuntare “Genera con pochi vincoli (rischio)”.

### 1.5 Idratazione da repo (`hydrating_from_repo`)

Trigger: first-run B, oppure in ogni momento `File → Apri repo`.

Pipeline:

```
scan_root
  → parse_canon_docs          CONCEPT, STORIA, PLAYLIST, ARTWORK, STYLE-SUNO, RICONCILIAZIONE
  → parse_album_tracks        ALBUM/*.md
  → scan_art                  ART/ (può mancare)
  → scan_audio                riferimenti locali (path assoluti, gitignored)
  → compile_drift_report
  → compile_staleness_report
  → propose_hydration_plan    (non applica)
  → UI: HydrationReview
  → Mauro conferma per gruppo
  → apply → ready
```

#### 1.5.1 Mapping file → cella (idratazione)

Vedi tabella §12.2. Ogni sezione markdown diventa una cella con:

```ts
{
  status: "ingested"
  provenance: {
    kind: "repo_hydrate"
    path: "ALBUM/09-room-pt2.md"
    section: "Testo"
    git_sha: "038d400"
  }
}
```

Placeholder umani `*(da scrivere)*`, `*(testo da scrivere)*`, `*(reverse di Jaded — nessun testo originale)*` → cella **`empty`**, non ingested. Il parser li riconosce come sentinelle (lista in §5.4).

#### 1.5.2 Ticket automatici all’idratazione *di questa* repo (stato reale oggi)

Questi ticket **devono** comparire se si apre il workspace corrente. Non sono esempi: sono il delta osservato.

| id | tipo | Dettaglio | Azione proposta |
|---|---|---|---|
| `DRIFT-15-H1` | `NUMBERING_DRIFT` | `ALBUM/15-distance-proof.md` H1 = `# 09 — Distance Proof`; atto nel file = “IV”; collegamenti usano numeri vecchi (06 80s, 08 ReNew) | Riscrivere H1 → `# 15 — Distance Proof`; atto → FINALE; ricalcolare Collegamenti. **Non** slottare come traccia 09 |
| `DRIFT-08-H1` | `NUMBERING_DRIFT` | `ALBUM/08-dadej.md` H1 = `# 07 — Dadej`; atto/collegamenti vecchi (06 80s, 08 ReNew) | H1 → 08; collegamenti → 02, 07, 09 |
| `DRIFT-11-H1` | `NUMBERING_DRIFT` | `ALBUM/11-renew.md` H1 = `# 08 — ReNew`; destinazione “1984”; collegamenti → 09 Distance Proof | H1 → 11; destinazione **1983** (canon Landing); collegamenti → 10, 12 |
| `DRIFT-07-H1` | `NUMBERING_DRIFT` | `ALBUM/07-80s.md` H1 = `# 06 — 80s` | H1 → 07 |
| `STALE-PLAYLIST-10` | `PLAYLIST_STALE` | PLAYLIST marca 10 Code Within `❌`; il file ha testo EN + IT + Suno + analisi | Aggiornare colonna Testo → `✅` |
| `STALE-PLAYLIST-12` | `PLAYLIST_STALE` | PLAYLIST marca 12 Fifth `❌`; il file ha testo da gramelot + Suno | → `✅` |
| `STALE-PLAYLIST-SCOPE` | `CANON_COPY` | PLAYLIST decisioni: “~16 tracce concept, Cassandra tagliata” vs lock `track_count=15` | Allineare copy a 15 |
| `CONFLICT-CONCEPT-ODT` | `SOURCE_STALE` | `CONCEPT.md` ha 1993, Cassandra #16, Passage of Pi, DP non ultimo | Tenere lock; CONCEPT resta `canon:source_document` |
| `MISSING-ART` | `ASSET_MISSING` | `ARTWORK.md` punta a `ART/*.png`; cartella assente dal git | Celle artwork = `empty` con path atteso; non inventare PNG |
| `MISSING-LYRICS-09` | `HOLE` | Room Pt.2 testo = da scrivere | Candidato generazione #1 |
| `MISSING-LYRICS-11` | `HOLE` | ReNew testo = da scrivere; 3 domande aperte | Generazione dopo aver chiuso/accettato le domande |
| `MISSING-LYRICS-14` | `HOLE` | Landing testo vuoto; **spunti già slottati** da Concept.odt | Generazione ad alta constraint |
| `DRAFT-15` | `PARTIAL` | Distance Proof ha bozza corta; checklist “Cosa manca” aperta | Completamento, non sostituzione |
| `POLICY-08` | `LYRICS_POLICY` | Dadej: nessun testo originale | Cell `lyrics_en` = `na_reverse` (piena per policy, non un buco di lyrics) |
| `AUDIO-12-LOCAL` | `EXTERNAL_PATH` | Fifth cita `/Users/mauroandreoni/Downloads/Looking Through the Stars.mp3` | Inbox: “allegato assente”; chiedere drop del file |

HydrationReview raggruppa: **Drift numerazione** · **PLAYLIST stale** · **Buchi** · **Asset mancanti** · **Canon vs CONCEPT**.

Mauro può:

- `Conferma tutto il gruppo Drift` (write-back H1/collegamenti)
- `Conferma buchi` (lascia empty, popola completeness)
- `Parcheggia CONCEPT come sorgente storica` (default)

Niente write-back finché non conferma il gruppo (vedi §12).

### 1.6 Dopo first-run — `ready`

Lo scaffale resta la home. L’Inbox è una linguetta. Non si atterra in una chat.

---

## 2. Inbox — ogni modo di inserire materiale

### 2.1 Stati di un `InboxItem`

```
received
    ▼
extracting          (hash, mime, testo, OCR, STT, parse ODT/PDF)
    │
    ├─ extract_fail ──► needs_manual_extract ──► (retry | park)
    ▼
classifying         (regole + modello)
    ▼
proposed            (1..n SlotProposal, ordinati per confidence)
    │
    ├─ confidence ≥ T_HIGH e 1 vincitore ──► awaiting_confirm
    ├─ top2 entro Δ ──► needs_disambiguation
    ├─ top < T_LOW ──► uncertain_park_suggested
    └─ tocca CanonLock ──► conflict_review   (prima di confirm)
    │
    ▼
awaiting_confirm
    │
    ├─ confirm                    ──► slotted
    ├─ retarget(slot)             ──► slotted
    ├─ split(item → [item…])      ──► (ognuno riparte da classifying)
    ├─ confirm_as_archive         ──► slotted (cella archived, non overwrite)
    ├─ confirm_as_new_version     ──► version bump + previous → archived
    ├─ park                       ──► parked
    └─ reject                     ──► rejected
```

**Mai** `proposed → slotted` senza azione umana.  
`T_HIGH = 0.82`, `T_LOW = 0.45`, `Δ = 0.08` (configurabili in `.desk/config.json`).

### 2.2 Schema `InboxItem`

```ts
type InboxItem = {
  id: string                         // "inb_…"
  received_at: string                // ISO
  source: IngestSource
  blob_ref: string                   // .desk/inbox/<id>/original
  mime: string
  sha256: string
  filename_original?: string
  extract: ExtractResult
  proposals: SlotProposal[]
  state: InboxState
  linked_conflict_ids: string[]
  human_note?: string
}

type IngestSource =
  | "drag_file"
  | "paste_text"
  | "voice_memo"
  | "git_repo"
  | "suno_link"
  | "audio_file"
  | "image_file"
  | "chat_dump_text"       // WhatsApp/Slack/iMessage incollato
  | "chat_dump_screenshot"
  | "share_sheet"          // mobile
```

### 2.3 Canali di ingest — comportamento esatto

#### A. Drag & drop file (desktop)

Zone drop: (1) Inbox linguetta (2) intero scaffale (3) un cassetto aperto (4) una cella aperta.

| Drop target | Effetto |
|---|---|
| Inbox / scaffale | Classifica libera |
| Cassetto 09 aperto | Prior `trackId=09`, classifica solo la cella |
| Cella `lyrics_en` 09 | Prior cella; se il file è un PNG → warning tipo mismatch, non silent fail |

Tipi accettati (v1):

`.md .txt .rtf .odt .docx .pdf .png .jpg .webp .gif .mp3 .wav .aiff .m4a .flac .ogg .mov .mp4 .json .zip`  
+ URL stringa se il drag è un link.

ZIP: si spacchetta in N item (max 50); ogni file è un InboxItem figlio con `parent_id`.

#### B. Incolla testo (`⌘V` ovunque nello scaffale)

- Se clipboard = testo → item `paste_text`
- Se clipboard = immagine → come drop immagine
- Se clipboard = path file → come drag
- Heuristica dump chat: se matcha `WhatsApp Chat with`, `[\d{1,2}:\d{2}]`, `Mauro Andreoni  [`, timestamp Slack (`Yesterday at`, `9:41 AM`) → `chat_dump_text`

Pannello incolla: textarea + “Incasella”. Non “Invia all’AI”.

#### C. Nota vocale (`Registra`)

Registra in-app (m4a) **oppure** drop di Voice Memos (`.m4a`).

Extract:

1. STT italiano+inglese (Mauro mescola)
2. Classifica parlato vs cantato vs rumore
3. Se cantato: tentativo gramelot (sillabe, non “correggere” in inglese)
4. Se parlato: entity extract (titoli traccia, anni, lock keys, “hit”, “finale”, “Dadej”…)

UI: waveform + transcript editabile **prima** della classificazione finale. Mauro può correggere il transcript: quello corretto è la source, non l’audio grezzo (l’audio resta allegato).

#### D. Import git repo

Non è “chat with the repo”. È hydration §1.5.

Input: path locale, oppure remote `git clone` read-only.  
Scope v1: *questa* struttura (`CONCEPT.md`, `ALBUM/`, …). Se la root non ha `PLAYLIST.md` + `ALBUM/` → errore `NOT_A_DISTANCE_REPO` + offri “importa come file sciolti nell’Inbox”.

#### E. Link Suno

Incolla `https://suno.com/song/…` o `https://suno.com/s/…`.

Extract:

- oEmbed / fetch metadati pubblici: titolo, stile, lyrics se visibili, duration
- Se il fetch fallisce: item resta link + Mauro tagga a mano
- Audio: **non** scaricare in violazione ToS; salvare `suno_url` nella cella `audio_suno_link`. Se Mauro droppa anche il wav esportato, i due item si **legano** (`bundle_id`)

Proposal tipica: `track:??:audio_suno_link` + opzionale `suno_lyrics` / `suno_style` se il link li espone.

#### F. Drop mp3/wav/aiff

Extract: ffprobe (duration, bpm se possibile, tags), fingerprint acustico vs audio già slottati, filename tokens (`dadej`, `fifth`, `looking through`, `room`, `suno`).

Rami:

| Segnale | Proposal |
|---|---|
| Filename / path contiene `Looking Through the Stars` | `track:12:gramelot` + `track:12:audio_local` (bundle) |
| Durata ~ uguale a Jaded già slottato + correlazione inversa alta | `track:08:audio_local` (reverse candidate) |
| Tags `suno` / commento stile | `audio_suno_link` o `audio_local` + style guess |
| Sample parlato radio, 1997 / Art Bell / “Area 51” | `track:01:sample` |
| Nessun segnale | `uncertain` + “ascolta e scegli cassetto” |

#### G. Drop immagine

Vision + filename + confronto con `ARTWORK.md` (prompt/note estetiche).

Rami:

| Segnale | Proposal |
|---|---|
| Disco / dance floor / “Anthem” | `track:09:artwork` |
| Lab ’80 + equazione 1984×π | `track:15:artwork` |
| Hangar / ARK | `track:11:artwork` o `12` (disambiguare) |
| Split 5125/1983, π, cassetta | `album:cover` (`ART/cover.png`) |
| Band logo / retro | `album:identity` (`ART/band-dpb.png`) |
| 1983 paradiso vs 5125 deserto + “Cassandra” | `bonus:cassandra:artwork` — **non** track 16 |
| Screenshot UI Slack/WhatsApp | reclass → `chat_dump_screenshot` |

#### H. Dump WhatsApp / Slack

**Testo:** split messaggi → un *thread* = un InboxItem, con `messages[]`. Classifica a livello thread (una decisione) **e** flag dei messaggi che sembrano lyrics (righe corte ripetute).

**Screenshot:** OCR → stesso pipeline del dump testo + `screenshot_ref`.

Heuristics entità: `Cassandra`, `Distance Proof`, `1993`, `1997`, `Dadej`, `Landing`, `π`, `She`, `Room`, `Suno`, `finale`.

Se il thread afferma un `CanonLock` già vero → `corroboration` (non conflitto).  
Se contraddice → `conflict_review`.

### 2.4 UI Inbox

Lista cronologica, card per item:

```
┌ Voice Memo 47s · oggi 18:12 ─────────────────────────┐
│  transcript: «Room Pt.2 deve essere la hit…»          │
│  proposta: 09 · concetto + vincolo generazione  0.91  │
│  [ Conferma ] [ Cambia cassetto ] [ Dividi ] [ Park ] │
└───────────────────────────────────────────────────────┘
```

Filtri: `da confermare` · `incerti` · `conflitti` · `slottati` · `parcheggiati`.

L’Inbox **non** genera. Solo propone slot.

---

## 3. Classifier — regole + AI → SLOT

### 3.1 Cos’è uno SLOT

```ts
type Slot =
  | { kind: "track_cell"; trackId: TrackId; cell: TrackCell }
  | { kind: "album_cell"; cell: AlbumCell }
  | { kind: "canon_decision"; key: CanonKey }
  | { kind: "style"; key: "suno_template" | `suno_variant:${TrackId}` }
  | { kind: "research"; topic: string }      // Art Bell, Midjourney prompt, …
  | { kind: "bonus"; id: "cassandra"; cell: TrackCell }
  | { kind: "uncertain" }

type TrackCell =
  | "header"
  | "artwork"
  | "concept"
  | "lyrics_en"
  | "lyrics_it"
  | "analysis"
  | "suno_lyrics"
  | "suno_style"
  | "audio_local"
  | "audio_suno_link"
  | "sample"
  | "gramelot"
  | "links"
  | "archived"
  | "open_questions"
  | "production_notes"

type AlbumCell =
  | "cover"
  | "identity"
  | "storia"
  | "playlist_meta"
  | "artwork_index"
  | "presentation_blurb"
```

`SlotProposal`:

```ts
type SlotProposal = {
  slot: Slot
  confidence: number            // 0..1
  rule_hits: string[]           // id regole sparate
  model_rationale: string       // 1-3 frasi, IT
  conflicts: ConflictId[]
  suggested_action:
    | "fill_empty"
    | "new_version"
    | "archive_only"
    | "corroborate"
    | "split"
    | "park"
}
```

### 3.2 Pipeline del classifier (ordine fisso)

```
1. MIME / filename / URL router          (deterministico)
2. Extractors                            (STT, OCR, ODT, lyrics detect)
3. Rule engine                           (vocab album + lock + path)
4. Embedding retrieve                    (celle già slottate + skeleton)
5. Model propose (JSON schema)           (solo se rules < T_HIGH)
6. Merge + NMS                           (una proposta primaria, runner-up)
7. Conflict attach                       (§8)
8. Stop. Nessuna scrittura.
```

Il modello **non** può inventare un `trackId` fuori da `01–15` + `bonus:cassandra`. Se prova `16` → scartato, sostituito da `uncertain` + ticket `FORBIDDEN_TRACK`.

### 3.3 Vocabolario canon (gazetteer)

Matching case-insensitive, accenti smontati, alias:

| Alias | Normalizza a |
|---|---|
| Room 2, Room pt 2, Anthem from Nowhere, anthem | track 09 |
| Room, Room pt 1, Echoes from the Void | track 03 |
| Distance Proof, We Are Them, Pi Constant, The Pi Constant | track 15 |
| Dadej, Passage of Pi, Passage Of Pi | track 08 + lock `dadej` |
| Jaded | track 02 |
| ReNew, Renew, The Ark is Built, ARK | track 11 |
| Fifth, Leaving Home, Looking Through the Stars | track 12 |
| Landing, Knowledge Bearers | track 14 |
| Code Within, The Code Within | track 10 |
| 80s, Eighties, Eighties SOS | track 07 |
| Then Go, Than Go | track 06 |
| First Ripples | track 05 |
| Voyage, Voyage Through Forever | track 13 |
| Into the Bore, Frantic Caller, Art Bell | track 01 |
| Cassandra, Cassandra Complex, 3141 | bonus cassandra (cut) |
| 1993 + Into the Bore | lock conflict `prologue_year` |
| She, compagna | lock `she` |
| finale, opzione A | lock `finale` |

### 3.4 Regole deterministiche (priorità alta)

Eseguite prima del modello. Ogni hit aggiunge confidence.

| id | If | Then |
|---|---|---|
| `R-EXT-AUDIO` | mime audio | cell ∈ {audio_local, sample, gramelot} |
| `R-EXT-IMAGE` | mime image ∧ non-screenshot | cell = artwork / album cover |
| `R-EXT-ODT` | `.odt` ∧ (nome ≈ Concept) | `album_cell:storia` + `canon:source_document` + scan conflitti |
| `R-NAME-LTTS` | filename ~ Looking Through the Stars | `12:gramelot` + `12:audio_local` |
| `R-NAME-SUNO` | url host suno.com | `audio_suno_link` |
| `R-LYRIC-EN` | testo con `[Verse]` `[Chorus]` / strofe rimate EN | `lyrics_en` o `suno_lyrics` |
| `R-LYRIC-IT` | strofe IT, non prosa | `lyrics_it` |
| `R-PROSE-IT` | prosa IT, termini gazetteer | `concept` o `open_questions` o `canon_decision` |
| `R-STYLE-BLOOM` | “gated reverb”, “sawtooth”, template STYLE-SUNO | `style:suno_template` |
| `R-REVERSE` | “dadej” ∧ (“reverse” \| “al contrario”) | `canon:dadej` + `08:concept` + `08:production_notes` |
| `R-CASSANDRA-CUT` | “cassandra” ∧ (“tagliat” \| “cut” \| “fuori”) | corroborate lock `cassandra=cut` |
| `R-CASSANDRA-TRACK` | “cassandra” come traccia 16 / finale | **CONFLICT** lock |
| `R-YEAR-1993` | 1993 riferito al prologo | **CONFLICT** `prologue_year` |
| `R-YEAR-1997` | 1997 + Art Bell / Frantic | corroborate lock |
| `R-FINALE` | “distance proof” ∧ (“finale” \| “chiude”) | corroborate `finale` |
| `R-SHE` | she = compagna / navicella | corroborate `she` |
| `R-SCREENSHOT-CHAT` | UI Slack/WA rilevata | `chat_dump_screenshot` |
| `R-PLACEHOLDER` | `*(da scrivere)*` | non fill; lascia empty |
| `R-H1-DRIFT` | `# 09 — Distance Proof` in file `15-…` | drift ticket, slot = 15 |

### 3.5 Modello (passo 5) — contratto

System prompt fisso (non chat):

> Sei il classificatore di Distance Desk. Assegni UN pezzo di materiale a UNO slot dello scaffale The Distance (15 tracce, lock noti). Non inventi tracce. Non riscrivi il materiale. Rispondi in JSON Schema `SlotProposal[]`.

Input: extract + gazetteer hits + top-k celle già piene + lock + drop prior.

Output: max 3 proposal. Vietato `trackId` fuori dominio.

### 3.6 Casi `uncertain`

Va in `uncertain` quando:

- Nessun gazetteer, audio senza fingerprint, immagine generica
- Testo che potrebbe essere 09 *o* 07 (hit vs SOS) con Δ < 0.08
- Mauro dice “questa va da qualche parte”

UI: scaffale in modalità “toca il cassetto”. Il drop sul cassetto riassegna e riclassifica solo la cella.

---

## 4. Conferma umana — mai overwrite silenzioso

### 4.1 Principio

> **Niente** passa da Inbox a cella `ingested`/`promoted` senza un click esplicito.  
> **Niente** overwrite di una cella `ingested` | `promoted` | `locked`.  
> I draft generati **non** sono canon.

### 4.2 Schermo `ConfirmSlot`

```
┌ Incasella ─────────────────────────────────────────────┐
│ Voice Memo · 47s                                       │
│                                                        │
│ → 09 Room Pt.2 · Concetto                    0.91      │
│    + Vincolo generazione (hit / no spoiler 15)         │
│                                                        │
│ Cella concetto 09 è VUOTA. Confermare riempie il buco. │
│                                                        │
│ [ Conferma e riempi ]                                  │
│ [ Cambia: cassetto ▾  cella ▾ ]                        │
│ [ Metti in Archivio (non tocca il canon) ]             │
│ [ Park ]  [ Scarta ]                                   │
└────────────────────────────────────────────────────────┘
```

### 4.3 Rami se la cella *non* è vuota

| Stato cella | Default UI | Vietato |
|---|---|---|
| `empty` / `seeded` (solo header) | Conferma e riempi | — |
| `ingested` o `promoted` | **Non sostituire.** Opzioni: nuova versione · archivio a lato · fondi (diff) | overwrite 1-click |
| `generated_draft` | “Sostituisci il draft (non è canon)” *oppure* “Tieni draft, archivia questo ingest” | promuovere di soppiatto |
| `na_reverse` (Dadej lyrics) | Blocco: “Dadej non ha lyrics originali”. Solo `production_notes` / audio reverse | scrivere `lyrics_en` |
| `locked` (CanonLock) | Se uguale → corroborate. Se diverso → `conflict_review` | edit valore |
| `conflict` | Deve risolvere §8 prima | fill |

### 4.4 Conferma di gruppo (hydration / drop multiplo)

Checkbox per item. “Conferma i 6 senza conflitto”. I conflitti restano fuori dal batch. Bottone pericoloso assente: non esiste “conferma tutto incluso conflitti”.

### 4.5 Audit

Ogni conferma scrive su `.desk/events.jsonl`:

```json
{
  "ts": "...",
  "type": "slot.confirm",
  "actor": "mauro",
  "inbox_id": "inb_…",
  "slot": {"kind":"track_cell","trackId":"09","cell":"concept"},
  "action": "fill_empty",
  "prev_status": "empty",
  "next_status": "ingested"
}
```

Senza evento, lo stato non cambia (regola di implementazione: apply transazionale).

---

## 5. Shelf model — incasellamento, buchi, celle

### 5.1 File runtime

```
.desk/
  config.json
  skeleton.the-distance.json
  shelf.json              # stato celle
  inbox/<id>/original + extract.json
  drafts/<draft_id>.json
  events.jsonl
  constraints.compiled.json
```

`shelf.json` è derivabile; la verità dopo write-back è il markdown. Se `shelf.json` e i file divergono → `RECONCILE` all’apertura (come hydration, ma diff).

### 5.2 Cella

```ts
type CellState =
  | "empty"
  | "seeded"              // solo struttura (header, collegamenti noti)
  | "ingested"            // materiale di Mauro confermato
  | "generated_draft"     // AI, non canon
  | "promoted"            // era draft, Mauro ha promosso
  | "na_reverse"          // piena-per-policy (Dadej lyrics)
  | "na_not_applicable"   // es. sample su tracce ≠ 01
  | "conflict"
  | "archived"            // non è lo stato della cella viva; è un nodo versione

type Cell = {
  slot: Slot
  state: CellState
  body?: CellBody            // markdown / asset ref / json
  versions: VersionRef[]     // head = corrente se ingested/promoted
  draft?: DraftRef           // se generated_draft
  expected_path?: string     // es. ART/09-room-pt2.png
  completeness_weight: number
  required_for_track_done: boolean
}
```

### 5.3 Buchi vs pieni — UI

| Stato | Aspetto cassetto | Aspetto pigeonhole |
|---|---|---|
| `empty` | pip spento | bordo tratteggiato, label “BUCO”, CTA genera se vincoli ok |
| `seeded` | pip dim | testo struttura, badge “scheletro” |
| `ingested` | pip cyan | contenuto, badge “inserito · data” |
| `generated_draft` | pip gold pulsato | watermark “BOZZA”, [Promuovi] [Rigenera] [Scarta] |
| `promoted` | pip cyan | badge “promosso da bozza · sha” |
| `na_reverse` | pip cyan barrato | “N/A — reverse di 02” |
| `conflict` | pip magenta | banner conflitto, blocca generate su quella cella |
| asset missing | pip spento + icona | path atteso, “manca dal git” |

**Hole** = `empty` ∨ (`ingested` assente ∧ asset path missing).  
Una cella con solo `expected_path` e file assente è hole, anche se `ARTWORK.md` la elenca.

### 5.4 Sentinelle “vuoto” nel markdown

Il parser tratta come `empty`:

- `*(da scrivere)*`
- `*(testo da scrivere)*`
- `*(testo da scrivere — spunti in Concetto)*` → lyrics empty; spunti restano in `concept`
- stringa vuota sotto `## Testo`
- `*(reverse di Jaded — nessun testo originale)*` → `na_reverse`, non hole di lyrics

### 5.5 Relazioni fisse tra cassetti (grafo)

Usato da completeness, generation, collegamenti write-back.

```
01 ──proof──► 10 ──proof──► 15
01 ──sample/radio──► 03
02 ──reverse──► 08
03 ──mirror──► 09          (ascolto 5125 vs hit 1984)
07 ──through_bore──► 08 ──► 09
09 ──decoded_by──► 10
11 ──ark──► 12 ──► 13 ──► 14 ──montage──► 15
06 ──decision──► 07
she: 13, 14 (compagna); non altre tracce come protagonista
π esplicito: 15 (+ lore docs). 08 può alludere al passaggio, non alla formula.
```

Queste edge sono `seeded` e non si “generano” nuove edge che contraddicano i lock (es. 16, Cassandra in catena).

### 5.6 Cassetto 08 (Dadej) — modello speciale

Celle:

- `lyrics_en` / `lyrics_it` / `suno_lyrics` = `na_reverse`
- `concept` = required (spiegazione reverse)
- `production_notes` = required per “done” (come si fa il reverse)
- `audio_local` = reverse render *oppure* link a processo
- `artwork` = required come le altre

Generare “testo Dadej” è un ramo **vietato** (`FORBIDDEN_DADEJ_LYRICS`).

---

## 6. Completeness matrix — cosa significa “fatto”

### 6.1 Stati traccia `TrackReadiness`

```
hole_heavy      < 30% peso required
in_progress     30–99% ma manca almeno un required
ready           100% required (optional possono mancare)
blocked         conflitto su cella required
```

Album:

```
AlbumReadiness =
  | "shelf_empty"      // solo seeded
  | "ingest_phase"     // almeno 1 ingested, < 8 track ready
  | "closing_gaps"     // ≥ 8 ready, restano hole required
  | "album_ready"      // 15 ready ∧ tutti i lock coerenti ∧ PLAYLIST allineata
  | "blocked"          // conflitto lock irrisolto
```

`album_ready` **non** richiede Cassandra, **non** richiede π su ogni traccia, **non** richiede lyrics su Dadej.

### 6.2 Peso e required per cella (default vocale)

| Cella | Required per `ready` | Peso |
|---|---|---|
| header (epoch, act, title, role) | sì (seeded vale) | 0 (già seme) |
| concept | sì | 2 |
| lyrics_en | sì (tranne policy) | 5 |
| lyrics_it | sì (tranne policy) | 3 |
| artwork file | sì | 2 |
| suno_lyrics | sì se si produce via Suno | 2 |
| suno_style | sì se Suno | 2 |
| analysis | no | 1 |
| audio_local o suno link | no per v1 ready (produzione) | 2 |
| links / collegamenti | sì (seeded ok) | 1 |
| open_questions | no; se *presenti* e aperte → traccia non `ready` | — |
| gramelot | no | 1 |
| archived | no | 0 |
| sample | **solo 01** | 3 (su 01) |
| production_notes | **solo 08** required | 3 (su 08) |

Regola domande aperte: se la cella `open_questions` contiene item non checkati, `TrackReadiness = in_progress` anche con lyrics piene. Mauro può “Accetta come aperte in liner notes” → le domande restano ma `block_ready=false`.

### 6.3 Override per traccia (The Distance)

| id | Override |
|---|---|
| 01 | `sample` required (Art Bell, 11 set 1997, link). Lyrics possono essere corte. `suno_*` optional se il pezzo è collage radio+testo |
| 08 | lyrics `na_reverse`. Required: concept + production_notes + collegamento a 02. Audio reverse optional per v1 ready |
| 09 | lyrics required. Constraint extra: non-spoiler 15 deve passare il linter §7.5 prima di `ready` |
| 10 | se 09 lyrics empty, 10 può essere `ready` (oggi lo è) ma genera warning `DECODES_EMPTY_HIT` |
| 12 | se esiste gramelot, `lyrics_en` deve avere tabella “Modifiche dal gramelot” per `ready` (già vera in repo) |
| 14 | spunti Concept in concept **non** contano come lyrics |
| 15 | `ready` solo se la checklist “Cosa manca” è chiusa **oppure** Mauro marca `accept_short_finale` (esplicito). Default oggi: `in_progress` (bozza) |
| 11 | 3 open questions nel file attuale → non ready finché risolte o accettate |

### 6.4 Matrice album (colonne UI)

Vista `Matrice` (toggle dallo scaffale): righe = 15 tracce, colonne = celle required.  
Simboli: `·` empty · `S` seeded · `I` ingested · `G` draft · `P` promoted · `R` na_reverse · `!` conflict · `✗` missing asset.

Footer: `%` e prossimo buco consigliato (vedi §7.6 ordine).

### 6.5 PLAYLIST.md colonna “Testo”

Derivata, non autoritativa:

| Semantica PLAYLIST | Condizione Desk |
|---|---|
| ✅ | `lyrics_en` ingested/promoted ∧ (IT piena o policy) ∧ non draft |
| ⚠️ | lyrics presenti ma 15-checklist aperta / `partial` |
| 🔧 | policy speciale (08) |
| ❌ | lyrics empty |

Write-back aggiorna la tabella quando Mauro promuove o idrata (ticket STALE).

### 6.6 Snapshot *oggi* (post-hydration di questa repo, se Mauro conferma i ticket)

Usare come test di accettazione del parser.

| id | lyrics | note readiness |
|---|---|---|
| 01 | I | ready se sample links restano (sì nel md) e ART manca → **in_progress** (artwork hole) |
| 02 | I | in_progress se ART manca |
| 03 | I | idem |
| 04 | I | idem |
| 05 | I + Suno | idem |
| 06 | I + Suno | idem |
| 07 | I | H1 drift; ART manca |
| 08 | R | concept I; production notes I; ART manca |
| 09 | empty | **hole_heavy** |
| 10 | I + Suno | PLAYLIST stale; ART manca |
| 11 | empty + 3 Q | **hole_heavy** |
| 12 | I + gramelot + Suno | audio locale assente; ART manca |
| 13 | I + Suno | ART manca |
| 14 | empty + spunti | **hole_heavy** |
| 15 | partial bozza | **in_progress** |

Quindi: **nessuna** traccia è `album_ready` finché manca `ART/` *se* artwork è required. In v1 Mauro può settare `artwork_required_for_ready: false` in config se i PNG restano fuori git — default **true** (ARTWORK.md è canon visivo).

---

## 7. Generazione — solo gap-filling vincolato

### 7.1 Macchina a stati `GenerationJob`

```
requested
    ▼
compile_constraints
    │
    ├─ blocked_forbidden     → show why, no call
    ├─ blocked_cell_not_empty → refuse (usa Rigenera draft / nuova versione)
    ├─ low_constraint        → wait_ack_risk
    ▼
await_human_start            → Mauro vede ConstraintPack e [ Genera ]
    ▼
running
    ▼
draft_ready                  → cell.state = generated_draft
    │
    ├─ promote               → (opz. write-back) promoted
    ├─ regenerate            → nuovo draft, old → drafts archive
    ├─ edit_then_promote     → Mauro edita, poi promoted
    └─ discard               → cell torna empty (se era empty)
```

La generazione **non** parte al drop. Parte da un buco, dopo ConstraintPack visibile.

### 7.2 Target ammessi

Solo celle `empty` (o `generated_draft` via Rigenera).  
Mai: `CanonLock`, `na_reverse` lyrics, `seeded` header titles/years, nuova traccia.

Target v1:

- `concept`, `lyrics_en`, `lyrics_it`, `analysis`, `suno_lyrics`, `suno_style`, `open_questions` (proposte di risposta), `production_notes` (08), `presentation_blurb`
- Artwork: **prompt** Midjourney/DALL·E nella cella `open_questions` o `production_notes`, **non** un PNG inventato passato off come ART canon. Se Mauro chiede immagine: output = file in `.desk/drafts/` stato draft, promote copia in `ART/` solo su conferma.

### 7.3 Constraint compiler

Prima di ogni job, `constraints.compiled.json` per quel target:

```ts
type ConstraintPack = {
  target: Slot
  must_use: Constraint[]       // fatti slottati
  must_not: Forbidden[]        // lock + linter
  neighbors: NeighborExcerpt[] // celle collegate, excerpt
  style_template?: string      // STYLE-SUNO o variante traccia
  citations: Citation[]        // path + section
  risk: "high" | "normal" | "low_constraint"
}
```

Fonti, in ordine di autorità:

1. `CanonLock`
2. Celle `ingested` / `promoted` del target e dei vicini nel grafo
3. `STORIA.md` / `RICONCILIAZIONE.md` se idratati
4. `STYLE-SUNO.md` per tracce synth-pop
5. Header seeded
6. `CONCEPT.md` **solo** dove non contraddice 1–3 (1993, Cassandra, ordine 16 = esclusi)

Il pack è mostrato in italiano, lista bullet, **prima** del bottone Genera. Ogni bullet cita la cella/file.

### 7.4 `must_not` globale (hardcode + test)

Il modello riceve questa lista. Un **linter post-gen** la riapplica; se fallisce, il draft non si attacca (`draft_rejected_lint`).

| id | Vietato | Esempi che fanno fallire |
|---|---|---|
| `F-16` | 16ª traccia, “prossima traccia”, coda post-15 | “poi Cassandra chiude” |
| `F-CASSANDRA` | Cassandra / 3141 / self-made pyre come plot album | nome Cassandra nel testo 09–15 |
| `F-1993` | Prologo nel 1993 | “1993” su 01 o lore |
| `F-FINALE-NEW` | Qualsiasi chiusura dopo DP; DP non finale | Landing come rivelazione same-world |
| `F-SHE` | She ≠ compagna di viaggio | She come Terra, come π, come antagonista |
| `F-PI-EVERYWHERE` | Formula 1983×π o “pi constant” fuori da 15 e docs | π nel testo 09, 05, 07… |
| `F-DADEJ-LYRICS` | Lyrics originali 08 | — |
| `F-SPOILER-15` | Su 01–14: same world rivelato, “we are them”, colpa cosmica del 1984 già saputa, “nessuno può agire” come tesi | soprattutto **09** |
| `F-YEAR-SWAP` | 5125 in 05/14 come POV; 1983 come POV di 02 | — |
| `F-PASSAGE` | Far rinascere Passage of Pi come brano distinto da Dadej | — |

`F-SPOILER-15` eccezione: traccia **15** deve *contenere* same world / tragedia / impotenza (è il suo buco).

### 7.5 Linter testo (post-gen)

Regex + gazetteer:

- `cassandra`, `3141`, `cruel jest`, `self-made pyre` → fail se target ≠ bonus
- `1993` → fail
- `\bπ\b`, `3.14`, `1983 ×`, `times pi` → fail se `trackId ∉ {15}` ∧ cell è lyrics
- `we are them`, `same world`, `we are the future` → fail se `trackId === "09"`
- Titoli di altre tracce usati come spoiler plot in 09: `Distance Proof`, `Landing` come evento già accaduto

Warning (non fail): `stars`, `deep space`, `galaxy` su 09/07/03 (sovrapposizione lessicale già notata in 80s/Room).

### 7.6 Ordine consigliato dei buchi (quando Mauro preme “Prossimo buco”)

Non obbligatorio. Heuristica:

1. Chiudi **vincoli** che sbloccano altri (concept 09 prima delle lyrics 09 se concept empty)
2. Lyrics mancanti ad alta constraint: **14** (spunti già lì), **09** (se 07/08/10 concept+10 lyrics ci sono), **11** (dopo domande)
3. Completa **15** (bozza esiste — non riscrivere, estendi)
4. Suno pack per tracce con lyrics e senza style
5. Artwork prompts / drop PNG
6. Drift H1 write-back (non è generazione)

### 7.7 Prompt di generazione (contratto)

Il Compilatore non è un songwriter libero. Messaggio sistema:

> Completa la cella target. Usa solo i fatti in ConstraintPack. Non aggiungere personaggi, anni, finali, o rivelazioni non presenti. Se un fatto manca, lascia un placeholder `[[DOMANDA]]` nella bozza — non inventare. Lingua: EN per lyrics_en, IT per lyrics_it. Forma markdown come la sezione di destinazione.

Output JSON:

```ts
{
  draft_id: string
  markdown: string
  questions: string[]      // [[DOMANDA]] espanse
  used_citations: string[]
  lint: { ok: boolean, fails: string[], warnings: string[] }
}
```

Se `questions.length > 0`, promote è bloccata finché Mauro risponde o cancella i placeholder.

### 7.8 Varianti di generazione per tipo di cella

| Cella | Comportamento |
|---|---|
| `lyrics_en` | Struttura strofa/pre/chorus da STYLE-SUNO se traccia synth-pop; 12 e 10 usano i loro style già slottati |
| `lyrics_it` | Traduzione della EN slottata/promossa, non una nuova canzone |
| `suno_lyrics` | Tag `[Verse]` ecc. da `STYLE-SUNO.md`; `(melodic)` dove serve |
| `suno_style` | Clone template + ponte `[BRIDGE/SPOKEN]` adattato; 12 **non** usa il template ’80 se cella style già dice alt-rock |
| `analysis` | Tabelle “Cosa funziona / Confine” come i file esistenti |
| `concept` | 1–3 paragrafi, tono STORIA.md |
| 15 lyrics | **Estende** la bozza: tiene il blocco attuale come outro (come già indica il file). Non lo butta |

### 7.9 Rigenera vs nuova versione

- **Rigenera:** solo se stato `generated_draft`. Sovrascrive il draft, archivia draft precedente in `.desk/drafts/`.
- **Nuova versione** su `ingested`: non è generate automatico. Mauro deve `Chiedi una proposta di revisione` → draft affiancato, promote = version bump (§9).

---

## 8. Conflitti — insert vs canon slottato

### 8.1 Quando nasce un `Conflict`

Al classify o al confirm, se il payload contraddice:

1. un `CanonLock`
2. una cella `ingested`/`promoted` sulla stessa slot
3. il grafo (es. “Landing è il finale”)
4. la policy Dadej

### 8.2 Tipi

```ts
type ConflictType =
  | "CANON_LOCK"          // vs barra decisioni
  | "CELL_OCCUPIED"       // vs materiale già in cassetto
  | "SOURCE_STALE"        // CONCEPT 16/1993/Cassandra vs v3
  | "NUMBERING_DRIFT"     // H1 ≠ filename ≠ playlist
  | "PLAYLIST_STALE"      // checkmark ≠ cella
  | "NARRATIVE_STALE"     // ReNew “verso il 1984”, DP atto IV, collegamenti old
  | "FORBIDDEN_GEN"       // tentativo di generare il vietato
  | "ASSET_MISSING"       // puntatore senza file
```

### 8.3 Schermo `ConflictReview`

```
┌ Conflitto CANON_LOCK ──────────────────────────────────┐
│ CONCEPT.odt: prologo «1993 — Into the Bore»            │
│ Lock: prologue_year = 1997 (Frantic Caller verificato) │
│                                                        │
│ [ Tieni il lock 1997 ]          default                │
│   → CONCEPT resta sorgente storica; 1993 in archived   │
│ [ Proponi revisione canon → 1993 ]                     │
│   → flusso 8.4, richiede motivo, non immediato         │
│ [ Park il file intero ]                                │
└────────────────────────────────────────────────────────┘
```

Default **sempre** keep-lock / keep-ingested. L’opzione “vince il nuovo” è due click (`Proponi revisione` poi conferma).

### 8.4 `ProposeCanonRevision` (unico modo per muovere un pin)

1. Mauro sceglie il lock e il nuovo valore
2. Desk elenca **tutte** le celle che si rompono (es. Cassandra live → 16ª riga, ART bonus, PLAYLIST tagli, 15 non più finale…)
3. Conferma crea un `revision_draft` (non muove i pin)
4. Seconda conferma: pin aggiornato, evento `canon.revise`, write-back RICONCILIAZIONE + PLAYLIST decisioni
5. Tutte le celle generate sotto i vecchi lock restano ma banner `possibly_stale`

v1 può implementare solo i passi 1–3 e fermarsi a “non supportato, apri issue” per il 4 — ma **non** può silenziare un pin da un drop CONCEPT.

### 8.5 Conflitto CELL_OCCUPIED (es. nuove lyrics vs testo 02)

Diff side-by-side. Azioni:

- `Archivia il nuovo` (default)
- `Nuova versione` (vecchio → `<details> archivio` nel md)
- `Fondi a mano` (apre editor, risultato = ingested nuovo)

### 8.6 Conflitto vs *draft*

Il materiale di Mauro vince sempre sul draft: “Sostituisci bozza con ingest” è un click. Non è overwrite di canon.

---

## 9. Versioning — slottato vs bozze generate

### 9.1 Due linee di vita

```
INGEST / PROMOTE (canon cella)
  v1 (head) → v2 (head) → …
  old: archived, visibili in UI “Storia della cella”

GENERATE (draft)
  d1 → d2 (rigenera) → …
  promote(dN) → diventa v(N+1) sulla linea canon
```

Un draft **non** ha `git_sha` sul markdown album finché non c’è write-back. Vive in `.desk/drafts/`.

### 9.2 `VersionRef`

```ts
{
  version: number
  origin: "ingest" | "hydrate" | "promote" | "human_edit"
  sha256: string
  git_sha?: string
  created_at: string
  inbox_id?: string
  draft_id?: string
}
```

### 9.3 UI

Su cella piena: `v3 · inserito` + “Confronta v2”.  
Su draft: `bozza d2 · non in git`.

Promuovi chiede: `Scrivere ora nel markdown?` (§12) — può promuovere in shelf-only e write-back dopo.

### 9.4 Archivio nel markdown

Allineato al metodo già in repo (`<details><summary>Bozza originale…`). Promote+write-back di una sostituzione:

1. Head precedente finisce in `<details>` in fondo al file
2. Nuovo contenuto nella sezione viva
3. Commit message: `desk: 15 Distance Proof lyrics v2 (promote d3)`

Non cancellare storia. Non force-push.

---

## 10. Walkthrough A — otto file disordinati in una settimana

Ipotesi di contenuto **concreta** (così ogni ramo è testabile). Se il file reale differisce, vale il classifier, non questa narrativa — ma i rami sotto sono i rami da implementare.

Mauro è in `empty_shelf_seeded` **oppure** `ready` dopo hydration. I due casi divergono solo dove indicato.

---

### File 1 — Voice Memo (47s, italiano)

**Extract STT (dopo eventuale correzione Mauro):**

> «Per Room parte due voglio la hit, tipo anthem, tutti la ballano nel ottantaquattro, nessuno sa da dove viene. Però dentro c’è l’SOS, quello di Eighties. Code Within lo decodifica dopo. Non dire che siamo noi, non dire il finale.»

**Classifier:**

- Gazetteer: Room pt 2 → 09; 1984; hit; Code Within → 10; Eighties → 07; “non dire il finale” → lock `finale` + `F-SPOILER-15`
- Proposal primaria: `09:concept` 0.93, action `fill_empty` (o `new_version` se concept già da hydration)
- Secondaria: attacca **vincolo** al target 09 lyrics (`must`: anthem, dancefloor, origine ignota, SOS sepolto; `must_not`: we are them / same world)

**Conferma:** Mauro [Conferma].  
09 concept ← testo normalizzato del memo.  
`GenerationConstraint` extra salvato su 09 (`voice_memo_inb_…`).

**Cosa offre dopo:** “Genera testo EN di 09” sale di priorità (vincolo appena slottato). Non genera da solo.

**Se hydration già aveva il concept di `09-room-pt2.md`:** `CELL_OCCUPIED` — default archivia il memo come *nota di direzione* in `09:open_questions` o `production_notes`, non sovrascrive il paragrafo canon.

---

### File 2 — Suno wav (`suno_export_3b2a.wav`, 2:41, synth-pop uptempo)

**Extract:** audio, nessun tag titolo; filename inutile; bpm ~118.

**Classifier:**

- `R-EXT-AUDIO` → audio_local
- Embedding/stile vs STYLE-SUNO + “anthem” → 09 o 07, Δ stretto → `needs_disambiguation`

**UI:** “Questo wav è più 09 (hit) o 07 (SOS)?” Preview dei due cassetti.

Mauro tocca **09**. Slot: `09:audio_local` (+ `audio_suno_link` se incola il link dopo).

**Offerte:**

1. Trascrivi gramelot dal wav (se c’è voce nonsense)
2. Genera `09:suno_style` *allineato al wav* (non il contrario), ancora draft
3. Non inventare lyrics dal wav se 09 lyrics empty — prima le lyrics, poi `suno_lyrics` lockate alla metrica

**Non fare:** creare una nuova traccia “Suno 3b2a”.

---

### File 3 — Scrap lyrics IT (`scrap.txt`)

```
Nessuno sa da dove viene
ma tutti la cantano stanotte
la stanza è un mondo
e il mondo balla
```

**Classifier:** `R-LYRIC-IT` + gazetteer “da dove viene” / balla → 09 `lyrics_it` 0.88.  
Runner-up: 07 (balla vs SOS) 0.51.

**Rami:**

- Scaffale vuoto, 09 lyrics empty → fill `09:lyrics_it` come **frammento**, flag `partial`. Offerta: genera `lyrics_en` che *includa* queste immagini (non le butti).
- Hydration: 09 lyrics ancora `*(da scrivere)*` → stesso.
- Se Mauro conferma su 07 per sbaglio: ok, è lui. Il linter non blocca IT scrap.

**Non fare:** tradurre in EN in silenzio e slottare EN come canon.

---

### File 4 — Midjourney PNG (`midjourney_discord_export.png`)

Visione: pista da ballo neon, radio tower in controluce, folla, niente equazione π.

**Classifier:** `09:artwork` 0.86. Runner-up 07 alt 0.61.

**Conferma:** file salvato `.desk/inbox/…` e, su confirm, path atteso `ART/09-room-pt2.png` (rename in write-back, non prima).

**Se ART/ manca in git:** cella passa `ingested` (blob nel desk) + ticket `writeback_will_add_ART`.

**Offerte:** aggiornare riga ARTWORK.md (draft); prompt “variante cover”; **non** rigenerare un altro PNG come canon.

**Se la vision fosse paradiso vs deserto:** `bonus:cassandra:artwork` + lock cut visibile. Mai `track:16`.

---

### File 5 — Nota testo: `Dadej is Jaded reverse`

**Classifier:** `R-REVERSE` → `canon:dadej` corroborate + `08:concept` + `08:production_notes`.

**Rami:**

| Contesto | Azione |
|---|---|
| Empty shelf, 08 concept seeded/empty | Conferma riempie concept con la frase + espande dallo scheletro (no gen ancora) |
| Repo già idratata (concept lungo già lì) | Corroborate lock; non overwrite. Offerta: “segna production_notes: reverse di 02” se ancora debole |
| Mauro aveva lyrics inventate su 08 (non in questa repo) | `FORBIDDEN` + “spostare quelle lyrics in archived / altra traccia” |

**Offerte dopo conferma:**

- **Non** “scrivi il testo di Dadej”
- “Genera procedure reverse” (DAW: invert 02, overlap 07)
- Se 02 `audio_local` esiste: “produci candidate reverse”
- Se 02 audio manca: “droppa Jaded wav per chiudere 08”

---

### File 6 — `Concept.odt`

**Extract:** stesso albero di `CONCEPT.md` (piani temporali, 16 tracce, 1993, Passage of Pi, Cassandra, spunti Landing, formula π).

**Classifier:** `album_cell` source document + **batch conflitti**, non un unico slot.

Proposte di split (Mauro conferma lo split):

| Frammento ODT | Slot | Ramo |
|---|---|---|
| Regola anno a 4 cifre nel titolo | `playlist_meta` | corroborate |
| 5125 = 1983 × π | lock `future_year` | corroborate |
| 1993 Into the Bore | lock `prologue_year` | **CANON_LOCK** keep 1997 |
| Jaded / Room / No Sense prose | 02/03/04 `concept` | fill se empty; else archive |
| Than Go | 06 concept (alias Then Go) | fill / archive |
| Passage of Pi come distorsione di 80s | vs lock `dadej` | **SOURCE_STALE** — non creare traccia; nota in 08 archived “idea scartata” |
| Room pt.2 anthem | 09 concept | fill se empty |
| Code Within | 10 concept | già pieno in repo → archive |
| ReNew ark | 11 concept | fill se empty |
| Distance Proof / Pi Constant *in mezzo* alla scaletta | vs lock finale+ordine | **SOURCE_STALE** |
| Fifth | 12 concept | già pieno |
| Voyage | 13 | già pieno |
| Landing + 4 spunti lirici | 14 `concept` (spunti) | **merge**: in repo gli spunti ci sono già → corroborate |
| Cassandra 3141 + spunti | `bonus:cassandra:concept` + lock cut | **non** track cell |
| Scaletta 16 righe | playlist | **non** sostituire PLAYLIST v3 |

**Default batch:** “Tieni tutti i lock v3; parcheggia ODT come `CONCEPT` storico; importa solo spunti Landing se 14 concept empty.”

**Offerte dopo:** genera 14 lyrics dagli spunti; **non** genera Cassandra; **non** rinumerare a 16.

---

### File 7 — `Looking Through the Stars.mp3`

**Classifier:** `R-NAME-LTTS` → bundle `12:audio_local` + `12:gramelot`.

**Rami:**

- Empty shelf: STT gramelot (nonsense) → Mauro conferma transcript → slot gramelot. **Offerta:** genera `12:lyrics_en` *a metrica vincolata* (stesso metodo della tabella già in `12-fifth.md`). Style: alt-rock, **non** copiare STYLE-SUNO.
- Repo idratata: lyrics 12 già promoted. `CELL_OCCUPIED` su lyrics. Default: attacca l’mp3 come `audio_local` (mancava: path esterno). Gramelot già in file → corroborate. Offerta: nessuna riscrittura lyrics.

**Non fare:** slottare su 13 Voyage solo perché “stars”.

---

### File 8 — Screenshot Slack

**OCR esempio:**

```
Alex: finale cassandra?
Mauro: no. tagliata. chiude Distance Proof dopo Landing
Mauro: frantic caller è 1997 non 1993
Maya: she chi è
Mauro: compagna sulla navicella
```

**Classifier:** `R-CASSANDRA-CUT`, `R-FINALE`, `R-YEAR-1997`, `R-SHE` → quattro **corroborate** lock, un item, split opzionale.

**Nessun overwrite.** Badge sulla barra: “confermato anche da Slack · data”.

**Se lo screenshot dicesse “rimettiamo Cassandra”:** `ProposeCanonRevision`, default keep cut.

---

### Dopo i 8 confirm — cosa lo scaffale offre di generare

Coda **esplicita** (non chat):

1. **09 lyrics_en** — vincoli: memo + scrap IT + concept 07/08/10 + `F-SPOILER-15` + wav 09 come vibe. Poi 09 lyrics_it (includere lo scrap), 09 suno_*, 09 analysis.
2. **14 lyrics_en** — spunti ODT già slottati; She = compagna; no change-the-past; no same-world (è 15).
3. **11 lyrics_en** — solo dopo che Mauro risponde o “accetta” le 3 open questions (contenuto ARK, chi lancia, tono trionfale/funebre).
4. **15 lyrics extend** — tiene outro attuale; aggiunge proof/same world; π permesso.
5. **08 production_notes** se ancora sottili; reverse da 02 se audio 02 presente.
6. **ART write-back** del PNG 09; prompts per PNG mancanti (draft).
7. **PLAYLIST** colonna testo + copy “16 tracce”.
8. **H1 drift** (se repo aperta) — non è generate, è write-back meccanico.

Vietato in questa coda: “scrivi Cassandra”, “rifai la scaletta”, “nuovo brano per il wav”.

---

## 11. Walkthrough B — generare Room Pt.2 come hit-anthem decodificata da Code Within, senza spoilerare Distance Proof

Precondizione: la maggior parte delle tracce ha `lyrics_en` ingested/promoted. In *questa* repo: 01–07, 10, 12, 13 pieni; 08 N/A; 09, 11, 14 vuoti; 15 bozza. Sufficiente per un ConstraintPack `normal` su 09.

### 11.1 Mauro apre il buco `09:lyrics_en` → `Genera questo buco`

Non parte il modello. Parte `compile_constraints`.

### 11.2 ConstraintPack (contenuto esatto da compilare)

**must_use (fatti):**

| Fonte | Fatto |
|---|---|
| Lock + PLAYLIST | 09, 1984, Atto III, *The Anthem from Nowhere* |
| STORIA / 09 concept | Hit planetaria. Tutti la amano. Origine ignota. Teorie strampalate. Non ancora SOS per il pubblico |
| Grafo | Arriva da 07 attraverso 08; 10 la decodifica |
| 07 lyrics | Hook e lessico: *Eighties SOS*, *reach*, *message*, *fading*, *lonely*, *stars* (warning overlap) |
| 08 | Non un nuovo testo: il passaggio *distorce*. 09 è la forma *ricevuta* e ballabile, non il reverse |
| 10 lyrics **già scritte** | 09 deve poter essere *il disco che 10 ascolta*. 10 afferma: *world is dancing to a song unknown*; *code within the anthem’s skin*; *help buried deep in every beat*; *Eighties SOS — spelled in the design*; *Not from the stars — from further down the line*; *Help, help, they need help*; eco *Loneliness feeds curiosity*; *Where’s the proof* |
| 03 lyrics | Specchio: 03 = *We copy* in stanza; 09 = celebrazione di massa. Non ripetere *we copy loud* |
| Memo se slottato (§10.1) | Anthem, ballano, SOS dentro, no finale |
| Scrap IT se slottato | Tenere *Nessuno sa da dove viene / tutti la cantano stanotte* |
| STYLE-SUNO | Synth-pop anthem, pre-chorus obbligatorio, V2 ≠ V1, chorus full ’80s |
| Lock π | Nessuna formula, nessun 5125 nel testo della hit |
| Lock She | She non entra in 09 (è 13–14) |
| Lock Cassandra | Assente |

**must_not:** `F-SPOILER-15`, `F-CASSANDRA`, `F-PI-EVERYWHERE`, `F-1993`, `F-16`, `F-SHE` come soggetto, rivelare 5125, rivelare navicella, rivelare Landing, usare titolo *Distance Proof*, dire “we are them” / “same world” / “discendenti”.

**Come “SOS sepolto” senza spoiler:**  
Permesso: *help*, *SOS*, *lonely*, *message*, *unknown*, *from nowhere*, ripetizioni da “coordinate” opache.  
Vietato: spiegare *chi* manda, *da quale anno*, *perché il 1984 è colpevole*.

**Codice per 10:** il testo 09 deve contenere **almeno 2 ancore decodificabili** che 10 già nomina o può pretendere di aver trovato:

1. Un loop/refrain ripetibile (“same four bars” — struttura, non necessariamente le parole)
2. Un grido tipo help/SOS mascherato da party hook
3. Opzionale: cifra o ripetizione 3/1/4 **nascosta** (sillabe / battute), senza dire π

Se il draft non ha ancore, lint warning `NO_DECODE_HOOK` — Mauro può promuovere lo stesso, ma 10 avrà `DECODES_EMPTY_HIT`.

### 11.3 UI prima del click

```
Generare: 09 · Testo EN
Vincoli: 14 must · 8 must_not · rischio normal

Questo riempie un BUCO. Non tocca 10 né 15.
Code Within resta la decodifica. Distance Proof resta il finale.

[ Genera bozza ]   [ Annulla ]
```

### 11.4 Output atteso (forma, non il testo creativo vincolante)

Draft markdown con sezioni allineate a `03-room.md` / `10-the-code-within.md`:

- `[Verse 1] [Pre-Chorus] [Chorus] [Verse 2] [Pre-Chorus] [Chorus] [Bridge] [Chorus] [Outro]`
- Tono: radio 1984, gioia, mistero
- Outro può *sfiorare* un help mascherato (così 10 “Help, help…” è eco, non anticipo di 15)
- `questions`: solo se manca un fatto (es. titolo cantato o no)

Poi, se lint ok → `09:lyrics_en = generated_draft`.

Offerte concatenate (stesso pack, non nuova invenzione):

1. Genera `09:lyrics_it` (include scrap se slottato)
2. Genera `09:suno_lyrics` + `09:suno_style` (template STYLE-SUNO, energy anthem, **no spoken** tipo Voyage)
3. Genera `09:analysis` con tabella confine vs 03, 07, 10, 15 (“10 sa, 09 no; 15 è altro piano”)

### 11.5 Cosa *non* deve uscire (test di accettazione sul draft)

Fail se compare:

- Cassandra, 3141, 1993, 5125, π, 3.14, “same world”, “we are them”, “descendants”, Landing, ARK, She, “too late”, “cannot change”, “sins” da 15
- Un verso che spiega il bore come wormhole didascalico (può esserci mistero, non lecture)

Pass se:

- Origine ignota + dancefloor
- Almeno un hook che 10 può citare
- Pre-chorus presente
- Lunghezza da hit, non da 8 righe

### 11.6 Promote

Mauro edita, [Promuovi].  
`09:lyrics_en` → `promoted`.  
PLAYLIST 09 Testo → ✅ al write-back.  
10 warning `DECODES_EMPTY_HIT` si spegne se le ancore matchano.

**Non** si tocca `15-distance-proof.md`.  
**Non** si aggiunge una riga Cassandra.

---

## 12. Write-back sulla repo markdown

### 12.1 Principio

Lo scaffale può essere avanti rispetto a git.  
Git si aggiorna solo con **Write-back session** esplicita.

```
shelf_dirty
    ▼
writeback.preview     # diff markdown + binari ART
    ▼
writeback.await_confirm
    │
    ├─ confirm → commit su branch corrente (mai main implicito; mai force)
    └─ cancel  → shelf resta dirty
```

Un promote può chiedere “includi in questa session” o “solo desk”.

### 12.2 Mapping cella → file / sezione

#### Canon docs

| Slot | File | Sezione / regola |
|---|---|---|
| lock (dopo revisione) | `RICONCILIAZIONE.md` + tabella Decisioni in `PLAYLIST.md` + `STORIA.md` | Aggiorna riga tabella, non riscrivere tutto |
| `album:storia` ingest CONCEPT | `CONCEPT.md` | Già estratto; ODT non si sovrascrive; se assente, genera md da extract |
| `style:suno_template` | `STYLE-SUNO.md` | Solo se Mauro promuove una revisione del template |
| `album:artwork_index` | `ARTWORK.md` | Righe path |
| `album:cover` / identity | `ART/cover.png`, `ART/band-dpb.png` | Binary add |
| playlist testo / copy | `PLAYLIST.md` | Celle derivate + decisioni |
| presentation | `tools/generate_presentation.py` `TRACKS[]` blurbs | Solo se Mauro spunta “aggiorna PDF source”; poi può lanciare lo script |

#### Per traccia `ALBUM/{nn}-{slug}.md`

Slug fissi (non inventare):

| id | path |
|---|---|
| 01 | `ALBUM/01-into-the-bore.md` |
| 02 | `ALBUM/02-jaded.md` |
| 03 | `ALBUM/03-room.md` |
| 04 | `ALBUM/04-no-sense.md` |
| 05 | `ALBUM/05-first-ripples.md` |
| 06 | `ALBUM/06-then-go.md` |
| 07 | `ALBUM/07-80s.md` |
| 08 | `ALBUM/08-dadej.md` |
| 09 | `ALBUM/09-room-pt2.md` |
| 10 | `ALBUM/10-the-code-within.md` |
| 11 | `ALBUM/11-renew.md` |
| 12 | `ALBUM/12-fifth.md` |
| 13 | `ALBUM/13-voyage-through-forever.md` |
| 14 | `ALBUM/14-the-landing.md` |
| 15 | `ALBUM/15-distance-proof.md` |

#### Sezioni da creare se mancano (ordine canonico del file)

```
# {id} — {Title} ({Subtitle})
**Epoca:** …
**Atto:** …
**Ruolo narrativo:** …

## Artwork
## Concetto
## Testo
## Traduzione italiana
## Analisi
## Suno — Lyrics
## Suno — Style
## Collegamenti
## Domande aperte
## Note
## Note di produzione          # se serve (07, 08, 12)
## Gramelot originale          # se serve (12)
<details> archivio </details>
```

Write-back **non** rimescola sezioni custom già presenti (`Modifiche dal gramelot`, `Cosa manca`, `Versione rock`). Le lascia. Inserisce solo sezioni canoniche mancanti in fondo, prima dei `<details>`.

| TrackCell | Heading |
|---|---|
| header | H1 + tre bold. **Corregge drift** se il gruppo Drift è in session |
| artwork | `## Artwork` + `![](../ART/…)` + add binario |
| concept | `## Concetto` |
| lyrics_en | `## Testo` o `## Testo (bozza attuale)` se 15 ancora partial |
| lyrics_it | `## Traduzione italiana` |
| analysis | `## Analisi` |
| suno_lyrics | `## Suno — Lyrics` |
| suno_style | `## Suno — Style` |
| links | `## Collegamenti` (numeri **v3**) |
| open_questions | `## Domande aperte` |
| production_notes | `## Note di produzione` o `## Note tecniche` (08) |
| gramelot | `## Gramelot originale *(archivio)*` |
| archived | `<details>` append |
| sample | `## Riferimenti audio` (01) |
| audio_* | `## Note` path relativo `.desk/` o `AUDIO/` se si decide di versionare; **non** path `/Users/mauroandreoni/…` |

### 12.3 Collegamenti — riscrittura drift

Se la session include `DRIFT-*`, i link interni si riscrivono con il grafo v3:

| File oggi (stale) | Collegamenti target v3 |
|---|---|
| 08 Dadej | ← 02 Jaded · ← 07 80s · → 09 Room Pt.2 |
| 11 ReNew | ← 08 / 10 · → 12 Fifth (ARK). Destinazione **1983**, non 1984 |
| 15 Distance Proof | ← 01 proof · ← 10 · ← 14. Atto = FINALE, H1 = 15 |
| 07 80s | H1 = 07; → 08 Dadej |
| 01 | → 15 (non “09 Distance Proof”) |

### 12.4 Formato commit

Un commit per session (non per cella), messaggio:

```
desk: <scope> <verb> — <short>

# esempi
desk: 09 lyrics promote — Room Pt.2 anthem draft d2
desk: album drift — H1/collegamenti v3 (08, 11, 15, 07, 01)
desk: 12 audio ingest — Looking Through the Stars.mp3
desk: 09 artwork ingest — ART/09-room-pt2.png
desk: playlist sync — 10/12 ✅, 09 ✅, copy 15 tracce
```

Regole git:

- Branch di lavoro, mai push `--force`
- Mai commit di `.desk/inbox/` raw blob **se** l’asset è già in `ART/` o `AUDIO/` (i raw restano locali)
- `.desk/drafts/` e `.desk/events.jsonl` sono **gitignored** di default; Mauro può spuntare “includi desk state” (sconsigliato)
- `ART/*.png` sì, se promote artwork
- Audio pesanti: default `AUDIO/` gitignored + pointer path relativo; opt-in “versiona wav”

`.gitignore` suggerito (write-back può aggiungerlo se assente):

```
.desk/inbox/
.desk/drafts/
.desk/events.jsonl
AUDIO/
*.mp3
*.wav
```

Eccezione: se Mauro forza “committa Looking Through the Stars”, path `AUDIO/12-looking-through-the-stars.mp3` e togliere da ignore per quel file (`!AUDIO/12-…`).

### 12.5 Preview (`writeback.preview`)

Diff unificato, raggruppato:

1. **Canon lock / PLAYLIST decisioni** (rosso se tocca lock — richiede `ProposeCanonRevision` già chiusa)
2. **Drift H1 + Collegamenti**
3. **Sezioni nuove** (lyrics 09, ecc.)
4. **`<details>` archivio** aggiunti
5. **Binari ART** (lista filename + thumbnail)
6. **PLAYLIST colonna Testo**
7. **`generate_presentation.py` TRACKS** se spuntato

Ogni hunk ha checkbox. Uncheck = resta dirty nello shelf, fuori da questo commit.

Banner se un hunk proverebbe a:

- Cancellare lyrics ingested
- Scrivere Cassandra in `PLAYLIST` tracklist
- Cambiare 1997
- Rimuovere 15 come finale

→ hunk bloccato, non committabile.

### 12.6 Promozione 09 — esempio di file risultante

`ALBUM/09-room-pt2.md` dopo promote+write-back lyrics EN+IT+Suno (artwork già slottato):

```
# 09 — Room Pt.2 (The Anthem from Nowhere)

**Epoca:** 1984
**Atto:** III
**Ruolo narrativo:** La risposta del 5125 diventa hit planetaria. Nessuno sa da dove venga.

## Artwork
![Room Pt.2 — The Anthem from Nowhere](../ART/09-room-pt2.png)

## Concetto
… (ingested, invariato se non in session)

## Testo
… (promosso)

## Traduzione italiana
… (promosso)

## Suno — Lyrics
…

## Suno — Style
…

## Collegamenti
- **←** 07 80s · 08 Dadej
- **→** 10 The Code Within

## Analisi
… (se in session)
```

Niente H1 `09 — Distance Proof`. Niente atto Finale.

### 12.7 Cosa il write-back **non** fa

| Vietato | Invece |
|---|---|
| Riscrivere tutto `CONCEPT.md` da uno scaffold 15-tracce | CONCEPT resta sorgente storica |
| Creare `ALBUM/16-cassandra.md` | Solo `bonus` in ARTWORK se PNG slottato |
| Aggiornare PLAYLIST tracklist a 16 | — |
| Cancellare `*(da scrivere)*` senza contenuto promoted | — |
| Silent-fix di `Than Go` / 1993 dentro CONCEPT | Nota in RICONCILIAZIONE se Mauro lo chiede |
| Lanciare Suno o Midjourney da soli | Prompt in cella; Mauro esporta e re-ingesta |
| `git add -A` cieco | Solo path della session |

### 12.8 PDF presentazione

Dopo write-back di concept/lyrics title:

- Se spuntato: aggiorna stringhe in `TRACKS` di `tools/generate_presentation.py` (campo blurb = `concept` excerpt)
- Non committare `The-Distance-Presentazione.pdf` a meno che Mauro non lanci lo script e confermi il binario
- Lo script oggi punta a font macOS; fail sul Desk Linux → ticket `PRES_FONT`, non blocca lyrics write-back

---

## 13. Superficie implementabile (v1)

### 13.1 Stack suggerito (non vincolante, ma chiuso)

| Layer | Scelta v1 |
|---|---|
| Runtime | App locale (Electron o Tauri) sulla repo |
| Shelf store | `.desk/shelf.json` + eventi append-only |
| Git | `isomorphic-git` o git CLI |
| Extract | `pandoc` (odt), `whisper` STT, Tesseract/Vision OCR, `ffprobe` |
| Model | un endpoint chat-completions JSON-mode; **due** system prompt fissi: Classifier vs GapFiller |
| UI | Scaffale atti + Inbox + Matrice + Preview diff |

Niente backend multi-tenant. Un album. Un utente (Mauro).

### 13.2 `.desk/config.json`

```json
{
  "album_id": "the-distance",
  "numbering_authority": "playlist_v3",
  "thresholds": { "T_HIGH": 0.82, "T_LOW": 0.45, "delta": 0.08 },
  "artwork_required_for_ready": true,
  "audio_in_git": false,
  "desk_state_in_git": false,
  "language_ui": "it",
  "lyrics_policy": { "08": "reverse_only" },
  "low_constraint_requires_ack": true
}
```

### 13.3 Eventi (minimo)

`app.first_run`, `repo.hydrate.propose`, `repo.hydrate.apply`, `inbox.receive`, `inbox.propose`, `slot.confirm`, `slot.park`, `conflict.open`, `conflict.resolve`, `canon.revise.propose`, `canon.revise.apply`, `gen.pack`, `gen.draft`, `gen.lint_fail`, `gen.promote`, `writeback.preview`, `writeback.commit`.

### 13.4 Test di accettazione (obbligatori)

| id | Dato | Atteso |
|---|---|---|
| T-FR-1 | First launch, no repo | Scaffale 15 cassetti etichettati, 0 chat, lock visibili |
| T-FR-2 | Nessun bottone “genera album” | Assente |
| T-HY-1 | Apri *questa* repo | Ticket drift 15/08/11/07; stale PLAYLIST 10 e 12; 09/11/14 hole; ART missing |
| T-HY-2 | File 15 H1 = 09 | Slot = 15, mai 09 |
| T-IN-1 | Drop senza confirm | `shelf.json` invariato |
| T-CL-1 | Testo “Dadej is Jaded reverse” | Nessuna proposal `08:lyrics_en` fill |
| T-CL-2 | CONCEPT 1993 | Conflict keep 1997 |
| T-CL-3 | Immagine Cassandra paradiso/deserto | `bonus:cassandra`, non track |
| T-CL-4 | Looking Through the Stars.mp3 | Bundle 12 gramelot+audio |
| T-GN-1 | Genera 09 con pack B | Lint fail se “we are them” / 5125 / π / Cassandra |
| T-GN-2 | Genera 08 lyrics | `blocked_forbidden` F-DADEJ-LYRICS |
| T-GN-3 | Genera 16ª / Cassandra album | Impossibile scegliere target |
| T-GN-4 | Genera 15 | Bozza attuale conservata come outro; π permesso |
| T-GN-5 | Cella ingested | Generate disabilitata (solo revisione) |
| T-CF-1 | Drop lyrics nuove su 02 pieno | Default archive, no overwrite |
| T-WB-1 | Promote 09 senza write-back | md invariato, shelf promoted |
| T-WB-2 | Write-back 09 | File 09 aggiornato; 15 non toccato |
| T-WB-3 | Session drift | H1 15 = `# 15 — Distance Proof` |

### 13.5 Ordine di implementazione (loop, non features extra)

1. Skeleton + scaffale UI + lock bar (niente AI)
2. Inbox drop/paste + ConfirmSlot (slot manuale)
3. Hydration parser + ticket list di *questa* repo
4. Classifier regole (gazetteer) ; modello solo se rules deboli
5. Completeness matrix
6. Constraint compiler + linter + generate lyrics su empty
7. ConflictReview + no silent overwrite
8. Versioning draft/promote
9. Write-back preview + commit
10. Canali restanti: STT, OCR Slack, Suno URL, ODT

Finché 1–3 non esistono, non si apre una chat.

---

## 14. Riepilogo stati (quick ref)

### InboxItem.state

`received → extracting → classifying → proposed → awaiting_confirm | needs_disambiguation | conflict_review | uncertain_park_suggested → slotted | parked | rejected`

### Cell.state

`empty | seeded | ingested | generated_draft | promoted | na_reverse | na_not_applicable | conflict`

### app.lifecycle

`uninitialized → first_run_chooser → empty_shelf_seeded | hydrating_from_repo → ready`

### GenerationJob.state

`requested → compile_constraints → await_human_start | blocked_* | wait_ack_risk → running → draft_ready → promote | regenerate | discard`

### AlbumReadiness

`shelf_empty → ingest_phase → closing_gaps → album_ready` (o `blocked`)

---

## 15. Copy UI essenziale (IT)

| Dove | Stringa |
|---|---|
| First run | *Lo scaffale c’è già. I quindici cassetti anche. Inserisci quello che hai. Poi chiudiamo i buchi.* |
| Inbox | *Niente si scrive nel canon da solo.* |
| Buco | *BUCO* |
| Draft | *BOZZA — non è nel git* |
| Conferma | *Conferma e riempi* |
| Occupata | *Non sostituire. Nuova versione o archivio.* |
| Lock | *Decisione bloccata. Per cambiarla: proponi revisione.* |
| Generate 09 | *Code Within resta la decodifica. Distance Proof resta il finale.* |
| Dadej | *Nessun testo originale. Reverse di Jaded.* |
| Write-back | *Anteprima commit. Scegli i hunk.* |
| Low constraint | *Pochi materiali slottati. Generare è rischioso.* |

---

*Fine spec CORE loop v1. Qualsiasi feature (chat repo, multi-album, auto-Suno publish, 16ª traccia) è fuori dal loop e non va nel first-run.*
