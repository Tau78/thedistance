# Incubatore — piano completo

> Vuoto alla nascita.  
> Tu butti dentro ciò che hai. La app lo incasella.  
> Poi, lungo una timeline **dalla creazione al lancio**, ti mostra i pezzi che servono e i buchi che mancano: testi, singoli, storie, post, foto, mail alle riviste, ricontatti.
>
> Dettaglio stati: [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md).

Quattro cose insieme: incubatore, casellario, produttore, ufficio stampa.  
The Distance non è lo scheletro. È un possibile contenuto.

---

## 0. Cosa è

Non un’AI che inventa un album. Non uno scaffale da 15 brani. Non un generico “progetto”.

È un **ufficio del lavoro** che:

1. **prende** qualsiasi contenuto (testo, audio, foto, mail, rubrica, voice memo, dump Slack);
2. **lo incasella** — e se la casella non c’è, la crea (un pezzo, un contatto, un post, un evento);
3. **te lo rimostra quando serve** (stai scrivendo il pitch → bio, cover, singoli, link; è il giorno del singolo → storie, mail in attesa);
4. **ti elenca i buchi** della fase in cui sei (*quali sono i singoli? hai i contenuti social? chi vuoi contattare?*);
5. **ti aiuta a scrivere** solo ciò che manca, usando ciò che hai già approvato;
6. **ordina tutto** su una timeline che parte dalla raccolta e arriva al lancio pubblicitario completo, poi ai ricontatti.

**Non è**

- The Distance Desk;
- un wizard “quante tracce / che genere”;
- un social scheduler da agenzia, da solo;
- un CRM da solo;
- una chat che si inventa il canone o la media list.

---

## 1. Due assi (non confonderli)

| Asse | Precotto? | Cosa c’è all’avvio |
|---|---|---|
| **Contenuto** (titolo, brani, genere, temi, nomi) | No | 0 pezzi, tutto `null` |
| **Programma** (dalla creazione al lancio) | Sì, come *metodo* | 8 fasi vuote, domande senza risposte |

Le 8 fasi non sono l’album. Sono il percorso di **questo mestiere**. Ogni incubazione le riparte vuote.

```
RACCOLTA → CREAZIONE → PRODOTTO → IDENTITÀ → SOCIAL → STAMPA → LANCIO → RICONTACTI
   │           │           │          │         │        │        │          │
  inbox      pezzi      singoli     bio      storie    mail    drop     follow-up
             buchi      ordine      foto      post     blog    settimana
```

Non devi chiudere una fase per aprire la successiva. Puoi avere una mail di stampa in bozza mentre un testo è ancora vuoto. Il produttore ti dice solo *cosa manca per dove sei* e *cosa è troppo presto*.

---

## 2. Loop

```
  INBOX ──► PROPOSTA (crea/riempi) ──► CONFERMA ──► CASELLARIO
                                                      │
                          ┌───────────────────────────┤
                          ▼                           ▼
                     TIMELINE                    CONTESTO
                   creazione→lancio            “ora ti serve questo”
                          │                           │
                          ▼                           ▼
                     BUCHI / DOMANDE              GENERA
                   (produttore+stampa)         solo il mancante
```

Regole:

1. Avvio: 0 pezzi, 0 contatti, 0 post, 0 mail, `launchDate=null`.
2. Le fasi esistono come domande vuote (`METHOD_HOLES` in [`schema.ts`](schema.ts)).
3. Una casella di *contenuto* nasce da inbox + conferma, o da un “nuovo …” tuo.
4. La generazione non inventa un album, una media list o 30 post se il pack è vuoto.
5. **Librarian:** ogni schermata tira fuori solo le caselle utili a *quel* compito.
6. Niente sovrascrittura silenziosa.

---

## 3. First-run

```
INCUBATORE

Non c’è un album. Non c’è un lancio.
C’è un casellario vuoto e una linea del tempo senza date.

[ Inserisci quello che hai ]
[ Guarda i buchi del percorso ]
```

`Guarda i buchi` apre la timeline con le domande di metodo, tutte rosse/vuote. Non inventa titoli di brani.

---

## 4. Casellario — famiglie

Non una griglia di 15 hit. Cassetti per **tipo di lavoro**, tutti vuoti:

| Famiglia | Istanze all’avvio | Esempi di oggetto |
|---|---|---|
| Pezzi | 0 | un brano, anche senza nome |
| Asset | 0 | wav, cover, foto, PDF, EPK |
| Singoli | 0 | “questo pezzo esce prima”, data |
| Identità | campi null | nome, artista, bio, logo |
| Social | 0 | storia, post, reel, foto, canale |
| Stampa | 0 | contatto, mail, ricontatto |
| Timeline | 8 fasi, 0 date | eventi, dipendenze |
| Decisioni | 0 | pin che *tu* locki |
| Ricerca | 0 | fonti |

Inbox classifica verso queste famiglie. Un PNG può essere cover **o** foto social **o** press photo: `needs_human` se incerto.

### Mostra quando serve

Il librarian non è una search. È un **contesto**.

| Stai facendo | Ti mette in mano (se esistono) | Ti marca come buco |
|---|---|---|
| Testo di un pezzo | concept, decisioni, pezzi collegati | lyrics, domande aperte |
| “Quali singoli?” | pezzi con audio/art, ascolti | pezzi senza take, 0 SinglePlan |
| Pitch a una rivista | bio, one-liner, cover, singoli, link | bio, EPK, “chi è il destinatario” |
| Post Instagram | cover, lyric card, copy già approved | conteggio storie/post non pianificato |
| Giorno lancio | checklist fase, post schedulati, mail waiting | scadenze senza asset |
| Ricontatto | mail originale, risposta (se slottata), giorni attesa | `waiting` scaduto |

Se la casella è vuota, **non** riempie con The Distance. Mostra il buco.

---

## 5. Produttore — buchi di creazione e di prodotto

Domande che il produttore pone **quando ha senso** (c’è almeno un pezzo, o sei tu che apri la fase):

- Quali pezzi sono nati? Quali sono incompleti (testo, audio, art)?
- Quali sono i **singoli**? In che ordine escono?
- C’è un ordine d’ascolto (se i pezzi sono più di uno)?
- Credits, ISRC/UPC: solo se inizi a parlarne o importi un foglio.

Non chiede “quante tracce sarà l’album” come setup. Se hai 3 pezzi, lavora su 3. Se ne aggiungi un quarto, ricalcola i buchi.

`single_proposal` (AI): propone singoli *solo* dai pezzi esistenti (es. “questo ha audio+hook”). Tu confermi. Zero pezzi → refuse.

---

## 6. Ufficio stampa e social

### Social

Buchi di metodo:

- Hai i contenuti social?
- Quante **storie**, quanti **post**, quante **foto** per il primo drop / per il lancio?
- Su quali canali?

Finché non decidi i numeri, restano domande. Puoi rispondere “6 storie, 3 post, 4 foto sul primo singolo” → nascono *slot vuoti* da riempire (inbox o genera copy).  
L’AI non decide da sola “ti servono 30 reel”.

### Stampa

Buchi:

- Chi vuoi contattare? (nome, testata, mail — anche incompleti)
- Mail a riviste/blog: scritte? (pitch)
- Tempistiche: quando il primo tocco, dopo quanti giorni il ricontatto?

Ogni `Outreach` ha `dueAt`, `waitDays`, stati `draft → approved → sent → waiting → done`.  
Quando `waiting` scade, la fase **ricontatti** la tira in cima.

`pitch_email` / `follow_up_email`: pack = identità + singoli + asset approved + scheda contatto. Se manca la bio, il buco è la bio, non un’invenzione di biografia.

Niente scraping di redazioni. I contatti li inserisci tu (o un foglio). L’AI può *organizzare* e *ricordare*, non inventare giornalisti.

---

## 7. Timeline creazione → lancio

Vista principale dopo l’inbox: una **linea**, non un calendario vuoto da agenzia.

```
● raccolta    ● creazione    ○ prodotto    ○ identità    ○ social    ○ stampa    ○ lancio    ○ ricontatti
  4 item        2 pezzi        singoli?      bio?          0/0/0       0 mail      data?       —
                1 buco testo
```

