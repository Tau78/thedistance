# The Distance Desk — piano completo

> Banco di produzione per **The Distance** (Distance Proof Band).  
> Un album incompleto entra a pezzi. La app lo incasella. Tu e le AI chiudete i buchi, senza inventare un altro album.
>
> Dettaglio esecutivo del loop (stati, rami, walkthrough, mapping file): [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md).

---

## 0. Cosa è, e cosa non è

Questa app esiste perché il repo `thedistance` **non è un sistema generico**. È il tavolo di lavoro di *un* concept album: quindici tracce, due epoche, un buco nero, π come moltiplicatore, le canzoni come linguaggio.

L’aiuto ricevuto dall’apertura del repo a oggi è stato questo, in pratica:

1. prendere pezzi disordinati (ODT, testi, idee, file audio, artwork, decisioni di sessione);
2. **incasellarli** in una struttura (playlist, atti, epoche, file per traccia, canone);
3. vedere cosa manca;
4. scrivere o riscrivere testi, analisi, prompt Suno, traduzioni, presentazioni;
5. tenere la coerenza (niente Cassandra come finale, Dadej = Jaded reverse, 1997 non 1993, She è compagna di viaggio, Distance Proof chiude).

L’app deve fare **esattamente questo**, tutti i giorni, senza dover riaprire una chat da zero e rispiegare l’album.

**È**

- uno **scaffale** fisso sagomato su *The Distance*;
- una **inbox** dove butti ciò che hai già (testo, audio, immagini, note, link Suno, dump Slack);
- un **incasellatore** che propone dove va ogni pezzo;
- un **generatore di buchi** vincolato al materiale approvato;
- un **write-back** verso i markdown del repo, così Cursor e la app restano allineati.

**Non è**

- uno studio AI “crea un album da un prompt”;
- un CMS multi-progetto;
- una chat libera che può cambiare il finale;
- un wrapper non ufficiale di Suno che viola i ToS.

---

## 1. Il loop (il prodotto)

```
  ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
  │  1. INBOX   │────►│ 2. PROPOSTA  │────►│ 3. CONFERMA │
  │  inserisci  │     │  di casella  │     │  umana      │
  └─────────────┘     └──────────────┘     └──────┬──────┘
                                                   │
                                                   ▼
  ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
  │ 6. REPO MD  │◄────│ 5. APPROVA   │◄────│ 4. SCAFFALE │
  │  write-back │     │  o scarta    │     │  vedi buchi │
  └─────────────┘     └──────────────┘     └──────┬──────┘
                                                   │
                                                   ▼
                                          ┌─────────────┐
                                          │  GENERA     │
                                          │  solo buchi │
                                          └─────────────┘
```

Regole non negoziabili:

1. **Niente sovrascrittura silenziosa.** Un pezzo nuovo non rimpiazza una cella `approved`/`locked` senza conflitto visibile e scelta umana.
2. **La generazione legge solo canone locked + celle approved + la cella target.** Non “tutto il web” e non “fantasia sul 3141”.
3. **Dadej non ha testo originale.** La cella lyrics è `not_applicable`.
4. **Cassandra è tagliata.** Può esistere solo come bonus/archivio, mai come traccia 16 in playlist.
5. **Ogni bozza AI è una versione**, non la verità, finché non approvi.

---

## 2. Perché lo scaffale è questo album (non un template vuoto)

All’avvio l’app **non chiede “quante tracce vuoi?”**. Mostra già lo scheletro v3:

| # | Anno | Titolo | Atto | Note di casella |
|---|---|---|---|---|
| 01 | 1997 | Into the Bore (The Frantic Caller) | Prologo | Sample reale obbligatorio |
| 02 | 5125 | Jaded | I | Fonte di Dadej |
| 03 | 5125 | Room Pt.1 | I | Ascolto, *we copy* |
| 04 | 5125 | No Sense | I | Tesi: canzoni = linguaggio |
| 05 | 1983 | First Ripples | II | Quiet, no spoken anthem |
| 06 | 5125 | Then Go | II | Decisione, π sottile |
| 07 | 1984 | 80s (Eighties SOS) | III | Videomessaggio / SOS |
| 08 | — | Dadej | III | Reverse di 02, no lyrics |
| 09 | 1984 | Room Pt.2 | III | Hit; testo ancora vuoto |
| 10 | 1984 | The Code Within | III | Decodifica della hit |
| 11 | 5125 | ReNew | IV | ARK; testo vuoto; file oggi contraddice il canone |
| 12 | 5125 | Fifth | IV | Rock, non synth-pop bible |
| 13 | BH01 | Voyage Through Forever | IV | Narratore + She |
| 14 | 1983 | The Landing | IV | Testo vuoto; non cambia il passato |
| 15 | 1984 | Distance Proof | Finale | Bozza intima; manca la rivelazione |

Primo avvio, due porte:

- **Importa il repo** — parser markdown → inbox piena di proposte già classificate → tu confermi a lotti.
- **Scaffale vuoto** — stesse caselle, tutte `empty`. Inserisci i pezzi nei giorni. Lo scheletro resta.

Non si possono aggiungere “traccia 16” senza una **decisione di canone** esplicita (stato `proposed`, non locked). Il default è: no.

---

## 3. Cosa si può inserire (Inbox)

Ogni oggetto che entra diventa un `InboxItem`. Non deve essere pulito.

| Tipo | Esempi reali di questo lavoro | Come si estrae |
|---|---|---|
| Testo incollato | Strofa in inglese, nota “Dadej è Jaded al contrario” | Testo raw |
| Markdown / repo | `ALBUM/*.md`, `STORIA.md` | Parser per sezioni (`## Testo`, `## Suno — Style`…) |
| ODT / RTF / DOC | `Concept.odt`, bozze originali | Conversione → testo + heading |
| Audio | `Looking Through the Stars.mp3`, take Suno, voice memo | Whisper/ElevenLabs STT + fingerprint durata |
| Immagine | cover, track art, screenshot Slack | Vision classifier + hash |
| URL | YouTube Frantic Caller, pagina Art Bell, link Suno | Fetch titolo/meta |
| PDF | presentazione già fatta | Testo + pagine come immagini |
| Dump chat | Slack, WhatsApp, mail | Split messaggi, classifica decisioni vs testi |

UI Inbox (desktop):

- drop zone a tutta pagina in alto: “Butta qui quello che hai”;
- sotto, coda a card: file, estratto, stato (`received` → `classifying` → `proposed` / `conflict` / `needs_human`);
- a destra, anteprima + **proposte di casella** con confidenza.

UI Inbox (mobile):

- bottone `+` fisso: foto, file, incolla, nota vocale;
- ogni card è uno swipe: accetta proposta principale / dopo / scarta.

---

## 4. Incasellamento (il classificatore)

Il classificatore **non scrive canone**. Propone uno o più `SlotTarget`.

### 4.1 Regole deterministiche (prima dell’AI)

Eseguite sempre, anche offline:

1. Nome file `10-the-code-within.md` → traccia 10, parse sezioni.
2. Nome `07-80s.png` / `07-80s-alt-v1.png` → artwork traccia 07 (variante se `alt`).
3. Testo contiene `[Verse` / `[Chorus` / `[Pre-Chorus` → `lyrics_en` o `suno_lyrics`.
4. Testo inizia con “This track opens in a moody '80s” → `suno_style` album o traccia.
5. Frasi “Dadej”, “Jaded al contrario”, “reverse” → decisione `dadej` + cella 08.
6. “Cassandra” → archivio bonus, **non** playlist.
7. “1993” + Into the Bore → conflitto con decisione locked `year-prologue` = 1997.
8. Durata ~4:20 + gramelot “looking through the stars” → Fifth, archive + eventuale audio_take.
9. Hash identico a un item già accepted → duplicato, non nuova cella.

### 4.2 Passaggio AI (structured output)

Modello economico con JSON schema stretto (`classifier`: Gemini Flash o GPT mini).

Schema proposta:

```json
{
  "targets": [
    {
      "scope": "track",
      "trackId": "09-room-pt2",
      "cell": "lyrics_en",
      "confidence": 0.86,
      "reasons": ["hit / anthem / 1984 / nobody knows"],
      "warnings": []
    }
  ],
  "needsHuman": false,
  "conflicts": []
}
```

Se `confidence < 0.72` oppure più target sopra 0.6 → `needs_human`.  
Se tocca una cella `approved`/`locked` → `conflict`, mai accept automatico.

### 4.3 Conferma umana

Tre azioni per ogni proposta:

- **Incasella** — crea `ItemVersion` origin=`imported`, cella → `slotted` o `draft` se incompleta.
- **Incasella come archivio** — va in `archive` della traccia (bozze ODT, gramelot, rock Room).
- **Non è di quest’album** — `rejected`. Non si crea un secondo album.

Conferma a lotto: “Accetta tutte le proposte > 0.9 che non toccano celle locked”.

---

## 5. Lo scaffale (modello mentale e dati)

Una traccia è una **riga**. Le **colonne** sono le celle. L’album ha anche una riga-album.

### 5.1 Celle per traccia

