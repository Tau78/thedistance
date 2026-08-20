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

/** Pipeline da studio, stile template Notion/Airtable Music Release. */
export type ProductionStatus = "idea" | "writing" | "demo" | "mix" | "master" | "released";

export const PRODUCTION_STATUS_ORDER: ProductionStatus[] = [
  "idea",
  "writing",
  "demo",
  "mix",
  "master",
  "released",
];

export type MissingKind =
  | "vocal"
  | "chorus_vocal"
  | "lyric"
  | "chord"
  | "audio"
  | "credit"
  | "artwork"
  | "other";

export interface MissingItem {
  id: string;
  pieceId: string;
  kind: MissingKind;
  label: string;
  status: "open" | "resolved" | "accepted_na";
}

export type PieceCellKind =
  | "meta"
  | "concept"
  | "lyrics"
  | "chords"
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

export type SocialFormat =
  | "story"
  | "post"
  | "reel"
  | "photo"
  | "carousel"
  | "photoshoot"
  | "official_video"
  | "other";

export type OutreachKind = "first_touch" | "follow_up" | "thank_you" | "promo" | "other";

/** Stato del contatto in promozione (scheda CRM). */
export type ContactPromoStatus =
  | "to_contact"
  | "email_sent"
  | "waiting_reply"
  | "review_confirmed";

export interface ContentLine {
  id: string;
  workId: string;
  releaseId: string | null;
  format: SocialFormat;
  label: string;
  planned: number;
  done: number;
  /** Se done < planned, è un buco visibile. */
}

/** Righe suggerite del piano contenuti (editabili, non obbligatorie). */
export const CONTENT_LINE_DEFAULTS: Omit<ContentLine, "id" | "workId" | "releaseId" | "done">[] =
  [
    { format: "reel", label: "Reel di backstage", planned: 3 },
    { format: "story", label: "Storie di annuncio", planned: 5 },
    { format: "photoshoot", label: "Photoshoot ufficiale", planned: 1 },
    { format: "official_video", label: "Video ufficiale", planned: 1 },
  ];

export interface EmailTemplate {
  id: string;
  workId: string;
  kind: "press_kit" | "pitch" | "follow_up" | "presave" | "out_now" | "fan_update" | "custom";
  title: string;
  body: string;
  html?: string;
}

export type MarketingPhase = "presave" | "release_week" | "post_release";
export type MarketingStatus = "draft" | "scheduled" | "published" | "completed";

export interface MarketingActivity {
  id: string;
  releaseId: string;
  title: string;
  platform: string;
  phase: MarketingPhase;
  status: MarketingStatus;
  date: string | null;
  contentLineId: string | null;
}

export interface MetadataField {
  key: string;
  label: string;
  value: string | null;
  requiredForDistributor: boolean;
}

export const METADATA_DSP_FIELDS: Omit<MetadataField, "value">[] = [
  { key: "artist", label: "Artista", requiredForDistributor: true },
  { key: "title", label: "Titolo", requiredForDistributor: true },
  { key: "version", label: "Versione", requiredForDistributor: false },
  { key: "primary_genre", label: "Genere primario", requiredForDistributor: true },
  { key: "isrc", label: "ISRC", requiredForDistributor: false },
  { key: "upc", label: "UPC", requiredForDistributor: false },
  { key: "mood", label: "Mood", requiredForDistributor: false },
  { key: "language", label: "Lingua", requiredForDistributor: false },
];

export interface BudgetLine {
  id: string;
  workId: string;
  description: string;
  amount: number;
  category: string;
  payment: "planned" | "pending" | "paid";
}

export type SlotTarget =
  | { scope: "work"; cell: WorkCellKind }
  | { scope: "piece"; pieceId: string; cell: PieceCellKind }
  | { scope: "missing"; pieceId: string; missingId?: string }
  | { scope: "new_piece"; suggestedTitle?: string; cell: PieceCellKind }
  | { scope: "asset"; assetId?: string; kind: AssetKind }
  | { scope: "new_asset"; kind: AssetKind }
  | { scope: "single"; pieceId?: string }
  | { scope: "identity"; field: "bio" | "artist" | "name" | "photo" | "logo" }
  | { scope: "social_item"; itemId?: string; format?: SocialFormat }
  | { scope: "content_line"; lineId?: string }
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
  productionStatus: ProductionStatus;
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

export type ContactKind =
  | "magazine"
  | "blog"
  | "radio"
  | "playlist_curator"
  | "journalist"
  | "influencer"
  | "distributor"
  | "other";

export type ReleaseFormat = "single" | "ep" | "album" | "unspecified";

export interface Contact {
  id: string;
  workId: string;
  kind: ContactKind;
  name: string | null;
  outlet: string | null;
  role: string | null;
  email: string | null;
  promoStatus: ContactPromoStatus;
  tags: string[];
  lastOutcome: string | null;
  status: CellStatus;
}

export interface Release {
  id: string;
  workId: string;
  format: ReleaseFormat;
  /** Drop day. Se cambia, ricalcolare tutti i ReleaseTask.dueAt. */
  dropDate: string | null;
  pieceIds: string[];
  status: CellStatus;
}

export interface ReleaseTaskTemplate {
  code: string;
  /** Giorni rispetto al drop: negativi = prima, 0 = giorno, positivi = dopo. */
  offsetDays: number;
  title: string;
  phase: PhaseId;
  /** Caselle che devono esistere/essere approved, o il task resta "blocked_missing". */
  requires: string[];
}

/**
 * Default di mestiere 2026 (indie), ispirate a Orphiq / ReleaseLoop / Harment Release Aid.
 * Editabili per incubazione. Non sono contenuti d'album.
 */
