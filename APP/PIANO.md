# Incubatore — piano completo

> Un lavoro musicale incompleto entra a pezzi in un banco **vuoto**.  
> La app non sa quante tracce sarà, come si chiama, di che genere è, di cosa parla.  
> Tu inserisci. Lei propone caselle. Tu confermi. Poi generate i buchi, coerenti con ciò che è già dentro.
>
> Stati e rami: [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md).

The Distance, Room, ReNew, Dadej, π, 5125: sono **un** album, una volta. Non sono l’app.

---

## 0. Cosa è, e cosa non è

L’aiuto ricevuto su *The Distance* non va fossilizzato in quindici cassetti. Va distillato nel **metodo**:

1. prendere pezzi disordinati (testi, audio, ODT, immagini, note, decisioni);
2. **incasellarli** — e se la casella non esiste, **crearla**;
3. vedere i buchi *di quello che è emerso*, non di uno scheletro precotto;
4. generare solo i buchi, leggendo il materiale approvato;
5. tenere la coerenza **di questo lavoro** (le regole le hai confermate tu, non il codice).

**È**

- un **incubatore vuoto** all’apertura;
- una **inbox**;
- un **incasellatore** che può aprire un pezzo nuovo, una decisione, un tema di ricerca;
- un **generatore di buchi** vincolato a ciò che hai approvato *in questa incubazione*;
- un export/write-back verso markdown/git quando vuoi.

**Non è**

- The Distance Desk;
- uno scaffale da 15 (né da 9, né da 16);
- un wizard “quante tracce / che genere / che tema”;
- uno studio “descrivi un album e lo invento”;
- una chat che si inventa il canone.

---

## 1. Il loop

```
  ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
  │  1. INBOX   │────►│ 2. PROPOSTA      │────►│ 3. CONFERMA │
  │  inserisci  │     │  crea o riempi   │     │  umana      │
  └─────────────┘     └──────────────────┘     └──────┬──────┘
                                                      │
                                                      ▼
  ┌─────────────┐     ┌──────────────┐     ┌──────────────────┐
  │ 6. EXPORT   │◄────│ 5. APPROVA   │◄────│ 4. SCAFFALE VIVO │
  │  markdown   │     │  o scarta    │     │  N pezzi, N≥0    │
  └─────────────┘     └──────────────┘     └────────┬─────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │  GENERA buchi   │
                                           │  del materiale  │
                                           │  già dentro     │
                                           └─────────────────┘
```

Regole:

1. All’avvio: **0 pezzi**, titolo `null`, genere `null`, 0 decisioni locked.
2. Una casella nasce solo da inbox confermata o da “nuovo pezzo” / “nuova decisione” tuo.
3. Nessuna generazione crea una traccia, un finale, un genere o un personaggio se non gli chiedi esplicitamente `propose_structure` — e anche allora è una proposta.
4. La generazione legge solo celle approved + decisioni locked **di questa incubazione**.
5. Niente sovrascrittura silenziosa.
6. Ogni bozza AI è una versione, non la verità.

---

## 2. First-run — vuoto vero

```
INCUBATORE

Non c’è un album.
Non ci sono tracce.
Non c’è un genere.

Butta quello che hai.
Oppure apri un pezzo vuoto, senza nome.

[ Inserisci materiale ]
[ Nuovo pezzo ]
```

Niente “Apri The Distance”. Niente “15 cassetti già pronti”.  
Niente campo “Titolo album” obbligatorio. Il titolo è una cella come le altre: emerge (da una cover, da un ODT, da una nota) o la scrivi quando ti serve.

`Nuova incubazione` (menu): chiude o archivia il lavoro corrente e torna a zero. Il prossimo album della vita non eredita Room.

---

## 3. Come nasce la struttura (emergente)

Lo **scaffale non è una griglia fissa**. È una lista che cresce.

### 3.1 Nascita di un pezzo

Un `Piece` nasce in tre modi, tutti umani in ultimo:

| Origine | Esempio | Cosa conferma |
|---|---|---|
| Tu clicchi **Nuovo pezzo** | vuoto, `title=null`, `index` = ultimo+1 o null | esiste un cassetto senza nome |
| Inbox: “questo file è un brano” | `05-first-ripples.md`, un wav intitolato | crea pezzo + riempie una cella |
| Inbox: “questo documento elenca più brani” | una playlist, un ODT con heading | propone *N* pezzi nuovi; tu accetti 0…N |

