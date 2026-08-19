# The Distance Desk

Banco di produzione per **un solo lavoro**: il concept album *The Distance* (Distance Proof Band).

Non è uno studio AI generico. È uno **scaffale** con le caselle di questo album. Tu inserisci piano piano ciò che hai già. La app lo incasella. Poi tu e le AI riempite solo i buchi, restando coerenti con il materiale approvato.

Il piano completo è in [`PIANO.md`](PIANO.md). Il loop eroe (inbox → casella → buco) è specificato stato-per-stato in [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md).

| File | Contenuto |
|---|---|
| [`PIANO.md`](PIANO.md) | Spec completa: loop, stack, UI, AI, flussi, API, canone |
| [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md) | Macchine a stati, classifier, walkthrough, write-back |
| [`UI.md`](UI.md) | Wireframe pagina per pagina |
| [`schema.ts`](schema.ts) | Modello di dominio tipizzato (contratto implementativo) |
| [`matrice-completezza.json`](matrice-completezza.json) | Stato reale delle 15 tracce oggi, letto dal repo |

## Loop in una riga

**Inbox → proposta di casella → conferma umana → scaffale con buchi visibili → generazione vincolata → bozza → approvazione → write-back sul markdown del repo.**
