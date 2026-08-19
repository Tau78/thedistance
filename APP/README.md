# Incubatore

Banco vuoto per **completare un lavoro musicale che ancora non esiste come oggetto**.

All’apertura non c’è un album, non ci sono tracce, non c’è un genere, non c’è un titolo. Non esistono 15 scaffali: il numero delle tracce **non è noto** alla creazione. Nomi, argomenti, epoche, personaggi arrivano solo da ciò che inserisci e confermi.

The Distance (Room, ReNew, Dadej, π…) è **un** lavoro, irripetibile. Può entrare nell’incubatore come materiale. Non è lo scheletro dell’app.

| File | Contenuto |
|---|---|
| [`PIANO.md`](PIANO.md) | Spec: incubatore vuoto, nascita delle caselle, stack, AI, UI, flussi |
| [`../docs/SPEC-CORE-LOOP.md`](../docs/SPEC-CORE-LOOP.md) | Stati, classifier, walkthrough, write-back |
| [`UI.md`](UI.md) | Wireframe pagina per pagina (stato vuoto e stato dopo l’ingest) |
| [`schema.ts`](schema.ts) | Contratto di dominio — nessuna costante di un album |
| [`esempio-the-distance.json`](esempio-the-distance.json) | Cosa *emergerebbe* importando questo repo — non il default |

## Loop

**Inbox → la app propone di *creare* o *riempire* una casella → confermi → lo scaffale cresce → genera solo i buchi del materiale approvato.**
