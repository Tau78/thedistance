#!/usr/bin/env python3
"""Generate The Distance — concept album presentation PDF."""

from __future__ import annotations

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "ART"
OUT = ROOT / "The-Distance-Presentazione.pdf"
FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"

# Colors (RGB)
BG = (10, 14, 23)
BG_CARD = (18, 24, 38)
TEXT = (232, 236, 244)
MUTED = (136, 146, 160)
CYAN = (0, 212, 255)
MAGENTA = (255, 0, 110)
GOLD = (255, 200, 80)

W, H = 297, 210  # A4 landscape mm

TRACKS = [
    ("01", "1997", "Into the Bore", "The Frantic Caller", "Prologo",
     "L'album si apre con domande su distanza, prova e musica — poi il campionamento del Frantic Caller: la chiamata reale ad Art Bell, 11 settembre 1997. Il segnale cade a metà frase. Il bore si apre."),
    ("02", "5125", "Jaded", "", "Atto I",
     "Il pianeta alla fine. Non un'esplosione, ma un esaurimento — e una voce che non ha più forza tranne quella di incolpare, ricordare, crollare. Fonte di Dadej (reverse)."),
    ("03", "5125", "Room Pt.1", "Echoes from the Void", "Atto I",
     "In una stanza isolata, voci anonime del 5125 intercettano segnali. Non dati — canzoni. Musica dal 1983 che nessuno in quel mondo morto dovrebbe conoscere. Credono sia un pianeta alieno."),
    ("04", "5125", "No Sense", "Our Only Clue", "Atto I",
     "Le canzoni ricevute non sono rumore: sono un codice. I sopravvissuti iniziano a decifrare un linguaggio che esisteva millenni prima di loro. All'inizio «non ha senso», poi emerge il senso nascosto."),
    ("05", "1983", "First Ripples", "", "Atto II",
     "Torniamo al 1983, appena aperto il canale. Radioamatori e scienziati captano echi deboli — non ancora canzoni, non ancora SOS: solo increspature. Qualcosa risponde, confuso."),
    ("06", "5125", "Then Go", "", "Atto II",
     "Il 5125 conferma il collegamento tra i due mondi. Capiscono come il segnale passa — bore, π, radio — e scelgono di procedere. Then go."),
    ("07", "1984", "80s", "Eighties SOS", "Atto III",
     "Il 5125 invia un SOS verso il 1984 — non dati, ma un messaggio disperato in forma di canzone '80. Glitch TV, emissione impossibile, voce dal futuro che chiede soccorso."),
    ("08", "—", "Dadej", "Passage of Pi", "Atto III",
     "Dadej = Jaded al contrario. Il segnale di 80s attraversa il bore e produce l'eco invertita del collasso — ciò che il mondo ha perso, riascoltato al contrario, distorto dal buco nero."),
    ("09", "1984", "Room Pt.2", "The Anthem from Nowhere", "Atto III",
     "Il messaggio arriva sulla Terra del 1984 come successo planetario. Tutti la amano. Celebrazione, mistero, teorie strampalate. Nessuno sa ancora che è un SOS."),
    ("10", "1984", "The Code Within", "", "Atto III",
     "Mentre il mondo balla con l'Anthem, scienziati e musicisti analizzano struttura armonica, testo, video. Pattern anomali, coordinate nascoste. Non è solo musica — è un SOS."),
    ("11", "5125", "ReNew", "The Ark is Built", "Atto IV",
     "Dopo il segnale immateriale, il 5125 compie un gesto concreto: parte la navicella ARK verso il 1983. Contenitore di memoria, canzoni, prove. L'ultima speranza di un mondo morente."),
    ("12", "5125", "Fifth", "Leaving Home", "Atto IV",
     "La ARK si stacca dal suolo. Alle spalle il mondo che muore, davanti le stelle e il bore. Fifth = nome codice missione. Hook: looking through the stars."),
    ("13", "BH01", "Voyage Through Forever", "", "Atto IV",
     "La navicella entra nel bore. Narratore (I) e she attraversano il buco nero. Dolore personale, cicatrici non dette. Anno simbolico: 1983.14159."),
    ("14", "1983", "The Landing", "Knowledge Bearers", "Atto IV",
     "La navicella atterra nel 1983. A bordo: narratore e she. Araldi di un futuro terribile — prove, dati, avvertimenti. Non possono cambiare il passato."),
    ("15", "1984", "Distance Proof", "We Are Them ★ FINALE", "Finale",
     "Nel 1984, voci anonime assemblano tutti i pezzi. La prova emerge: stesso mondo, millenni di distanza, π come moltiplicatore. Tragedia — arriva troppo tardi."),
]