| Cella | “Fatto” significa | Generabile? |
|---|---|---|
| `meta` | numero, anno, atto, ruolo, voci | no (solo lint / proposta di fix) |
| `concept` | 1–3 paragrafi allineati a STORIA | sì, se vuota |
| `lyrics_en` | testo cantabile completo, tag sezioni | sì |
| `lyrics_it` | traduzione fedele, non cantabile-forzata | sì, dopo EN approved |
| `analysis` | cosa funziona / da tenere d’occhio / bookend / confini | sì, dopo lyrics |
| `suno_lyrics` | lyrics con tag Suno, `(melodic)`, pre-chorus | sì, dopo lyrics |
| `suno_style` | paragrafo + tags; varianti STYLE-SUNO | sì |
| `artwork` | file approved + didascalia | brief sì; immagine sì, con approve |
| `audio_take` | take ascoltato e scelto | pack Suno sì; API ufficiali sì |
| `links` | grafi verso altre tracce | lint può proporre |
| `open_questions` | domande chiuse o accettate | AI può *elencare*, non decidere |
| `sample_ref` | solo dove serve (01) | ricerca, non invenzione |
| `archive` | bozze, gramelot | mai generate come canone |

### 5.2 Celle album

`concept_source`, `storia`, `playlist`, `decisions`, `style_bible`, `cover`, `band_identity`, `presentation`, `signal_map`.

### 5.3 Stati cella

`empty → partial → draft → slotted → generated → approved → locked`

- `not_applicable` è un terminale (Dadej lyrics).
- `locked` richiede decisione di canone o “congela questa cella”.
- Progresso album = media pesata: lyrics_en e audio_take pesano più di analysis.

Formula cockpit:

```
trackScore = Σ weight(cell) * score(status) / Σ weight
albumScore = media(trackScore) * 0.85 + decisionLockRatio * 0.15
```

Pesi default: lyrics_en 5, audio 5, concept 3, suno_style 3, suno_lyrics 2, lyrics_it 2, artwork 2, analysis 2, resto 1.

### 5.4 Entità

Vedi [`schema.ts`](schema.ts). Relazioni chiave:

- `Track` 1—N `Cell` 1—N `ItemVersion`
- `InboxItem` N—1 `SlotTarget`
- `CanonDecision` blocca comportamenti del producer
- `TrackLink` + `SignalDirection` alimentano la mappa
- `Contradiction` è il linter
- `GenerationJob` è l’unità di lavoro AI

Personaggi fissi: Frantic Caller, Narratore (I), She, cori 5125, cori 1984.  
Simboli fissi: π, Bore, canzone-linguaggio, Room, ARK.

---

## 6. Stack

Scelta per un solo utente (Mauro), mobile + desktop, repo git come verità, job lunghi (audio/immagini).

| Strato | Scelta | Perché |
|---|---|---|
| App | **Next.js 15** App Router, TypeScript | UI ricca, API route, mobile web |
| UI | Tailwind + componenti propri (non shadcn grezzo “SaaS”) | Estetica control-room / synthwave già in `generate_presentation.py` |
| Stato server | **tRPC** + React Query | Contratti uguali a `schema.ts` |
| DB | **Postgres** (Docker) + Drizzle | Versioning, job, full text |
| File | S3-compatibile (MinIO in locale, R2/S3 in host) | wav, png, odt |
| Code | **BullMQ** + Redis | classificazione, STT, immagini, audio |
| Auth | singolo utente, passkey + session cookie | non è un prodotto multi-tenant |
| Sync git | `simple-git` sul clone locale / GitHub App | write-back `ALBUM/*.md` |
| Host | VPS Docker Compose **oppure** solo locale | le chiavi API restano tue |
| Mobile | PWA (installabile) | oggi il lavoro arriva anche da telefono |

Non Electron al v1: la PWA + cartella `/data` sul server bastano. Electron solo se serve filesystem locale senza server.

### 6.1 Repo come source of truth

Mapping write-back (stesso ordine sezioni dei file migliori: 10, 05, 13):

```
# {nn} — {Title}
**Epoca:** …
**Atto:** …
**Ruolo narrativo:** …
## Artwork
## Concetto
## Testo
## Traduzione italiana
## Suno — Lyrics        # se esiste
## Suno — Style         # se esiste
## Analisi              # se esiste
## Collegamenti
## Note
## Versione archiviata  # details/summary
```

Un job `exportMarkdown` riscrive solo celle `approved`/`locked`. Le `generated` restano in DB finché non approvi.

Import inverso: watcher o bottone “Rileggi repo”. Se il markdown è cambiato in Cursor, entra in inbox come `git_repo` e produce diff per cella.

---

## 7. AI coinvolte — ruoli, non “un chatbot”

Ogni chiamata ha: **ruolo**, **modello**, **context pack**, **schema output**, **gate di approvazione**.

### 7.1 Context pack (iniettato sempre)

Costruito dal Canon Steward, massimo ~8–12k token, mai “tutto il repo a caso”:

1. Decisioni `locked` (lista corta).
2. Mappa segnali + atti.
3. Meta della traccia target.
4. Celle `approved` della traccia target.
5. Celle `approved` delle tracce *collegate* (link), in forma compressa (ruolo + 8 righe max di testo).
6. Regole speciali della traccia (`specialRules`).
7. STYLE-SUNO solo se il job è style/lyrics-suno.
8. Elenco di **divieti** (Cassandra finale, 1993, testo su Dadej, π in ogni strofa, spoiler Distance Proof se la target è 09).

