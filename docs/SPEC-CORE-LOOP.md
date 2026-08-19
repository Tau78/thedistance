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

## 5. Timeline

Ogni fase ha eventi 0…N.  
`timeline.proposeBackward(launchDate)`:

- non gira senza pezzi **o** senza conferma “anche senza pezzi, solo stampa” (flag tuo);
- propone eventi e `waitDays` come *draft*;
- non crea 20 post: crea 1 evento “pianificare social” se i conteggi mancano.

Dipendenze: pitch dopo identità minima (bio o one-liner o tu accetti eccezione).

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
| `timeline_proposal` | launchDate o la chiede | — |
| `missing_report` | work corrente | sempre ok |

---

## 8. Walkthrough

**A — vuoto.** Timeline tutta buchi. Inbox una foto. Asset `image`, `needs_human` cover vs social. Materiale sì, pezzo no.

**B — creazione.** Due testi → due pezzi. Produttore: incompleti? singoli? Social/stampa ancora domande.

**C — lancio.** Singolo + data. Proposta a ritroso. Tu: 4 storie, 2 post, 3 mail. Nascono slot. Librarian sul pitch tira bio se c’è.

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

## 10. v1

1. Inbox + famiglie + 8 fasi + holes.report  
2. Librarian  
3. Singoli + outreach stati + reminder  
4. proposeBackward  
5. Generate pitch/bio/copy/lyrics sul pack  
6. Export cartella / eml  

---

## 11. Copy

| Dove | Testo |
|---|---|
| Empty | Non c’è un album. Non c’è un lancio. |
| Singoli 0 pezzi | Prima serve almeno un pezzo. |
| Pitch senza bio | Manca la bio: è un buco, non la invento. |
| Social senza numeri | Quante storie, post, foto? |
| Media list vuota | Chi vuoi contattare? Inserisci i nomi. |
| Reset | Nuova incubazione: casellario a zero. |
