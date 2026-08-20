# Cosa copiamo da Orphiq, ReleaseLoop, Harment

Fonti lette (2026): siti e docs ufficiali, non recensioni di confronto dirette (non ce ne sono di indipendenti e complete).  
Criterio: copiamo **meccaniche e UX**, non il prodotto. Non diventiamo un OS di carriera né un’agenzia.

| Prodotto | Forza | Debolezza per noi |
|---|---|---|
| [Orphiq](https://orphiq.com/features) / Apollo | Timeline a ritroso, “cosa fare dopo”, AI *dentro* il piano, brand come lente | Troppo “carriera/roster”; chat strategica generica |
| [ReleaseLoop](https://docs.releaseloop.com/) | UI da ufficio: dashboard, task, CRM, calendario, EPK, budget | Pensa a label e multi-release; poco creazione artistica |
| [Harment](https://harment.co.uk/tools/) | Tool *un compito = una schermata*: countdown, Pitch500, DropMail, MetaAid | Suite spezzettata, landing da promo, non un casellario |

---

## Inventario — cosa altro conviene copiare

### Già nel piano

A ritroso + ricalcolo data (Orphiq). CRM + solleciti (ReleaseLoop). Gate contenuti mancanti + countdown (Harment). Content matrix e stati stampa (nostre schede 2–3).

### Da aggiungere (sì)

| Meccanica | Da | Come sta da noi |
|---|---|---|
| **Dashboard “oggi”** — urgente, prossimo drop, buchi | ReleaseLoop onboarding/dashboard | Home `/` se c’è una data; senno empty incubatore |
| **Shortcut T** + subtask + chip `2/5` inline | ReleaseLoop Tasks | Ogni `ReleaseTask` può avere checklist; chip cliccabile |
| **Marketing planner** — titolo, piattaforma, fase Pre-save / Release week / Post, stato Draft→Completed | ReleaseLoop Marketing | Tabella sotto la content matrix; le ContentLine diventano attività con data |
| **Calendario mese/settimana** + cover sul giorno + iCal | ReleaseLoop Calendar | `/calendar` — solo eventi dated |
| **Contatto ricco** — categoria, generi, relazione, link al drop, storico interazioni | ReleaseLoop Contacts | Estende scheda 3 |
| **EPK URL** pubblico o link-only | ReleaseLoop EPKs | `/present` pubblica: foto, quote, disco, contatti scelti |
| **Asset accanto al drop** (Drive) | ReleaseLoop | Inbox già c’è; bind cartella opzionale dopo |
| **Budget semplice** — tetto + righe Planned/Pending/Paid | ReleaseLoop Financials | Scheda opzionale, non bloccante |
| **Apollo-in-the-plan** — suggerimento → task con data, non chat a parte | Orphiq Apollo | Sessione: “diventa un task”; niente consigli da “artisti come te” |
| **Prossimo passo** in linguaggio naturale dai *nostri* buchi | Orphiq “ask your data” | Producer: una riga in home, zero dashboard vanity |
| **Idee content agganciate alle settimane di campagna** | Orphiq Content | Solo se esiste drop + pezzi; proposte in inbox |
| **Brand come lente** (voce, pubblico, storia) | Orphiq Branding | Cella identità, riempita da te o dal materiale, non wizard day-1 |
| **Pitch 500 caratteri S4A** | Harment Pitch500 | Tool: genere, mood, strumenti, comparable, storia, fit playlist |
| **Mail HTML** Pre-save / Out now / Fan update | Harment DropMail | Preview + copia HTML; pack da caselle approved |
| **Checklist metadata DSP** prima del distributore | Harment MetaAid | Scheda: titolo, artista, versione, ISRC, mood, generi… buchi |
| **Snippet social** (taglia audio per reel) | Harment Audio Cutter | Job su `audio_take` approved → file corto |
| **Release effort** — smart link, Canvas, ≥3 contenuti settimana 0 | Harment checklist 2026 | Righe extra sul drop, non un punteggio vanity |
| **Catena tool** Lyric → piano → meta → pitch → mail | Harment workflow | Producer propone l’ordine; non 9 URL esterni |

### Dopo, o no

| Cosa | Perché no (ora) |
|---|---|
| Roster 20 artisti, royalty CSV, payout | Siamo un’incubazione, non una label |
| Sync Spotify follower come verità | Opzionale dopo; non blocca il casellario |
| Tour routing / merch come prodotto | Template DropMail sì; modulo tour no in v1 |
| AI Song Checker / mix score | Fuori mestiere |
| Consigli “stage di carriera” generici | Contraddice l’incubatore vuoto |
| Invio SMTP alle redazioni | Bozza + copia; reminder a te |

---

## Mix UI (quale pezzo di chi)

Non una sola estetica: **la schermata prende il pattern più chiaro di quel mestiere**.

| Schermata | Pattern | Perché |
|---|---|---|
| **Empty / raccolta** | Nostro incubatore | Orphiq chiede un brand subito; Harment è una landing. Noi: drop zone. |
| **Oggi** | ReleaseLoop dashboard | Urgenti + prossimo drop + checklist che sparisce. Una occhiata. |
| **Countdown lancio** | Harment (giorni, “manca”) + Orphiq (fasi settimana) | Harment è più denso e onesto sui buchi; Orphiq sulle fasi Pre / week / post. |
| **Lista task** | ReleaseLoop | `T`, drag, chip `2/5`, subtask inline. La UX checklist più descritta e usabile. |
| **Content matrix** | Nostre caselle + colonne ReleaseLoop (piattaforma, fase) | I 3 reel / 5 storie restano buchi visibili; la fase li mette sul calendario. |
| **Calendario** | ReleaseLoop mese/settimana, cover sul giorno | Scan immediato. |
| **CRM** | ReleaseLoop filtri (categoria, genere, relazione) | Scheda 3 già allineata; aggiungiamo filtri e storico. |
| **Pitch S4A** | Harment Pitch500 | Un form, 500 caratteri, copia. Nessun wizard. |
| **Mail** | Harment DropMail (preview HTML) + nostri template testo | Preview a destra, campi da caselle. |
| **Metadata** | Harment MetaAid | Una pagina-voto/checklist, poi sblocca “invia al distributore”. |
| **EPK** | ReleaseLoop pagina pubblica | Un URL, non un PDF perso. |
| **Sessione** | Orphiq “tessuta nel piano” | Chip contesto; “aggiungi come task −14”; no chat carriera. |
| **Look** | Banco scuro, tabelle dense (Airtable/ReleaseLoop), una accent (cyan) | Non neon Harment; non marketing Orphiq. |
| **Scheda pezzo / 4 tab / alert buchi** | Mockup Gemini (DISCUS) | Stepper, badge, box AZIONI NECESSARIE — [`UI.md`](UI.md) |
| **Bit mancanti + cover IA + log** | Mockup Gemini tavola 3 | WatchBit opzionale; genera cover; activity log solo. No team/chat/grafici v1 |

Mobile: bottom bar ReleaseLoop-like `Oggi | Inbox | Piano | Altro`. Countdown Harment in alto su Oggi se c’è una data.

---

## Riferimenti

- Orphiq features: https://orphiq.com/features  
- Orphiq release planning: https://orphiq.com/features/music-release-planning  
- Orphiq Apollo: https://orphiq.com/features/music-ai-agent  
- ReleaseLoop: https://releaseloop.com/ · docs https://docs.releaseloop.com/  
- Tasks: https://docs.releaseloop.com/releases/tasks/  
- Marketing: https://docs.releaseloop.com/releases/marketing/  
- Contacts: https://docs.releaseloop.com/contacts/managing-contacts/  
- Calendar: https://docs.releaseloop.com/templates/calendar/  
- EPK: https://docs.releaseloop.com/artists/epks/  
- Harment tools: https://harment.co.uk/tools/  
- DropMail: https://harment.co.uk/tools/dropmail/  
- Toolbox 2026: https://harment.co.uk/the-ultimate-artist-toolbox-free-tools-guides-for-independent-musicians-2026-harment/  