export const RELEASE_TASK_TEMPLATES: ReleaseTaskTemplate[] = [
  { code: "lock_master", offsetDays: -56, title: "Chiudi master, credits, metadata", phase: "prodotto", requires: ["piece.audio_take", "work.credits"] },
  { code: "lock_artwork", offsetDays: -56, title: "Chiudi cover e foto", phase: "identita", requires: ["asset.cover"] },
  { code: "distributor_upload", offsetDays: -42, title: "Invia master e metadata al distributore", phase: "prodotto", requires: ["piece.audio_take", "asset.cover", "work.credits"] },
  { code: "presave", offsetDays: -28, title: "Apri pre-save / pre-order", phase: "lancio", requires: ["release.dropDate"] },
  { code: "s4a_editorial", offsetDays: -28, title: "Pitch Spotify for Artists (editoriale)", phase: "lancio", requires: ["piece.audio_take", "identity.one_liner"] },
  { code: "press_first_touch", offsetDays: -14, title: "Invia le e-mail alla stampa e ai blog", phase: "stampa", requires: ["contact.press", "outreach.pitch"] },
  { code: "curator_first_touch", offsetDays: -14, title: "Pitch ai playlist curator", phase: "stampa", requires: ["contact.curator"] },
  { code: "social_teasers", offsetDays: -10, title: "Teaser social (storie/post/foto)", phase: "social", requires: ["social.plan"] },
  { code: "release_day", offsetDays: 0, title: "Giorno di uscita: push canali + stampa", phase: "lancio", requires: ["release.dropDate"] },
  { code: "press_followup", offsetDays: 7, title: "Ricontatti stampa / curator", phase: "ricontatti", requires: ["outreach.sent"] },
];

export interface ReleaseTask {
  id: string;
  releaseId: string;
  templateCode: string;
  title: string;
  offsetDays: number;
  dueAt: string | null;
  status: CellStatus | "blocked_missing";
  missing: string[];
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
  { code: "production_pipeline", phase: "creazione", question: "Dove sono i brani in Idea / Scrittura / Demo / Mix / Master?", resolvedIf: "ogni pezzo ha productionStatus; missing aperti visibili" },
  { code: "singles", phase: "prodotto", question: "Quali sono i singoli?", resolvedIf: "≥1 SinglePlan approved o N/A" },
  { code: "listen_order", phase: "prodotto", question: "C'è un ordine d'ascolto?", resolvedIf: "listenOrder.length ≥1 o 1 pezzo" },
  { code: "credits", phase: "prodotto", question: "Ci sono i credits?", resolvedIf: "credits approved o N/A" },
  { code: "name_artist", phase: "identita", question: "Come si chiama il progetto / chi è l'artista?", resolvedIf: "title o artist approved" },
  { code: "bio", phase: "identita", question: "C'è una bio?", resolvedIf: "bio approved" },
  { code: "cover", phase: "identita", question: "C'è una cover / foto?", resolvedIf: "cover o press_photo approved" },
  { code: "epk", phase: "identita", question: "C'è un EPK / one-liner?", resolvedIf: "epk o one_liner approved" },
  { code: "social_counts", phase: "social", question: "Quante storie, post, foto per ogni drop?", resolvedIf: "conteggi ContentLine decisi o N/A" },
  { code: "social_assets", phase: "social", question: "Hai i contenuti social?", resolvedIf: "ogni ContentLine done≥planned o buco accettato" },
  { code: "singles_matrix", phase: "prodotto", question: "Quali e quanti brani diventano singoli?", resolvedIf: "SinglePlan confermati o N/A" },
  { code: "press_who", phase: "stampa", question: "Chi vuoi contattare?", resolvedIf: "≥1 contact o N/A" },
  { code: "press_emails", phase: "stampa", question: "Le mail a riviste/blog sono scritte?", resolvedIf: "template pitch + outreach o N/A" },
  { code: "press_timing", phase: "stampa", question: "Tempistiche contatti e ricontatti?", resolvedIf: "dueAt/waitDays sulle outreach" },
  { code: "launch_date", phase: "lancio", question: "Quando esce?", resolvedIf: "Release.dropDate o launchDate" },
  { code: "distributor", phase: "prodotto", question: "Il master è stato inviato al distributore nei tempi?", resolvedIf: "task distributor_upload done o N/A" },
  { code: "s4a", phase: "lancio", question: "Hai fatto il pitch su Spotify for Artists?", resolvedIf: "task s4a_editorial done o N/A" },
  { code: "presave", phase: "lancio", question: "Pre-save / pre-order aperti?", resolvedIf: "task presave done o N/A" },
  { code: "launch_week", phase: "lancio", question: "La settimana di lancio è coperta?", resolvedIf: "task release_day senza hole block" },
  { code: "followups_due", phase: "ricontatti", question: "Chi è in attesa di ricontatto / sollecito?", resolvedIf: "nessuna outreach waiting scaduta" },
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
  {
    task: "distributor_upload",
    phase: "prodotto",
    pull: ["piece", "asset", "identity"],
  },
  {
    task: "s4a_pitch",
    phase: "lancio",
    pull: ["piece", "identity", "asset"],
  },
];

export const DEFAULT_PIECE_CELLS: PieceCellKind[] = [
  "meta",
  "concept",
  "lyrics",
  "chords",
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

/** Bit che l'incubazione vuole tenere d'occhio (scheda "definisci i mancanti"). Vuoto = tutti i METHOD_HOLES. */
export type WatchBit =
  | "audio"
  | "lyrics"
  | "cover"
  | "bio"
  | "press_kit"
  | "social_reel"
  | "social_feed"
  | "credits";

export interface ActivityEvent {
  id: string;
  workId: string;
  at: string;
  text: string;
  actor: "you" | "ai" | "import";
}
