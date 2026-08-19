/**
 * Incubatore — dominio.
 * Il contenuto dell'album non è precotto (0 pezzi, titolo/genere null).
 * Il *programma di lavoro* sì: una spina dalla raccolta al lancio,
 * con caselle vuote che si riempiono quando inserisci o confermi.
 */

export type CellStatus =
  | "empty"
  | "partial"
  | "draft"
  | "slotted"
  | "generated"
  | "approved"
  | "locked"
  | "not_applicable"
  | "scheduled"
  | "sent"
  | "waiting"
  | "done";

export type InboxKind =
  | "text_paste"
  | "markdown"
  | "odt_rtf"
  | "audio"
  | "image"
  | "video"
  | "pdf"
  | "url"
  | "voice_memo"
  | "generator_link"
  | "git_repo"
  | "screenshot"
  | "email_draft"
  | "contact_card"
  | "unknown";

export type InboxStatus =
  | "received"
  | "classifying"
  | "proposed"
  | "needs_human"
  | "conflict"
  | "accepted"
  | "rejected"
  | "archived";

/** Spina di metodo: non è l'album, è il percorso creazione → lancio. */
export type PhaseId =
  | "raccolta"
  | "creazione"
  | "prodotto"
  | "identita"
  | "social"
  | "stampa"
  | "lancio"
  | "ricontatti";

export const PHASE_ORDER: PhaseId[] = [
  "raccolta",
  "creazione",
  "prodotto",
  "identita",
  "social",
  "stampa",
  "lancio",
  "ricontatti",
];

export type DrawerFamily =
  | "piece"
  | "work"
  | "asset"
  | "single"
  | "identity"
  | "social"
  | "press"
  | "timeline"
  | "decision"
  | "research";

export type PieceCellKind =
  | "meta"
  | "concept"
  | "lyrics"
  | "translation"
  | "analysis"
  | "style_prompt"
  | "gen_lyrics"
  | "artwork"
  | "audio_take"
  | "links"
  | "open_questions"
  | "archive"
  | "custom";

export type WorkCellKind =
  | "title"
  | "concept"
  | "story"
  | "listen_order"
  | "credits"
  | "notes";

export type AssetKind =
  | "audio"
  | "image"
  | "video"
  | "document"
  | "bio"
  | "one_liner"
  | "epk"
  | "press_photo"
  | "cover"
  | "logo"
  | "lyric_card"
  | "other";

export type SocialFormat = "story" | "post" | "reel" | "photo" | "carousel" | "other";

export type OutreachKind = "first_touch" | "follow_up" | "thank_you" | "promo" | "other";

export type SlotTarget =
  | { scope: "work"; cell: WorkCellKind }
  | { scope: "piece"; pieceId: string; cell: PieceCellKind }
  | { scope: "new_piece"; suggestedTitle?: string; cell: PieceCellKind }
  | { scope: "asset"; assetId?: string; kind: AssetKind }
  | { scope: "new_asset"; kind: AssetKind }
  | { scope: "single"; pieceId?: string }
  | { scope: "identity"; field: "bio" | "artist" | "name" | "photo" | "logo" }
  | { scope: "social_item"; itemId?: string; format?: SocialFormat }
  | { scope: "contact"; contactId?: string }
  | { scope: "outreach"; outreachId?: string }
  | { scope: "timeline"; eventId?: string; phase?: PhaseId }
  | { scope: "decision"; decisionId?: string; newQuestion?: string }
  | { scope: "research"; topicId?: string }
  | { scope: "uncertain" };

export type GenerationKind =
  | "lyrics"
  | "translation"
  | "analysis"
  | "style_prompt"
  | "artwork_brief"
  | "artwork_image"
  | "audio_official"
  | "export_pack"
  | "bio"
  | "one_liner"
  | "epk"
  | "pitch_email"
  | "follow_up_email"
  | "social_copy"
  | "social_plan"
  | "single_proposal"
  | "timeline_proposal"
  | "missing_report"
  | "press_list_gaps"
  | "propose_structure";

export type AgentRole =
  | "classifier"
  | "steward"
  | "lyricist"
  | "translator"
  | "analyst"
  | "prompt_engineer"
  | "art_director"
  | "researcher"
  | "continuity_editor"
  | "producer"
  | "press_officer"
  | "social_editor"
  | "librarian";

export interface Work {
  id: string;
  title: string | null;
  artist: string | null;
  genre: string | null;
  listenOrder: string[];
  /** Data ancora ignota finché non la locki. */
  launchDate: string | null;
  createdAt: string;
}

export interface Piece {
  id: string;
  index: number | null;
  title: string | null;
  subtitle: string | null;
  labels: Record<string, string>;
  specialRules: SpecialRule[];
}

export interface SpecialRule {
  id: string;
  rule: string;
  locked: boolean;
  sourceItemId?: string;
}

export interface Cell {
  id: string;
  workId: string;
  pieceId: string | null;
  kind: string;
  status: CellStatus;
  currentVersionId: string | null;
}

export interface ItemVersion {
  id: string;
  cellId: string;
  origin: "imported" | "generated" | "human_edit";
  bodyMarkdown: string;
  locale?: string;
  createdAt: string;
  approvedAt: string | null;
  model?: string;
  parentVersionId?: string;
}