class Presentation(FPDF):
    def __init__(self) -> None:
        super().__init__(orientation="L", unit="mm", format="A4")
        self.set_auto_page_break(auto=False)
        self.add_font("Main", "", FONT)
        self.add_font("Main", "B", FONT)
        self.add_font("Main", "I", FONT)

    def dark_page(self) -> None:
        self.add_page()
        self.set_fill_color(*BG)
        self.rect(0, 0, W, H, style="F")

    def footer_line(self) -> None:
        self.set_draw_color(*CYAN)
        self.set_line_width(0.3)
        self.line(15, H - 12, W - 15, H - 12)
        self.set_font("Main", "", 7)
        self.set_text_color(*MUTED)
        self.set_xy(15, H - 9)
        self.cell(0, 4, "The Distance — Distance Proof Band — Concept Album", align="L")

    def title_block(self, title: str, subtitle: str = "", accent: tuple[int, int, int] = CYAN) -> None:
        self.set_font("Main", "B", 28)
        self.set_text_color(*accent)
        self.set_xy(15, 18)
        self.multi_cell(W - 30, 12, title, align="L")
        if subtitle:
            self.set_font("Main", "", 14)
            self.set_text_color(*MUTED)
            self.set_x(15)
            self.multi_cell(W - 30, 7, subtitle, align="L")

    def body_text(self, text: str, x: float, y: float, w: float, size: int = 11, color: tuple = TEXT) -> None:
        self.set_font("Main", "", size)
        self.set_text_color(*color)
        self.set_xy(x, y)
        self.multi_cell(w, 6, text, align="L")

    def fit_image(self, path: Path, x: float, y: float, max_w: float, max_h: float) -> None:
        from PIL import Image

        with Image.open(path) as img:
            iw, ih = img.size
        ratio = iw / ih
        w = max_w
        h = w / ratio
        if h > max_h:
            h = max_h
            w = h * ratio
        ox = x + (max_w - w) / 2
        oy = y + (max_h - h) / 2
        self.image(str(path), x=ox, y=oy, w=w, h=h)