- Un evento può non avere data (solo fase + dipendenze: “pitch dopo che esiste un singolo”).
- Quando esiste una **data di uscita**, si accende il [motore di lancio](#7b-motore-di-lancio).
- Dipendenze: non puoi marcare “lancio fatto” se i buchi `block` della settimana lancio sono aperti — a meno di eccezione tua.

Export: Gantt / iCal / `TIMELINE.md` / PDF checklist (stile Harment).

---

## 7b. Motore di lancio

Ispirato, per *questa* competenza, a [Orphiq](https://orphiq.com/features/music-release-planning), [ReleaseLoop](https://releaseloop.com/) e [Harment Release Aid](https://harment.co.uk/tools/release-aid/). Non li copiamo: non diventiamo un OS di carriera né un planner da 8 settimane scollegato dalla creazione.

Cosa prendiamo:

| Da | Meccanica |
|---|---|
| **Orphiq** | Inserisci la data (e il formato: single/EP/album). Il sistema **costruisce a ritroso** una campagna settimana per settimana. Se la data **si sposta, ricalcola tutto**. Finestre da industria: distributore, pitch editoriale, teaser, giorno 0, post-release. Non è una board Notion generica. |
| **ReleaseLoop** | Checklist di release + **CRM** (giornalisti, blog, playlist curator) e stato dei **solleciti**. Chi ha già supportato. Task legati a un drop, non sparsi. |
| **Harment Release Aid** | Countdown da drop day. Evidenzia **scadenze e contenuti ancora mancanti** *prima* che tu possa spuntare il task. Export della roadmap. |

Cosa **non** prendiamo: roster multi-artista, Apollo come stratega di carriera, scraping di redazioni, “30 reel perché lo dice il template”.

### Come funziona da noi

1. Finché non c’è `Release.dropDate`, la timeline resta la spina a 8 fasi *senza orologio*. Creazione e casellario lavorano lo stesso.
2. Imposti data (+ formato, se lo sai). Nascono i `ReleaseTask` da `RELEASE_TASK_TEMPLATES` (offset in giorni, editabili):

   | Offset default | Task | Serve avere |
   |---|---|---|
   | **−56** (≈ −8 settimane) | Chiudi master, credits, metadata | audio approved, credits |
   | **−42** | **Invia master al distributore** | master + cover + metadata |
   | **−28** | **Pitch Spotify for Artists** + pre-save | audio, one-liner |
   | **−14** | **E-mail stampa / blog / curator** | ≥1 contatto, bozza pitch |
   | **−10** | Teaser social | numeri social decisi o N/A |
   | **0** | Giorno uscita | data |
   | **+7** | Ricontatti / solleciti | almeno una mail `sent` |

   I −60 / −30 / −14 dell’esempio utente sono la stessa idea: offset da drop. I default sopra sono la pratica indie 2026 (Orphiq/Harment: pista ~8 settimane; S4A spesso chiede il brano in sistema e una finestra editoriale di settimane, non di 3 giorni). Tu puoi spostare un offset a −60/−30 senza toccare il codice.

3. **Ricalcolo:** cambi la data → tutti i `dueAt = dropDate + offsetDays`. I task già `done` restano done; quelli `scheduled` si muovono; se un task cade nel passato, badge “in ritardo / rinegozia data o accetta di perdere la finestra”.
4. **Gate Harment:** un task non si spunta se `requires` è vuoto. Stato `blocked_missing` + lista buchi (es. “manca cover”). Librarian apre le caselle giuste.
5. **CRM ReleaseLoop:** contatti tipizzati (`journalist`, `blog`, `playlist_curator`, `radio`…). Outreach + sollecito. Campo `lastOutcome`. Nessun giornalista inventato.
6. **Più drop:** un album può avere Release “singolo 1”, “singolo 2”, “album”. Ogni drop ha la sua timeline a ritroso. I pezzi si legano con `pieceIds`.
7. **Venerdì DSP:** hint, non obbligo (“le editorial playlist DSP ruotano di venerdì”).

Non sostituisce DistroKid / S4A: ricorda la scadenza e i file da avere in mano.

---

## 8. Inbox — cosa si può buttare (oltre i brani)

| Tipo | Va verso |
|---|---|
| Testo, markdown, ODT, git | pezzi, concept, decisioni |
| Audio / link generatore | pezzo, asset audio |
| Immagine / video | cover, press photo, social, art pezzo |
| Voice memo | pezzo o nota di fase |
| VCard / “Mario, Rumore, mail…” | contatto stampa |
| Bozza mail | outreach |
| Screenshot social | social item o archive |
| Foglio date | eventi timeline |

---

## 9. Stack e AI

Stack tecnico invariato (Next.js, Postgres, job, PWA).  
Tema visivo: banco, non synthwave d’un album.

| Ruolo | Mestiere |
|---|---|
| Classifier | famiglia + crea/riempi |
| Librarian | pack “mostra ora” |
| Steward | refuse se il pack non basta o viola pin |
| Lyricist / Translator / Analyst | buchi pezzo |
| Prompt engineer / Art | pack audio/immagini |
| **Producer** | buchi pezzo, singoli, timeline a ritroso |
| **Press officer** | pitch, follow-up, scadenze outreach |
| **Social editor** | copy e piano *sui numeri che hai deciso* |
| Researcher | fonti che dai tu |

Suno: export pack, niente wrapper.  
Mail: la app **scrive e tiene** le bozze; l’invio vero può essere copia/incolla o integrazione dopo (v1 = export `.eml` / clipboard).

---

## 10. Pagine

| Route | Compito |
|---|---|
| `/` Timeline | spina 8 fasi, buchi, prossimo atto |
| `/inbox` | ingresso unico |
| `/cabinet` | casellario per famiglia |
| `/pieces/:id` | creazione del pezzo |
| `/singles` | quali singoli, onde, date |
| `/identity` | nome, bio, foto, EPK |
| `/social` | conteggi + item |
| `/press` | rubrica, mail, ricontatti |
| `/generate` | coda buchi |
| `/session` | guida (produttore/stampa), non chat libera |
| `/present` | EPK / cartella stampa da approved |
| `/settings` | chiavi, nuova incubazione |

Chrome: `senza titolo · 0 pezzi · fase: raccolta`.  
Mobile: `Inbox | Timeline | Buchi | Altro`.

[`UI.md`](UI.md).

---

## 11. Flussi

### 11.1 Vuoto → prima nota

Inbox. Classifier: nota di raccolta. Timeline: `has_any_material` si chiude. `has_piece` resta aperto. Produttore: *“Non c’è ancora un pezzo. Vuoi aprirne uno o continuare a buttare materiale?”*

### 11.2 Due brani, zero lancio

Due pezzi con lyrics. Produttore in **prodotto**: *Quali sono i singoli?* Nessuna data. Social/stampa restano domande, non un calendario finto.

### 11.3 Decidi un singolo e una data

Lock: pezzo A = primo singolo, data D.  
Producer propone: identità (bio/cover), social counts, 1 pitch, ricontatto D+7.  
Tu cambi i numeri. Nascono slot vuoti. Librarian, quando apri “scrivi pitch”, tira cover e one-liner se ci sono.

### 11.4 Import The Distance (esempio)

Adapter: propone pezzi dai file. Non riempie la media list. Non decide i singoli.  
Se chiedi “programma il lancio”, il produttore parte da *quei* pezzi e dalle domande ancora vuote (singoli? stampa? social?).

### 11.5 Ricontatto

Mail inviata, `waitDays=7`. Giorno 8: fase ricontatti in cima, bozza follow-up, pack = mail 1 + asset. Non inventa “il giornalista è interessato”.

---

## 12. API (aggiunte)

Oltre a work/inbox/piece/generate:

`timeline.list` · `timeline.proposeBackward` · `holes.report`  
`release.setDropDate` · `release.moveDate` · `release.tick`  
`singles.set` · `social.plan` · `social.item`  
`contacts.*` · `outreach.*` · `context.pull(task)`  
`export.epk` · `export.timeline` · `export.eml` · `export.releasePdf`

---

## 13. Implementazione

**A** — Inbox + casellario (pezzi, asset, contatti) + timeline 8 fasi con buchi di metodo. Zero AI.  
**B** — Classifier + librarian (mostra quando serve).  
**C** — Producer: report buchi, singoli.  
**C2** — Motore di lancio: data → task a offset, ricalcolo, gate `blocked_missing`.  
**D** — CRM stampa/curator + social + solleciti.  
**E** — Generazione creativa (testi, art, pack audio) vincolata.  
**F** — PWA, reminder ricontatti.

A è già l’ufficio: radunare e ordinare. Il resto guida e scrive.

---

## 14. Contratto prompt

```
Incubazione corrente. Nessun album predefinito.
Non inventare brani, genere, media list, date o conteggi social
se non sono approved/locked nel pack.
Se manca qualcosa, è un buco: elencalo.
Mostra solo le caselle richieste dal task.
propose_structure / timeline_proposal = proposte, non fatti.
```

---

*v3 — casellario + produttore + stampa, dalla creazione al lancio.*