export interface Asset {
  id: string;
  workId: string;
  pieceId: string | null;
  kind: AssetKind;
  title: string | null;
  storageKey: string | null;
  status: CellStatus;
  usableOn: PhaseId[];
}

export interface SinglePlan {
  id: string;
  workId: string;
  pieceId: string;
  wave: number;
  releaseDate: string | null;
  status: CellStatus;
}

export interface SocialItem {
  id: string;
  workId: string;
  format: SocialFormat;
  channel: string | null;
  copy: string | null;
  assetIds: string[];
  pieceId: string | null;
  scheduledAt: string | null;
  status: CellStatus;
}

export interface Contact {
  id: string;
  workId: string;
  name: string | null;
  outlet: string | null;
  role: string | null;
  email: string | null;
  tags: string[];
  status: CellStatus;
}

export interface Outreach {
  id: string;
  workId: string;
  contactId: string;
  kind: OutreachKind;
  subject: string | null;
  body: string | null;
  assetIds: string[];
  dueAt: string | null;
  sentAt: string | null;
  waitDays: number | null;
  status: CellStatus;
}

export interface TimelineEvent {
  id: string;
  workId: string;
  phase: PhaseId;
  title: string;
  dueAt: string | null;
  dependsOn: string[];
  holeCodes: string[];
  status: CellStatus;
}

/** Buchi di metodo: esistono come domande, non come contenuti d'album. */
export interface MethodHole {
  code: string;
  phase: PhaseId;
  question: string;
  /** Quando è "risolto": regola, non lore. */
  resolvedIf: string;
}

export const METHOD_HOLES: MethodHole[] = [
  { code: "has_any_material", phase: "raccolta", question: "Cosa hai già?", resolvedIf: "≥1 item accepted" },
  { code: "has_piece", phase: "creazione", question: "Esiste almeno un pezzo?", resolvedIf: "≥1 piece" },
  { code: "piece_holes", phase: "creazione", question: "Quali pezzi sono incompleti?", resolvedIf: "report vuoto o accettato" },
  { code: "singles", phase: "prodotto", question: "Quali sono i singoli?", resolvedIf: "≥1 SinglePlan approved o N/A" },
  { code: "listen_order", phase: "prodotto", question: "C'è un ordine d'ascolto?", resolvedIf: "listenOrder.length ≥1 o 1 pezzo" },
  { code: "credits", phase: "prodotto", question: "Ci sono i credits?", resolvedIf: "credits approved o N/A" },
  { code: "name_artist", phase: "identita", question: "Come si chiama il progetto / chi è l'artista?", resolvedIf: "title o artist approved" },
  { code: "bio", phase: "identita", question: "C'è una bio?", resolvedIf: "bio approved" },
  { code: "cover", phase: "identita", question: "C'è una cover / foto?", resolvedIf: "cover o press_photo approved" },
  { code: "epk", phase: "identita", question: "C'è un EPK / one-liner?", resolvedIf: "epk o one_liner approved" },
  { code: "social_counts", phase: "social", question: "Quante storie, post, foto per ogni drop?", resolvedIf: "social plan approved o N/A" },
  { code: "social_assets", phase: "social", question: "Hai i contenuti social?", resolvedIf: "conteggi pianificati coperti da item o buchi accettati" },
  { code: "press_who", phase: "stampa", question: "Chi vuoi contattare?", resolvedIf: "≥1 contact o N/A" },
  { code: "press_emails", phase: "stampa", question: "Le mail a riviste/blog sono scritte?", resolvedIf: "outreach first_touch drafted/approved o N/A" },
  { code: "press_timing", phase: "stampa", question: "Tempistiche contatti e ricontatti?", resolvedIf: "dueAt/waitDays sulle outreach" },
  { code: "launch_date", phase: "lancio", question: "Quando esce?", resolvedIf: "launchDate o evento lancio dated" },
  { code: "launch_week", phase: "lancio", question: "La settimana di lancio è coperta?", resolvedIf: "timeline fase lancio senza hole block" },
  { code: "followups_due", phase: "ricontatti", question: "Chi è in attesa di ricontatto?", resolvedIf: "nessuna outreach waiting scaduta" },
];

export interface ContextNeed {
  /** Cosa sta facendo l'utente. */
  task: string;
  phase: PhaseId;
  /** Famiglie da mostrare a destra, se esistono. */
  pull: DrawerFamily[];
}

export const SHOW_WHEN_NEEDED: ContextNeed[] = [
  {
    task: "scrivere_testo_pezzo",
    phase: "creazione",
    pull: ["piece", "work", "decision"],
  },
  {
    task: "scegliere_singoli",
    phase: "prodotto",
    pull: ["piece", "asset"],
  },
  {
    task: "scrivere_pitch",
    phase: "stampa",
    pull: ["identity", "single", "asset", "press"],
  },
  {
    task: "preparare_post",
    phase: "social",
    pull: ["identity", "single", "asset", "social"],
  },
  {
    task: "giorno_lancio",
    phase: "lancio",
    pull: ["timeline", "social", "press", "identity", "single"],
  },
];

export const DEFAULT_PIECE_CELLS: PieceCellKind[] = [
  "meta",
  "concept",
  "lyrics",
  "translation",
  "analysis",
  "style_prompt",
  "gen_lyrics",
  "artwork",
  "audio_take",
  "links",
  "open_questions",
];

export const INITIAL_DECISIONS: never[] = [];
