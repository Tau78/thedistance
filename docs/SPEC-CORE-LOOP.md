# Incubatore — spec del loop (CORE)

**Versione:** 3.0  
Piano: [`../APP/PIANO.md`](../APP/PIANO.md) · tipi: [`../APP/schema.ts`](../APP/schema.ts)

Loop:

> **INGEST** → **INCASELLA** (crea o riempi) → **MOSTRA QUANDO SERVE** → **BUCHI** sulla spina creazione→lancio → **GENERA** solo il mancante.

Contenuto album: sconosciuto.  
Programma di mestiere: 8 fasi vuote.

---

## 0. Vietato nel core

- Seed di N brani, generi, temi, media list, calendari social pieni
- Inventare giornalisti, date, o “ti servono 30 reel”
- System prompt The Distance
- Silent-apply
- Invio automatico mail alle redazioni (v1: bozza + reminder a te)

The Distance: solo adapter di import, opzionale.

---

## 1. Lifecycle

```
empty → emerging → drafting → launching → following
```

`empty`: 0 pezzi, 0 outreach, launchDate null. Fasi visibili come domande.  
`launching`: esiste almeno un evento dated in fase lancio o un SinglePlan dated.  
`following`: almeno un outreach `sent`/`waiting`.

`work.reset` → empty.

---

## 2. Inbox e classifier

Stati invariati: `received → … → accepted` solo con click.

Target nuovi: `new_asset`, `contact`, `outreach`, `social_item`, `timeline`, `single`.

Passo A forma: mime, “@”, “oggetto:”, vcard, numeri “6 storie”.  
Passo B match su oggetti *esistenti*.  
Passo C LLM structured se serve.

Due PNG uguali: una può essere cover e l’altra post — disambiguare.

---

## 3. Librarian (`context.pull`)

Input: `task` + `phase` + workId.  
Output: `{ have: Slot[], holes: MethodHole[] }`  
Usa `SHOW_WHEN_NEEDED`. Non genera testo. Non riempie.

UI destra = questo output.

---

## 4. Buchi di metodo

Lista in `METHOD_HOLES`. Un buco è `open` | `resolved` | `accepted_na`.

Report `/holes`:

```
creazione: 1 pezzo senza lyrics
prodotto:  singoli?
social:    conteggi non decisi
stampa:    0 contatti
lancio:    data?
```

Nessuna riga “mancano 15 tracce”.

---

## 5. Timeline e motore di lancio

Ogni fase ha eventi 0…N senza data, finché non esiste un `Release`.

`release.setDropDate(date, format)`:

1. crea o aggiorna `Release`;
2. istanzia `ReleaseTask` da `RELEASE_TASK_TEMPLATES` (o dal pack già editato);
3. `dueAt = dropDate + offsetDays`;
4. per ogni task valuta `requires` → se manca, `blocked_missing` + `missing[]`.

`release.moveDate(newDate)`: ricalcola tutti i `dueAt`. `done` resta `done`. Task con `dueAt < today` e non done → `late`.

`release.tick(taskId)`: refuse se `blocked_missing`, a meno di eccezione umana.

`timeline.proposeBackward` resta per eventi extra non in template.

Ispirazione (solo questa competenza): Orphiq (a ritroso + ricalcolo), ReleaseLoop (CRM + solleciti), Harment (scadenze + contenuti mancanti).

---

## 6. Outreach

```
draft → approved → sent → waiting → done
                 ↘ cancelled
waiting + now > sentAt+waitDays → due (fase ricontatti)
```

Follow-up è un nuovo `Outreach` `kind=follow_up`, parent = first_touch.

---

## 7. Generazione

Oltre ai testi pezzo:

| Job | Pack minimo | Altrimenti |
|---|---|---|
| `single_proposal` | ≥1 piece | refuse |
| `bio` / `epk` / `one_liner` | ≥1 piece o note identità | refuse o minimale + buchi |
| `pitch_email` | contatto + (bio o one-liner o pezzo) | buchi elencati |
| `social_plan` | numeri decisi o chiedili | non inventa conteggi |
| `social_copy` | piano o item + asset | refuse se 0 numeri e 0 item |
| `timeline_proposal` | dropDate o la chiede | — |
| `missing_report` | work / release corrente | sempre ok; include `blocked_missing` |

---

## 8. Walkthrough

**A — vuoto.** Timeline tutta buchi. Inbox una foto. Asset `image`, `needs_human` cover vs social. Materiale sì, pezzo no.

**B — creazione.** Due testi → due pezzi. Produttore: incompleti? singoli? Social/stampa ancora domande.

**C — lancio.** Imposti drop date. Nascono task −56…+7. `distributor_upload` è `blocked_missing` se manca cover. Sposti la data di 14 giorni: tutti i dueAt si ricalcolano; i done restano. Tu: 4 storie, 2 post, 3 mail. Librarian sul pitch tira bio se c’è.

**D — ricontatto.** Waiting scaduto. Bozza follow-up, niente “sono sicuri che esce su Rumore”.

**E — import The Distance.** Pezzi proposti dai file. Singoli/stampa/social restano buchi.

---

## 9. Write-back

```
WORK.md
TIMELINE.md
PIECES/…
IDENTITY.md
SOCIAL.md
PRESS/contacts.md
PRESS/outreach/…
```

Adapter thedistance solo su `PIECES` se lo attivi.

---

## 9b. Casellario brani (template Notion/Airtable)

Vista tabella/kanban su `Piece`. Colonne fisse, record 0 all’avvio.

`productionStatus`: `idea | writing | demo | mix | master | released`.  
Inbox wav → proposta `demo`. Testo senza audio → `writing` o `idea`.

`MissingItem`: buchi detti (voci coro, credito produttore…).  
`piece.setProduction(master)` refuse se missing `open` di kind `audio`|`credit`.

Celle `lyrics`, `chords`, allegati audio (N file per pezzo: demo/mix/master).

---

## 10. v1

1. Inbox + famiglie + 8 fasi + holes.report  
2. Tabella brani (stato produzione, missing, testo, accordi, audio)  
3. Librarian  
4. Singoli + outreach + motore lancio  
5. Generate pitch/bio/copy/lyrics sul pack  
6. Export cartella / eml  

---

## 11. Copy

| Dove | Testo |
|---|---|
| Empty | Non c’è un album. Non c’è un lancio. |
| Tabella brani 0 | L’incasellamento c’è, le tracce no. |
| Singoli 0 pezzi | Prima serve almeno un pezzo. |
| Pitch senza bio | Manca la bio: è un buco, non la invento. |
| Social senza numeri | Quante storie, post, foto? |
| Media list vuota | Chi vuoi contattare? Inserisci i nomi. |
| Reset | Nuova incubazione: casellario a zero. |
