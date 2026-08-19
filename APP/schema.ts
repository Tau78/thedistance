/**
 * Incubatore — dominio.
 * Nessun album, traccia, genere, epoca o decisione è precotto.
 * Le istanze nascono dall'inbox + conferma umana.
 */

export type CellKind =
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
  | "sample_ref"
  | "archive"
  | "custom";

export type WorkCellKind =
  | "title"
  | "concept"
  | "story"
  | "listen_order"
  | "decisions"
  | "style_bible"
  | "cover"
  | "identity"
  | "presentation"
  | "notes";

export type CellStatus =
  | "empty"
  | "partial"
  | "draft"
  | "slotted"
  | "generated"
  | "approved"
  | "locked"
  | "not_applicable";

export type InboxKind =
  | "text_paste"
  | "markdown"
  | "odt_rtf"
  | "audio"
  | "image"
  | "pdf"
  | "url"
  | "voice_memo"
  | "generator_link"
  | "git_repo"
  | "screenshot"
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

/** Una proposta può *creare* un pezzo che ancora non esiste. */
export type SlotTarget =
  | { scope: "work"; cell: WorkCellKind }
  | { scope: "piece"; pieceId: string; cell: CellKind }
  | { scope: "new_piece"; suggestedTitle?: string; suggestedIndex?: number; cell: CellKind }
  | { scope: "decision"; decisionId?: string; newQuestion?: string }
  | { scope: "research"; topicId?: string; newTopic?: string }
  | { scope: "voice"; voiceId?: string; newName?: string }
  | { scope: "symbol"; symbolId?: string; newName?: string }
  | { scope: "uncertain" };

export type GenerationKind =
  | "lyrics"
  | "translation"
  | "analysis"
  | "gen_lyrics"
  | "style_prompt"
  | "artwork_brief"
  | "artwork_image"
  | "audio_official"
  | "export_pack"
  | "open_questions"
  | "continuity_lint"
  | "presentation"
  | "research_digest"
  | "propose_structure";

export type GenerationStatus =
  | "queued"
  | "running"
  | "needs_review"
  | "approved"
  | "rejected"
  | "failed";

export type DecisionStatus = "proposed" | "locked" | "superseded";

export type LinkKind =
  | "precedes"
  | "follows"
  | "reverse_of"
  | "bookend"
  | "answers"
  | "related"
  | "source_audio"
  | "custom";

export interface Work {
  id: string;
  /** Null finché nessuno titolo è stato inserito o approvato. */
  title: string | null;
  artist: string | null;
  /** Null: il genere non esiste finché non emerge dal materiale. */
  genre: string | null;
  listenOrder: string[];
  createdAt: string;
}

export interface Piece {
  id: string;
  /** Ordine corrente, riassegnabile. Non è un tetto. */
  index: number | null;
  title: string | null;
  subtitle: string | null;
  /** Etichette libere nate dal materiale: anno, atto, epoca, umore… */
  labels: Record<string, string>;
  voices: string[];
  symbols: string[];
  specialRules: SpecialRule[];
}

export interface SpecialRule {
  id: string;
  rule: string;
  locked: boolean;
  /** Origine: inbox item o decisione, mai codice dell'app. */
  sourceItemId?: string;
}

export interface Cell {
  id: string;
  workId: string;
  pieceId: string | null;
  kind: CellKind | WorkCellKind;
  customKind?: string;
  status: CellStatus;
  currentVersionId: string | null;
  allowedGenerators: GenerationKind[];
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
  promptHash?: string;
  parentVersionId?: string;
}

export interface InboxItem {
  id: string;
  workId: string;
  kind: InboxKind;
  status: InboxStatus;
  filename?: string;
  mime?: string;
  textExtract?: string;
  storageKey?: string;
  proposedSlots: SlotProposal[];
  acceptedSlot?: SlotTarget;
  conflictIds: string[];
  createdAt: string;
}

export interface SlotProposal {
  target: SlotTarget;
  confidence: number;
  reasons: string[];
  extractedTitle?: string;
  warnings: string[];
  /** Se true, accettare crea un Piece nuovo. */
  createsPiece: boolean;
}

export interface EmergentDecision {
  id: string;
  workId: string;
  question: string;
  choice: string;
  status: DecisionStatus;
  sourceItemIds: string[];
  lockedAt?: string;
  supersededBy?: string;
}

export interface PieceLink {
  fromPieceId: string;
  toPieceId: string;
  kind: LinkKind;
  note?: string;
}

export interface Contradiction {
  id: string;
  workId: string;
  severity: "info" | "warn" | "block";
  code: string;
  message: string;
  cellIds: string[];
  suggestedFix?: string;
  status: "open" | "accepted_exception" | "resolved";
}

export interface GenerationJob {
  id: string;
  workId: string;
  kind: GenerationKind;
  status: GenerationStatus;
  target: SlotTarget;
  agentRole: AgentRole;
  model: string;
  contextPackId: string;
  outputVersionId?: string;
  error?: string;
}

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
  | "producer";

/** Kit di faccette di default per un pezzo appena creato. Vuote. Estendibili. */
export const DEFAULT_PIECE_CELLS: CellKind[] = [
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

/** Nessuna decisione locked all'avvio. */
export const INITIAL_DECISIONS: EmergentDecision[] = [];