Il totale non è un campo di setup. Se oggi hai 3 pezzi e domani ne aggiungi uno, lo scaffale ha 4 righe. Se ne cancelli uno, ne ha 3. Se un ODT parla di 16 titoli e tu ne accetti 11, ce ne sono 11.

### 3.2 Nascita di meta (titolo, genere, argomenti)

Non esistono enum `Epoch`, `Act`, `synth-pop`, `concept`.  
Esistono `labels` libere sul pezzo e celle di lavoro (`title`, `concept`, `style_bible`).

Esempi di come emergono, solo se il materiale lo dice e tu confermi:

- un file si chiama `1997 — Into the Bore` → label `year=1997`, title proposto;
- una nota “è synth-pop ’80” → cella work `style_bible` o label `genre`;
- “Dadej è Jaded al contrario” → decisione emergente + eventuale `specialRule` sul pezzo Dadej, **dopo** che quei pezzi esistono;
- niente nel materiale parla di genere → il genere resta `null`. La generazione non lo inventa.

### 3.3 Nascita di una decisione

Il classificatore può dire: “questa frase sembra una scelta di canone”.  
Tu la locki. Da quel momento lo Steward la inietta.  
All’avvio la lista è `[]`. Nessun π, nessuna Cassandra, nessun “15 tracce” nel codice.

### 3.4 Facette di un pezzo

Quando un pezzo nasce, riceve un **kit vuoto** di celle (vedi `DEFAULT_PIECE_CELLS` in [`schema.ts`](schema.ts)): meta, concept, lyrics, traduzione, analisi, prompt stile, lyrics per generatore, artwork, audio, link, domande.

È il *metodo di completamento*, non il contenuto.  
Puoi aggiungere una cella `custom` (“partitura”, “video”, “gramelot”).  
Puoi marcare una cella `not_applicable` (se *tu* decidi che un pezzo è strumentale / reverse / solo sample).

---

## 4. Inbox

Stesso ingresso di sempre, senza gazetteer di The Distance.

| Tipo | Esempio | Estrazione |
|---|---|---|
| Testo | strofa, nota, elenco titoli | raw |
| Markdown / git | una cartella album qualunque | sezioni, filename |
| ODT / RTF / DOC | concept, bozze | testo + heading |
| Audio | memo, demo, take Suno | STT + durata |
| Immagine | cover, art, screenshot | vision |
| URL | video, pagina, link generatore | meta |
| PDF | pitch | testo + pagine |
| Dump chat | Slack, WhatsApp | split messaggi |

Il classificatore **non** ha una tabella “Room → traccia 09”. Ha:

1. regole di forma (filename con numero, tag `[Verse]`, immagine quadrata, wav…);
2. confronto con i pezzi *già nati* in questa incubazione (similarità titolo/testo);
3. se non c’è un pezzo che somiglia: proposta `new_piece`.

Soglia bassa → `needs_human`. Mai crea un pezzo da sola.

---

## 5. Scaffale vivo

Desktop: lista verticale di pezzi, ciascuno espandibile in celle.

Stato 0:

```
(nessun pezzo)

  L’incubatore è vuoto.
  [ Inserisci materiale ]   [ Nuovo pezzo ]
```

Dopo tre conferme casuali, potrebbe essere:

```
Lavoro: (senza titolo)          decisioni locked: 0

  ·  (senza nome)     lyrics ◐   audio □
  ·  First Ripples    lyrics ■   style ■   art □
  ·  (wav senza titolo) audio ■  lyrics □
```

Non c’è la mappa 1983↔5125. Se un giorno il materiale di *quel* lavoro descrive due epoche e tu locki quella lettura, *allora* il cockpit può disegnare una mappa — come vista derivata, non come chrome fisso dell’app.

Progresso = buchi delle celle esistenti, non “15/15 tracce”.  
`work_ready` lo definisci tu (decisione emergente: “l’album è chiuso”) oppure una regola debole: *tutti i pezzi che hai scelto di tenere hanno lyrics+audio approved* — e i pezzi li hai scelti tu.

---

## 6. Generazione vincolata (senza canone precotto)

Il **context pack** si costruisce *in runtime* da:

1. decisioni locked di questa incubazione (può essere lista vuota);
2. celle approved del pezzo target;
3. celle approved dei pezzi *collegati* (se esistono link);
4. style bible se approved;
5. divieti = special rules locked sui pezzi + decisioni locked.

Se l’incubazione è The Distance *dopo* che hai importato e lockato “Dadej = reverse, no lyrics”, allora lo Steward rifiuta un testo su Dadej.  
Se l’incubazione è un altro lavoro e Dadej non esiste, quella regola **non c’è**.

Job `propose_structure`: unico modo in cui l’AI suggerisce “forse questi heading sono 6 pezzi”. Output = inbox di proposte, non pezzi creati.

---

## 7. Stack

Invariato nel ruolo, slacciato dall’album.

| Strato | Scelta |
|---|---|
| App | Next.js 15, TypeScript, PWA |
| UI | Tailwind, design neutro da banco (scuro). Niente neon “π / 5125” di default |
| API | tRPC + schema.ts |
| DB | Postgres + Drizzle |
| File | MinIO / S3 |
| Job | BullMQ + Redis |
| Auth | un utente |
| Export | markdown + git opzionale |

Tema visivo: se un lavoro ha una cover approved, l’UI può prenderne due colori. All’avvio: grigio caldo su fondo scuro, non synthwave di The Distance.

### AI

| Ruolo | Compito | API |
|---|---|---|
| Classifier | crea/riempi proposte | structured outputs (Gemini Flash / GPT mini) |
| Steward | pack + refuse su *decisioni di questa incubazione* | Claude |
| Lyricist / Translator / Analyst | buchi testo | Claude / GPT / Grok come voce alternativa |
| Prompt engineer | pack per Suno o altro generatore | Claude |
| Art Director + Flux / GPT Image | brief e immagini | BFL / OpenAI |
| Researcher | fonti che *tu* dai | Gemini / GPT |
| STT | memo | Whisper / ElevenLabs |
| Audio ufficiale | bozze | ElevenLabs Music, Stable Audio 3 |
| Producer | ordina i buchi esistenti | regole + LLM piccolo |

Suno: ancora **niente API pubblica** (partner-only a metà 2026). Export pack + ricarichi il wav. Niente wrapper cookie.

---

## 8. Pagine

| Route | Stato vuoto | Dopo l’ingest |
|---|---|---|
| `/` Scaffale | empty state, CTA inbox / nuovo pezzo | lista pezzi nati |
| `/inbox` | drop zone | coda proposte (anche `Crea pezzo “…”`) |
| `/pieces/:id` | — | celle di quel pezzo |
| `/canon` | “Nessuna decisione. Nascono dal materiale.” | tabella locked/proposed |
| `/style` | vuoto; si riempie se slotti un prompt | bible + override per pezzo |
| `/art` | muro vuoto | tile = pezzi che *esistono* |
| `/research` | “Aggiungi un tema” | schede nate da URL/note |
| `/lint` | vuoto o “troppo poco materiale” | contraddizioni *interne* |
| `/generate` | disabilitato se 0 celle target | coda buchi |
| `/session` | chat legata all’incubazione vuota: può solo classificare/proporre | @pezzi |
| `/present` | “Non c’è ancora un lavoro da presentare” | slide = pezzi approved |
| `/settings` | chiavi, modelli, git | idem |

Chrome: nome lavoro o `Senza titolo`. Badge `N pezzi`. Nessun `CANON LOCK` verde su 9 pin precotti: il badge esiste quando *ci sono* decisioni locked.

Dettaglio wireframe: [`UI.md`](UI.md).

---

## 9. Flussi

### 9.1 Mattina, incubatore nuovo

Apri. Zero. Butti una nota vocale. Classifier: `new_piece`, lyrics parziale, title null. Confermi. Uno scaffale da **una** riga. “Genera” offre: pulire il testo, tradurre, chiedere di che parla — non “completa le 15 tracce”.

### 9.2 Tre file senza album

1. `scrap.txt` con due strofe.  
2. `demo.wav`.  
3. PNG di una stanza.

Proposte possibili: un pezzo solo (stesso lavoro?) o tre pezzi. Tu decidi. Il genere resta sconosciuto. Nessuno chiama nulla “Room”.

### 9.3 Importi *The Distance* (esempio, non default)

L’incubatore è vuoto. Importi `github.com/Tau78/thedistance`.

Il parser non applica uno skeleton v3. Spezza i file. Propone, tra le altre cose:

- work title “The Distance”?
- N pezzi da `ALBUM/*.md` (tanti quanti i file, non “15 perché lo dice il codice”);
- decisioni da `RICONCILIAZIONE.md` come *proposte*, tutte `proposed`;
- conflitto numerazione H1 vs filename — dopo che i pezzi esistono.

Tu puoi accettare 15 pezzi, o 9, o solo quelli con testo.  
Se locki “Dadej = reverse”, *quella* incubazione vieta lyrics su quel pezzo.  
Un’altra incubazione, l’anno prossimo, non ha Dadej.

Snapshot di come apparirebbe *se* accettassi il repo com’è: [`esempio-the-distance.json`](esempio-the-distance.json).

### 9.4 “Forse è un concept da 10 pezzi”

Tu lo chiedi in sessione o lanci `propose_structure`. L’AI legge solo il materiale slottato e propone heading. Confermi uno a uno. Non parte un wizard da 10 cassetti vuoti con nomi inventati.

### 9.5 Un pezzo in più, un pezzo in meno

Aggiungi. Togli. Riordini `listen_order`. Nessun linter “block: dovevano essere 15” a meno che *tu* abbia lockato quella decisione.

### 9.6 Write-back

Export in cartella:

```
WORK.md
PIECES/001-{slug-or-untitled}.md
```

Se il lavoro ha un repo, commit esplicito, hunk per hunk.  
Niente path hardcodati `ALBUM/09-room-pt2.md` nel core. Il mapping The Distance è un *adapter* opzionale, attivato solo se i file importati avevano già quella forma.

---

## 10. API (nucleo)

| Procedura | Nota |
|---|---|
| `work.get` / `work.reset` | reset = nuova incubazione vuota |
| `inbox.add` / `classify` / `accept` | `accept` può creare un `Piece` |
| `piece.create` / `piece.archive` / `piece.reorder` | senza tetto |
| `cell.updateHuman` | |
| `generate.start` | rifiuta se il target non esiste o è N/A |
| `decision.propose` / `lock` | lista parte vuota |
| `lint.run` | solo vincoli emergenti |
| `export.markdown` / `git.writeApproved` | |
| `settings.*` | |

---

## 11. State machine (riassunto)

**Work:** `empty → emerging → drafting → closing`  
`empty` = 0 pezzi. Nessuno skippa `empty` con uno skeleton.

**InboxItem / Cell / GenerationJob / Decision:** come prima (`received…`, `empty…approved`, `queued…`, `proposed→locked`).

**Piece:** `born → in_progress → ready | archived`  
`born` subito dopo create, anche senza titolo.

---

## 12. Prompt di sistema (contratto)

```
Stai lavorando sull'incubazione corrente.
Non conosci un album predefinito. Non inventare titolo, genere,
numero di tracce, personaggi, epoche o finali se non sono
nelle celle approved o nelle decisioni locked del pack.
Se il pack è vuoto, chiedi o classifica: non costruire un concept.
Non creare pezzi nuovi salvo job propose_structure (solo proposte).
Output = schema richiesto.
```

The Distance non compare in nessun system prompt di default.

---

## 13. Implementazione

**A** — Inbox + pezzi che nascono da conferma + celle vuote + edit umano. Zero AI.  
**B** — Classifier (new_piece / fill) + linter interno.  
**C** — Generazione testi vincolata al pack runtime.  
**D** — Media (STT, immagini, audio ufficiale, export pack).  
**E** — PWA, Producer sui buchi *esistenti*.

Adapter `thedistance-markdown` (opzionale, Strato B): capisce *quel* repo se lo importi. Non gira all’avvio.

---

## 14. Cosa resta del lavoro già fatto su The Distance

Il metodo. Non i cassetti.

| Aiuto sul repo | Nell’incubatore |
|---|---|
| Incasellare pezzi sparsi | Inbox + create-or-fill |
| Vedere buchi | celle dei pezzi nati |
| Scrivere testi/analisi/prompt | generate vincolato |
| Non contraddire le decisioni di sessione | decisioni emergenti, locked da te |
| Export markdown / presentazione | quando c’è abbastanza materiale |

Room, ReNew, il bore: vivono solo se li inserisci in *quell’*incubazione.

---

*Incubatore — piano v2. Vuoto alla nascita. Il lavoro arriva dopo.*