### 7.2 Roster

| Ruolo | Compito | Modello consigliato | API ufficiale |
|---|---|---|---|
| **Classifier** | Inbox → slot | Gemini Flash / GPT mini | Google / OpenAI structured outputs |
| **Canon Steward** | pack + vieto + “questa generazione rompe il canone?” | Claude Sonnet/Opus | Anthropic |
| **Lyricist** | buchi `lyrics_en` | Claude; alternativa GPT; Grok come seconda voce | Anthropic / OpenAI / xAI |
| **Translator** | `lyrics_it` | Claude o GPT | idem |
| **Analyst** | analysis, bookend, confini | Claude | Anthropic |
| **Suno Engineer** | `suno_lyrics` + `suno_style` da STYLE-SUNO | Claude | Anthropic |
| **Continuity Editor** | linter contraddizioni | Claude | Anthropic |
| **Art Director** | brief immagine coerente a `ARTWORK.md` | Claude + poi immagine | Anthropic + BFL/OpenAI |
| **Researcher** | Frantic Caller, radio ’80, fonti | Gemini (search) o GPT+browse | Google / OpenAI |
| **Producer** | sceglie quale buco attaccare e in che ordine | Claude piccolo o regole | — |
| **STT** | voice memo, gramelot | Whisper o ElevenLabs STT | OpenAI / ElevenLabs |
| **Image** | cover/track art | Flux 2 (BFL) o `gpt-image-2` | [api.bfl.ai](https://docs.bfl.ai) / [OpenAI Images](https://developers.openai.com/api/docs/guides/image-generation) |
| **Audio ufficiale** | bozza ascoltabile, spoken, SFX radio | ElevenLabs Music + TTS; Stable Audio 3 | [ElevenLabs Music](https://elevenlabs.io/docs/api-reference/music/compose) / [Stability Audio](https://platform.stability.ai/docs/api-reference) |

### 7.3 Suno — come si usa davvero

A agosto 2026 **Suno non ha API pubblica self-serve**. Sta esplorando un programma partner ([Music Business Worldwide, 1 luglio 2026](https://www.musicbusinessworldwide.com/suno-explores-developer-api-seeking-apps-that-unlock-experiences-generative-music-makes-possible-for-the-first-time/)).

Quindi v1:

1. L’app genera il **Suno Export Pack** (Lyrics taggate + Style + Exclude Styles + note anti-monotonia).
2. Bottone **Copia** e, se possibile, deep link/manuale verso Suno.
3. Tu carichi il wav/mp3 risultante in Inbox → casella `audio_take`.
4. Nessun wrapper cookie (`gcui-art/suno-api` e cloni): fuori scope, ToS, fragile.

Quando (se) arriva l’API ufficiale, il Producer sostituisce il pack con un job `audio_official` `provider=suno`.

### 7.4 Cosa resta sempre umano

- Lock delle decisioni di canone.
- Approvazione testi e take audio.
- Scelta “intimo vs esplicito” su Distance Proof (π, same world).
- Pubblicazione, DistroKid, YouTube, pitch a terzi.
- Sample Frantic Caller (diritti / fair use): la app **linka** le fonti, non riedita l’audio copyrighted al posto tuo.

---

## 8. UI — design system

Palette già usata nella presentazione:

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0A0E17` | fondo |
| `bg-card` | `#121826` | card / cella |
| `text` | `#E8ECF4` | primario |
| `muted` | `#8892A0` | meta, anni |
| `cyan` | `#00D4FF` | 5125, segnali, CTA |
| `magenta` | `#FF006E` | 1983/84, SOS |
| `gold` | `#FFC850` | π, locked, finale |

Tipo: un sans geometrico per UI (es. Geist), un mono per anni e numeri (`1997`, `5125`, `3.14`). π compare come segno piccolo, non come wallpaper.

Chrome persistente:

- **Sinistra (desktop):** nav — Inbox (badge), Scaffale, Canone, Stile, Artwork, Ricerca, Linter, Presentazione, Impostazioni.
- **Alto:** traccia corrente · atto · `CANON LOCK` (verde se 9 decisioni locked, ambra se c’è `proposed`) · avanzamento album %.
- **Destra (contesto):** pack compatto della traccia aperta + link + divieti.
- **Mobile:** tab Inbox / Scaffale / Genera / Canone; il resto nel menu.

Ogni schermata deve far sentire **questo** album: prefissi a 4 cifre, split 5125/1983, mappa del bore, mai dashboard “Projects / New Album”.

---

## 9. Pagine

### 9.1 Inbox — `/inbox`

Scopo: unico ingresso del materiale grezzo.

Layout desktop 2 colonne (lista | dettaglio). Stati:

- vuoto: drop zone + “Importa repo GitHub `Tau78/thedistance`”;
- classifying: skeleton + “Sto ascoltando / leggendo”;
- proposed: casella suggerita in cyan, alternative in muted;
- conflict: banner oro “Questa nota dice 1993, il canone locked dice 1997”;
- accepted: sparisce dalla coda, compare un toast con link alla cella.

Azioni AI: solo Classifier. Nessuna riscrittura da qui.

### 9.2 Scaffale / Cockpit — `/`

Scopo: vedere i buchi.

- In alto: **mappa segnali** (1983 → 5125 → 1984, navicella → Landing, taglio a Distance Proof). Nodi cliccabili = tracce. Colore = score.
- Sotto: **griglia 15 × celle**. Cella vuota = bordo tratteggiato; generated = pulse cyan; conflict = oro; locked = lucchetto gold.
- Filtro: “solo buchi generabili”, “solo conflitti”, “solo Atto III”.
- CTA primaria contestuale: se la riga 09 è vuota in lyrics → “Scrivi Room Pt.2 dal canone”.

Mobile: mappa in alto, poi lista tracce a card (progress ring + prossimi 2 buchi).

### 9.3 Traccia — `/tracks/09-room-pt2`

Il cuore. Layout 3 bande:

1. **Testata:** `09 · 1984 · Room Pt.2` · atto · ruolo · artwork thumb.
2. **Colonna caselle** (accordion, una aperta): testo / traduzione / analisi / Suno / audio / domande.
3. **Dock genera:** “Riempi questa cella” / “Riempi i buchi della traccia in ordine”.

Per ogni cella:

- se `empty`: empty state con *perché serve* (es. “Code Within decodifica questa hit: senza testo, 10 poggia sul vuoto”);
- se `draft`/`generated`: diff vs versione precedente, play se audio, **Approva / Rigenera / Modifica**;
- se `approved`: read-only + “Sblocca per revisionare”.

Dadej: le tab Lyrics sono disabilitate, copy: “Nessun testo originale — collega il take reverse di Jaded”.

### 9.4 Canone — `/canon`

Tabella decisioni (da `RICONCILIAZIONE.md` + `LOCKED_DECISIONS`).  
Timeline: proposta → locked → superseded.  
Non si “chatta” il canone: si apre una **mozione** (“Voglio riammettere Cassandra come ghost track”). Il Steward elenca impatti (playlist, presentation, artwork bonus). Tu locki o rifiuti.

### 9.5 Style Lab — `/style`

Editor del template `STYLE-SUNO.md` (cella album `style_bible`).  
Pannello anti-monotonia (tabella problema → fix style → fix lyrics).  
Varianti per traccia (Voyage spoken, Ripples quiet, Fifth rock override).  
Preview: “Se genero Suno Style per 09, il pack userà *questo* + override hit/anthem, exclude rap”.

### 9.6 Artwork — `/art`

Muro come `ARTWORK.md`. Slot cover, band-dpb, 01–15, bonus Cassandra.  
Drop = inbox pre-slotata su quella tile.  
Genera brief (Art Director) poi immagine (Flux / GPT Image).  
Due estetiche già canoniche: cinematic sci-fi vs synthwave/neon. La tile 07 è marcata **primaria**.

### 9.7 Ricerca — `/research`

Schede fisse, non “Google interno”:

- Frantic Caller / Art Bell 11 set 1997 (link già in traccia 01);
- Radio e hit 1983–84;
- π come moltiplicatore (1983 × 3,14);
- Campionamenti radio (fair use / archivi).

Il Researcher può riassumere una fonte che **tu** hai incollato o un URL. Non inventa citazioni.

### 9.8 Linter — `/lint`

Lista `Contradiction`. Esempi già veri nel repo:

| Codice | Cosa |
|---|---|
| `NUM_DRIFT` | File `07-80s.md` si intitola “# 06”; Dadej è “# 07”; Distance Proof file “# 09” |
| `RENEW_DEST` | ReNew file: navicella verso **1984** / Atto III; STORIA/PLAYLIST: verso **1983** / Atto IV |
| `LINK_STALE` | Into the Bore collega a “09 Distance Proof” invece di 15 |
| `PLAYLIST_STALE` | PLAYLIST marca Code Within ❌ ma il file ha testo completo |
| `ART_MISSING` | path `ART/*.png` referenziati, cartella assente in git |
| `DP_SHORT` | Distance Proof troppo corto per chiudere; manca *proof* / same world |
| `PI_OVERUSE` | Then Go nomina 3.14 in chiaro mentre decisione π = sottile |

Stati: open / accepted_exception / resolved.  
`block` impedisce export presentazione e write-back “canon clean”.

### 9.9 Genera — `/generate`

Coda job. Non è una chat. È una **lista di buchi** che il Producer ordina:

1. conflitti block;
2. lyrics vuote che bloccano altre tracce (09 prima di rifinire 10 è già ok; 11 domande aperte prima del testo);
3. Distance Proof dopo che 14 ha almeno una bozza, perché il bookend e il montaggio 14→15;

Ogni job mostra: ruolo, modello, pack (espandibile), costo stimato, output.

### 9.10 Sessione — `/session`

Qui si replica “l’aiuto da allora a oggi”, ma **legata allo scaffale**:

- @-mention di celle (`@09.lyrics`, `@decision.finale`);
- comandi slash: `/analizza 07`, `/pack-suno 05`, `/conflitti`;
- se chiedi “e se il finale fosse Cassandra?”, il Steward risponde con impatto e **non** riscrive la playlist.

Tre colonne su desktop: chat | celle toccate | job lanciati.  
Mobile: chat + bottom sheet contesto.

Modelli selezionabili per messaggio, default dal ruolo.

### 9.11 Presentazione — `/present`

Riscrittura viva di `tools/generate_presentation.py`: slide A4 landscape, stessi colori.  
Sorgente = celle approved. Se 09 lyrics empty, la slide 09 usa solo concept e marca “TESTO MANCANTE”.  
Export PDF / PNG. Nessuna slide 16 Cassandra nel deck canon (bonus a parte).

### 9.12 Impostazioni — `/settings`

Chiavi: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `XAI_API_KEY`, `ELEVENLABS_API_KEY`, `BFL_API_KEY`, `STABILITY_API_KEY`, `GITHUB_TOKEN`.  
Default model per ruolo. Lingua UI: italiano. Testi canzone: inglese.  
Git: remote, branch di write-back (`cursor/desk-sync-…`).  
Mai loggare i secret.

---

## 10. Agenti software — input, tool, output, gate

| Agente | Quando | Tool | Output | Gate |
|---|---|---|---|---|
| Classifier | ogni inbox item | parse file, STT, vision, LLM schema | `SlotProposal[]` | umano se conflict/low conf |
| Canon Steward | prima di ogni generate | legge decisioni + linter | `contextPack` o `refuse` | refuse è visibile |
| Lyricist | cella lyrics empty/draft | pack, dizionario bookend | `ItemVersion` | review obbligatoria |
| Translator | lyrics_en approved | testo EN | lyrics_it | review |
| Analyst | lyrics approved | pack + confini tracce vicine | analysis table | review |
| Suno Engineer | lyrics approved | STYLE-SUNO + anti-monotonia | due celle | review |
| Art Director | artwork empty o brief | ARTWORK estetiche + concept | brief + prompt | review prima dell’immagine |
| Researcher | URL o domanda su scheda fissa | fetch, niente inventiva | `ResearchNote` | review se diventa canone |
| Continuity Editor | after slot, nightly, pre-export | regole lint | `Contradiction[]` | `block` ferma export |
| Producer | bottone “prosegui il lavoro” | matrice buchi | lista job | tu lanci o “lancia i primi 3” |

Ordine interno di un generate lyrics:

```
Producer → Steward.pack(target)
   → Steward.forbid?  — se sì, stop con motivo
   → Lyricist.draft
   → ContinuityEditor.scan(draft)
   → se block: torna al Lyricist con i veti (max 2 cicli)
   → status needs_review
```

---

## 11. State machine

### InboxItem

`received → classifying → proposed → accepted`  
                 ↘ `needs_human` → proposed  
                 ↘ `conflict` → accepted | rejected  
`proposed → rejected → archived`

### Cell

vedi §5.3. Transizione `generated → approved` solo da UI umana.  
`approved → draft` solo con “sblocca”.  
`locked` da Canone o da “congela”.

### GenerationJob

`queued → running → needs_review → approved | rejected`  
`running → failed` (retry 2×, poi visibile)

### CanonDecision

`proposed → locked`  
`locked → superseded` (nuova riga, vecchia resta in storia)

### AudioTake

`imported → listening → shortlist → approved | rejected`  
Dadej: `imported` deve dichiarare `source_audio = track:02` o il linter avvisa.

---

## 12. API dell’app

Prefisso `/api/trpc` (o REST equivalente). Autenticato.

| Procedura | Cosa fa |
|---|---|
| `inbox.add` | upload/paste |
| `inbox.classify` | job classifier |
| `inbox.accept` / `reject` / `acceptBatch` | slot |
| `shelf.get` | matrice + scores |
| `track.get` / `cell.get` | dettaglio + versioni |
| `cell.updateHuman` | edit manuale → origin human_edit |
| `generate.start` | crea job |
| `generate.retry` | | 
| `canon.list` / `canon.propose` / `canon.lock` | |
| `lint.run` | |
| `research.fetchUrl` | |
| `art.brief` / `art.image` | |
| `audio.stt` / `audio.eleven` / `audio.stable` | |
| `suno.exportPack` | |
| `present.build` | |
| `git.importRepo` / `git.read` / `git.writeApproved` | |
| `settings.models` | |

Job asincroni via webhook interno / poll. Progress su websocket o SSE (`/api/jobs/:id/stream`).

---

## 13. Flussi completi

### 13.1 Mattina: apro e so cosa fare

1. `/` calcola matrice (o usa cache + lint notturno).
2. Banner: `3 conflitti block · 4 testi vuoti · 1 bozza finale`.
3. Producer propone: (a) risolvere `RENEW_DEST`, (b) scrivere 09, (c) allungare 15 solo dopo 14.
4. Tu tocchi una card → vai alla cella o lanci il job.

### 13.2 Importo il repo così com’è

1. Impostazioni → Importa `github.com/Tau78/thedistance`.
2. Parser crea ~20+ inbox item (6 doc root + 15 tracce + script presentazione).
3. Regole deterministiche slotano i markdown nelle celle; Artwork path restano `partial` (file assenti).
4. Linter apre `NUM_DRIFT`, `RENEW_DEST`, `PLAYLIST_STALE`, `ART_MISSING`, `DP_SHORT`.
5. Tu “Accetta tutto ciò che non è conflict”. PLAYLIST ❌ su Code Within diventa contradiction, non sovrascrive il testo approved del file 10.

### 13.3 Inserisco pezzi sparsi in una settimana

| Pezzo | Slot proposto | Poi la app offre |
|---|---|---|
| Voice memo “la hit deve sembrare innocente” | 09 concept o open_questions | non genera ancora lyrics se vuoi solo annotare |
| Wav Suno | traccia da filename/titolo o `needs_human` | `audio_take` + ascolto |
| Strofa IT su carta | classifier lingua IT → lyrics_it o archive | se EN manca, chiede: è fonte o traduzione? |
| PNG Midjourney deserto/SOS | 07 artwork (primaria) | variante, non sovrascrive se già slotted |
| Nota “Dadej = Jaded reverse” | decisione `dadej` (già locked) + 08 concept | conferma, no lyrics |
| Concept.odt | album `concept_source` + tracce da heading | 16 Cassandra → bonus, non playlist |
| `Looking Through the Stars.mp3` | 12 archive + audio source | STT gramelot se assente |
| Screenshot Slack | `needs_human` (decisione vs testo) | mozione canone se sembra una scelta |

### 13.4 Scrivere Room Pt.2 da zero

Vincoli del pack:

- 1984, Atto III, hit planetaria, nessuno sa da dove viene;
- **non** rivelare same-world / π / “siamo noi”;
- deve contenere materiale che 10 potrà “decodificare” (loop, four bars, SOS sotto la pelle) senza essere già un saggio;
- bookend leggero con 03 (*copy/room*) ma registro opposto: celebrazione vs ascolto;
- Style: template ’80s anthem, non Fifth-rock;
- lingua EN, poi IT.

Passi:

1. Steward costruisce pack (03, 07, 08, 10 approved; 15 **escluso** dal testo, al massimo “non spoilerare il finale”).
2. Lyricist propone v1 con Verse/Pre/Chorus.
3. Continuity: se compare “we are them” o “5125” → block, riscrivi.
4. Tu approvi o chiedi “più dancefloor, meno lab”.
5. Translator → Analyst → Suno Engineer in catena, ciascuno gate.
6. Write-back `ALBUM/09-room-pt2.md` solo dopo approve lyrics (le altre celle quando pronte).

### 13.5 Iterare Suno su First Ripples

Cella style già approved. Job “variante quiet”:

- sostituisce solo il ponte `[BRIDGE/SPOKEN]` come da STYLE-SUNO;
- anti-monotonia accesa;
- output = nuovo `ItemVersion` su `suno_style`, non distrugge il template album.
- Export pack → tu generi su Suno → drop wav → `audio_take`.

### 13.6 Dadej da Jaded approvata

1. Se 02 `audio_take` manca: “Prima serve un take di Jaded”.
2. Quando c’è: job locale `ffmpeg reverse` (niente AI testo) + nota overlap 80s.
3. Cella 08 audio → `generated` (processo, non LLM) → ascolto → approve.
4. Tentativo “scrivi un verso per Dadej” → Steward.refuse.

### 13.7 Allineare ReNew al canone

1. Lint `RENEW_DEST` aperto.
2. UI: due colonne, file vs STORIA.
3. Scelta umana: “Destinazione 1983, Atto IV” (canone v3) **oppure** mozione per cambiare STORIA.
4. Default consigliato: aggiorna meta/concept di 11, non la storia locked.
5. Solo dopo, generate lyrics (ARK, renew vs jaded, niente atterraggio — quello è 14).

### 13.8 Chiudere Distance Proof

1. Analyst già elenca lacune (manca proof, same world, impotenza, bookend 01).
2. Job lyricist: **non riscrivere** il blocco attuale; usarlo come outro (direzione già nel file).
3. Pack include 01 domande, 07 SOS, 10 code, 14 se esiste bozza, decisione π sottile.
4. Due varianti se chiedi `/sessione`: A intima (default), B più esplicita sul π. Non si fondono da sole.
5. Approve → IT → Suno → presentazione slide finale.

### 13.9 Dibattito multi-AI “intimo vs π”

`/session` lancia Lyricist A (Claude) e Lyricist B (Grok o GPT) sullo **stesso** pack.  
Output affiancato, Continuity su entrambi. Tu ne scegli uno o unisci a mano. Nessun merge automatico.

### 13.10 Export presentazione

1. Lint: se `block` aperti, warning “PDF non canon-clean”.
2. Builder legge celle approved; buchi = slide con concept e watermark.
3. PDF in object storage + opzionale commit `The-Distance-Presentazione.pdf`.

### 13.11 Write-back git

1. Diff per file markdown.
2. Commit solo celle approved.
3. PR o push sul branch desk. Cursor che lavora sul repo rivede lo stesso testo.

---

## 14. Prompt di sistema (contratto)

Tutti i ruoli creativi condividono un preambolo:

```
Stai lavorando SOLO a The Distance (Distance Proof Band).
Non proporre un altro album, altre tracce, altri finali.
5125 = 1983 × π. Segnali bidirezionali. Musica = linguaggio.
Finale: 14 Landing poi 15 Distance Proof. Cassandra è tagliata.
Dadej è Jaded al contrario: vietato scrivere lyrics originali.
Anno prologo: 1997. She è la compagna sulla navicella.
π è sottile. Non spiegare la fisica in ogni strofa.
Usa solo il context pack. Se manca un fatto, domanda o lascia un buco:
non inventare coordinate, date, o personaggi nuovi.
Output = schema richiesto. Nessun preambolo.
```

Il Classifier ha un preambolo diverso: “Non riscrivere. Classifica.”

---

## 15. Stato reale da cui parte il banco

Snapshot in [`matrice-completezza.json`](matrice-completezza.json). In sintesi:

**Buchi che sbloccano il lavoro**

1. Conflitto ReNew (destinazione / atto).
2. Drift numerazione file vs playlist.
3. Room Pt.2 — testo.
4. ReNew — testo (dopo 1).
5. Landing — testo (spunti Concept già in cella).
6. Distance Proof — allungare senza buttare la bozza.
7. Artwork binari assenti dal git.
8. Take audio (nessuno in repo).
9. Suno pack mancanti su 01–04, 07–09, 14–15.
10. Sample Frantic Caller da gestire a parte (diritti).

**Già incasellabile come approved dal repo**

Into the Bore, Jaded, Room Pt.1, First Ripples, Then Go, 80s, Code Within, Fifth, Voyage — testi e (dove c’è) Suno.

---

## 16. Implementazione a strati

Lo stack si costruisce in quest’ordine, ciascuno già usabile:

**Strato A — Scaffale morto + Inbox senza AI**  
Postgres, import markdown, griglia, edit umano, write-back. Già vale come banco.

**Strato B — Classifier + Linter**  
Structured outputs, conflitti veri del repo, conferma a lotti.

**Strato C — Generazione testi**  
Steward + Lyricist + Translator + Analyst + Suno pack. Session vincolata.

**Strato D — Media**  
STT, Flux/GPT Image, ElevenLabs/Stable Audio, reverse Dadej, presentazione.

**Strato E — PWA + Producer “prosegui il lavoro”**  
Mobile inbox, coda intelligente.

Niente Strato D prima che A e B tengano il canone. Senza incasellamento la generazione è di nuovo una chat.

---

## 17. Cosa questa app replica dell’aiuto già ricevuto

| Aiuto già successo sul repo | Funzione nell’app |
|---|---|
| Mettere il concept in file e riconciliare decisioni | Canone + linter |
| Scaletta, atti, epoche, ordine 14→15 | Scaffale + signal map |
| Testi EN/IT, analisi, bookend | Celle + Lyricist/Analyst |
| Prompt Suno e anti-monotonia | Style Lab + export pack |
| Gramelot → Fifth | Inbox audio + archive + rewrite vincolato alla metrica |
| Artwork index e rinumerazione | Muro + classifier filename |
| Presentazione PDF | `/present` |
| Ricerca Frantic Caller | `/research` |
| “Non è un sistema generico” | Uno scaffale, un album, zero `New Project` |

---

## 18. Criterio “piano chiuso / flusso funzionante”

Un flusso si considera chiuso se:

1. ha stati di ingresso e uscita;
2. ha un gate umano dove tocca canone o testo;
3. ha un refuse esplicito quando viola una locked decision;
4. scrive una versione, non “il file”;
5. può tornare indietro (reject, archive, supersede).

Tutti i flussi del §13 soddisfano questi cinque punti. Il dettaglio tipi è in [`schema.ts`](schema.ts).

---

*The Distance Desk — piano v1, allineato al canone v3 del repo e al loop inserisci → incasella → completa.*