def build() -> None:
    pdf = Presentation()

    # ── 1. Cover ──
    pdf.dark_page()
    pdf.fit_image(ART / "cover.png", x=15, y=15, max_w=120, max_h=H - 30)
    pdf.set_font("Main", "B", 36)
    pdf.set_text_color(*CYAN)
    pdf.set_xy(145, 35)
    pdf.multi_cell(140, 14, "THE DISTANCE", align="L")
    pdf.set_font("Main", "", 16)
    pdf.set_text_color(*TEXT)
    pdf.set_x(145)
    pdf.multi_cell(140, 8, "Concept Album", align="L")
    pdf.set_font("Main", "I", 13)
    pdf.set_text_color(*MUTED)
    pdf.set_x(145)
    pdf.multi_cell(140, 7, "Distance Proof Band", align="L")
    pdf.body_text(
        "Due epoche. Un solo mondo.\nLe canzoni come linguaggio.\n5125 = 1983 × π",
        145, 95, 135, size=13, color=TEXT,
    )
    pdf.set_font("Main", "", 10)
    pdf.set_text_color(*GOLD)
    pdf.set_xy(145, H - 35)
    pdf.cell(0, 5, "Presentazione concept · 15 tracce · Sci-fi synthwave / alt rock")

    # ── 2. Premessa ──
    pdf.dark_page()
    pdf.title_block("Premessa", "Il concept in sintesi")
    pdf.body_text(
        "Sin dal 1983 un buco nero — the bore — apre un canale tra il nostro passato "
        "e un futuro lontano. I segnali viaggiano in entrambe le direzioni, filtrati da π.\n\n"
        "Il mondo del 5125 (= 1983 × 3,14) è la Terra alla fine: collassata, morente. "
        "Non conosce la storia del passato. Riceve radio e canzoni dal 1983 e crede di "
        "ascoltare un pianeta alieno. Interpreta la musica come linguaggio.\n\n"
        "Il mondo del 1984 — un anno dopo l'apertura del canale — riceve le risposte "
        "musicali del futuro: prima una hit misteriosa, poi un SOS.\n\n"
        "Stesso mondo. Millenni di distanza. π come moltiplicatore temporale.",
        15, 55, W - 30, size=12,
    )
    pdf.footer_line()

    # ── 3. Flusso segnali ──
    pdf.dark_page()
    pdf.title_block("Flusso dei segnali", "Comunicazione bidirezionale attraverso the bore")
    flows = [
        ("1983 → 5125", "Radio, canzoni, cultura '80", "Room Pt.1 · No Sense", CYAN),
        ("5125 → 1984", "Risposta musicale, SOS, hit", "Then Go · 80s · Room Pt.2", MAGENTA),
        ("5125 → 1983", "Navicella ARK, knowledge bearers", "ReNew · Fifth · Voyage · Landing", GOLD),
        ("1984", "Scoperta, prova tragica", "Code Within · Distance Proof ★", TEXT),
    ]
    y = 52
    for direction, what, tracks, color in flows:
        pdf.set_fill_color(*BG_CARD)
        pdf.rect(15, y, W - 30, 28, style="F")
        pdf.set_font("Main", "B", 13)
        pdf.set_text_color(*color)
        pdf.set_xy(20, y + 4)
        pdf.cell(60, 6, direction)
        pdf.set_font("Main", "", 11)
        pdf.set_text_color(*TEXT)
        pdf.set_xy(20, y + 12)
        pdf.cell(0, 5, what)
        pdf.set_text_color(*MUTED)
        pdf.set_xy(20, y + 19)
        pdf.cell(0, 5, tracks)
        y += 33
    pdf.footer_line()

    # ── 4. Atti ──
    pdf.dark_page()
    pdf.title_block("Struttura narrativa", "5 atti + prologo")
    acts = [
        ("PROLOGO", "01 Into the Bore", "Radio, Area 51, canzoni = messaggi"),
        ("ATTO I", "02 Jaded → 03 Room Pt.1 → 04 No Sense", "Il futuro ascolta — crede: alieni"),
        ("ATTO II", "05 First Ripples → 06 Then Go", "Il passato sente — connessione confermata"),
        ("ATTO III", "07 80s → 08 Dadej → 09 Room Pt.2 → 10 Code Within", "L'SOS e la hit planetaria"),
        ("ATTO IV", "11 ReNew → 12 Fifth → 13 Voyage → 14 Landing", "L'ultimo gesto — la navicella"),
        ("FINALE", "15 Distance Proof ★", "Stesso mondo, π, tragedia — chiude l'album"),
    ]
    y = 48
    for act, tracks, desc in acts:
        pdf.set_font("Main", "B", 11)
        pdf.set_text_color(*CYAN)
        pdf.set_xy(15, y)
        pdf.cell(28, 6, act)
        pdf.set_font("Main", "B", 10)
        pdf.set_text_color(*TEXT)
        pdf.set_xy(43, y)
        pdf.cell(0, 6, tracks)
        pdf.set_font("Main", "", 9)
        pdf.set_text_color(*MUTED)
        pdf.set_xy(43, y + 6)
        pdf.cell(0, 5, desc)
        y += 22
    pdf.footer_line()

    # ── 5. Band identity ──
    pdf.dark_page()
    pdf.title_block("Distance Proof Band", "Identità visiva")
    pdf.fit_image(ART / "band-dpb.png", x=15, y=48, max_w=110, max_h=120)
    pdf.body_text(
        "Estetica cinematic sci-fi e synthwave:\n\n"
        "• Cover split 5125/1983 con π al centro\n"
        "• Cassette analogiche e città spaziali\n"
        "• Neon, VHS, deserto, bore all'orizzonte\n"
        "• Torri in rovina, control room, hangar ARK\n\n"
        "Generazione artwork: AI cinematic · palette synthwave/neon\n"
        "Produzione musicale: Suno AI · synth-pop, new wave, alt rock",
        135, 55, 150, size=11,
    )
    pdf.footer_line()

    # ── 6. Tracklist overview ──
    pdf.dark_page()
    pdf.title_block("Tracklist", "15 tracce — anno a 4 cifre come prefisso nel titolo")
    cols = [(15, 90), (108, 90), (201, 90)]
    for i, (num, year, title, sub, act, _) in enumerate(TRACKS):
        col = i // 5
        row = i % 5
        x, cw = cols[col]
        y = 48 + row * 28
        label = f"{num}. [{year}] {title}"
        if sub:
            label += f" ({sub})"
        pdf.set_font("Main", "B" if num == "15" else "", 9)
        pdf.set_text_color(*GOLD if num == "15" else TEXT)
        pdf.set_xy(x, y)
        pdf.multi_cell(cw, 4.5, label, align="L")
        pdf.set_font("Main", "", 7)
        pdf.set_text_color(*MUTED)
        pdf.set_xy(x, y + 10)
        pdf.cell(cw, 4, act)
    pdf.footer_line()

    # ── 7–21. Track slides ──
    for num, year, title, sub, act, concept in TRACKS:
        pdf.dark_page()
        img_path = ART / f"{num}-{title.lower().replace(' ', '-').replace('.', '')}.png"
        # Fix filenames that don't match pattern
        name_map = {
            "01": "01-into-the-bore.png",
            "02": "02-jaded.png",
            "03": "03-room-pt1.png",
            "04": "04-no-sense.png",
            "05": "05-first-ripples.png",
            "06": "06-then-go.png",
            "07": "07-80s.png",
            "08": "08-dadej.png",
            "09": "09-room-pt2.png",
            "10": "10-the-code-within.png",
            "11": "11-renew.png",
            "12": "12-fifth.png",
            "13": "13-voyage-through-forever.png",
            "14": "14-the-landing.png",
            "15": "15-distance-proof.png",
        }
        img_path = ART / name_map[num]

        pdf.fit_image(img_path, x=15, y=15, max_w=115, max_h=H - 30)

        full_title = f"{num} — {title}"
        if sub:
            full_title += f"\n{sub}"
        pdf.set_font("Main", "B", 22)
        pdf.set_text_color(*GOLD if num == "15" else CYAN)
        pdf.set_xy(138, 18)
        pdf.multi_cell(150, 10, full_title, align="L")

        pdf.set_font("Main", "B", 10)
        pdf.set_text_color(*MAGENTA)
        pdf.set_xy(138, 52)
        pdf.cell(0, 5, f"Epoca: {year}  ·  {act}")

        pdf.body_text(concept, 138, 65, 150, size=11)

        pdf.set_font("Main", "", 8)
        pdf.set_text_color(*MUTED)
        pdf.set_xy(138, H - 25)
        pdf.cell(0, 4, f"Artwork: ART/{name_map[num]}")
        pdf.footer_line()

    # ── 22. Simboli ──
    pdf.dark_page()
    pdf.title_block("Simboli e elementi ricorrenti")
    symbols = [
        ("π (3,14)", "5125 = 1983 × π — distorsione temporale, motivo musicale 3-1-4"),
        ("The Bore", "Buco nero / wormhole — il foro da cui escono le informazioni"),
        ("Canzone", "Linguaggio, messaggio, SOS interdimensionale"),
        ("Room", "Pt.1 = ascolto nel 5125 · Pt.2 = celebrazione nel 1984"),
        ("Navicella ARK", "Ultimo baluardo umano — memoria, conoscenza, viaggio"),
        ("Narratore + She", "Compagni di viaggio dal 5125 al 1983 — cicatrici e speranza"),
    ]
    y = 50
    for sym, meaning in symbols:
        pdf.set_font("Main", "B", 12)
        pdf.set_text_color(*CYAN)
        pdf.set_xy(15, y)
        pdf.cell(0, 6, sym)
        pdf.set_font("Main", "", 11)
        pdf.set_text_color(*TEXT)
        pdf.set_xy(15, y + 7)
        pdf.multi_cell(W - 30, 6, meaning, align="L")
        y += 22
    pdf.footer_line()

    # ── 23. Bonus Cassandra ──
    pdf.dark_page()
    pdf.title_block("Bonus — The Cassandra Complex", "Tagliato dal canon · epilogo alternativo")
    pdf.fit_image(ART / "bonus-cassandra-complex.png", x=15, y=48, max_w=120, max_h=120)
    pdf.body_text(
        "Rivelazione finale devastante (non in album): l'arrivo dei viaggiatori e le "
        "conoscenze introdotte diventano — nei secoli — i semi della distruzione che "
        "porta al 5125. Ironia cosmica, scherzo crudele di π.\n\n"
        "«The gift we brought became the curse, in Pi's eternal rhyme.»\n\n"
        "Il canon attuale chiude con Distance Proof — tragedia immediata, non loop causale.",
        145, 55, 140, size=11,
    )
    pdf.footer_line()

    # ── 24. Closing ──
    pdf.dark_page()
    pdf.fit_image(ART / "15-distance-proof.png", x=W / 2 - 50, y=20, max_w=100, max_h=70)
    pdf.set_font("Main", "B", 30)
    pdf.set_text_color(*GOLD)
    pdf.set_xy(15, 100)
    pdf.cell(W - 30, 12, "Distance Proof", align="C")
    pdf.set_font("Main", "", 14)
    pdf.set_text_color(*TEXT)
    pdf.set_xy(15, 118)
    pdf.cell(W - 30, 8, "We Are Them — il finale", align="C")
    pdf.set_font("Main", "I", 12)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(15, 135)
    pdf.multi_cell(W - 30, 7,
        "«Does the sound of a rock and roll band reach the furthest galaxy?»\n"
        "Where's the proof we're looking for.",
        align="C",
    )
    pdf.set_font("Main", "", 10)
    pdf.set_text_color(*CYAN)
    pdf.set_xy(15, H - 30)
    pdf.cell(W - 30, 5, "The Distance · Distance Proof Band · Concept Album 2025", align="C")

    pdf.output(str(OUT))
    print(f"Created: {OUT} ({pdf.page_no()} pages)")


if __name__ == "__main__":
    build()
