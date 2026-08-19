/**
 * The Distance Desk — dominio.
 * Questo file è il contratto. L'app non ha "progetti" o "album multipli":
 * esiste un solo Album, già sagomato su The Distance.
 */

export type Epoch =
  | "1983"
  | "1984"
  | "1997"
  | "5125"
  | "BH01"
  | "3141_CUT";

export type Act = "PROLOGO" | "I" | "II" | "III" | "IV" | "FINALE";

export type CellKind =
  | "meta"
  | "concept"
  | "lyrics_en"
  | "lyrics_it"
  | "analysis"
  | "suno_lyrics"
  | "suno_style"
  | "artwork"
  | "audio_take"
  | "links"
  | "open_questions"
  | "sample_ref"
  | "archive";

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
  | "suno_link"
  | "git_repo"
  | "screenshot"
  | "unknown";

export type SlotTarget =
  | { scope: "album"; cell: AlbumCellKind }
  | { scope: "track"; trackId: string; cell: CellKind }
  | { scope: "decision"; decisionId: string }
  | { scope: "research"; topicId: string }
  | { scope: "character"; characterId: string }
  | { scope: "uncertain" };

export type AlbumCellKind =
  | "concept_source"
  | "storia"
  | "playlist"
  | "decisions"
  | "style_bible"
  | "cover"
  | "band_identity"
  | "presentation"
  | "signal_map";

export type InboxStatus =
  | "received"
  | "classifying"
  | "proposed"
  | "needs_human"
  | "conflict"
  | "accepted"
  | "rejected"
  | "archived";

export type GenerationKind =
  | "lyrics_en"
  | "lyrics_it"
  | "analysis"
  | "suno_lyrics"
  | "suno_style"
  | "artwork_brief"
  | "artwork_image"
  | "audio_official"
  | "suno_export_pack"
  | "open_questions"
  | "continuity_lint"
  | "presentation"
  | "research_digest";

export type GenerationStatus =
  | "queued"
  | "running"
  | "needs_review"
  | "approved"
  | "rejected"
  | "failed";

export type DecisionStatus = "proposed" | "locked" | "superseded";

export type VoiceId = "frantic_caller" | "narrator_i" | "she" | "choral_5125" | "choral_1984";

export type SymbolId = "pi" | "bore" | "song_as_language" | "room" | "ark";

export type LinkKind =
  | "precedes"
  | "follows"
  | "reverse_of"
  | "bookend"
  | "answers"
  | "signal_from"
  | "signal_to"
  | "source_audio"
  | "contrappunto";

export type SignalDirection = "1983_to_5125" | "5125_to_1984" | "5125_to_1983" | "internal_1984";

export interface Album {
  id: "the-distance";
  title: "The Distance";
  band: "Distance Proof Band";
  canonVersion: "v3";
  listenOrder: string[];
  storyNotes: string;
}

export interface Track {
  id: string;
  number: number;
  yearLabel: string;
  epoch: Epoch;
  title: string;
  subtitle: string | null;
  act: Act;
  narrativeRole: string;
  voices: VoiceId[];
  symbols: SymbolId[];
  signal?: SignalDirection;
  specialRules: SpecialRule[];
}

export interface SpecialRule {
  id: string;
  rule: string;
  /** Se true, nessuna AI può violarla senza decisione umana esplicita. */
  locked: boolean;
}

export interface Cell {
  id: string;
  trackId: string | null;
  albumCell?: AlbumCellKind;
  kind: CellKind | AlbumCellKind;
  status: CellStatus;
  currentVersionId: string | null;
  allowedGenerators: GenerationKind[];
}

export interface ItemVersion {
  id: string;
  cellId: string;
  origin: "imported" | "generated" | "human_edit";
  bodyMarkdown: string;
  locale?: "en" | "it";
  createdAt: string;
  approvedAt: string | null;
  model?: string;
  promptHash?: string;
  parentVersionId?: string;
}

export interface InboxItem {
  id: string;
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
  extractedYear?: string;
  warnings: string[];
}

export interface CanonDecision {
  id: string;
  question: string;
  choice: string;
  status: DecisionStatus;
  lockedAt?: string;
  supersededBy?: string;
}

export interface TrackLink {
  fromTrackId: string;
  toTrackId: string;
  kind: LinkKind;
  note?: string;
}

export interface Contradiction {
  id: string;
  severity: "info" | "warn" | "block";
  code: string;
  message: string;
  cellIds: string[];
  suggestedFix?: string;
  status: "open" | "accepted_exception" | "resolved";
}

export interface GenerationJob {
  id: string;
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
  | "canon_steward"
  | "lyricist"
  | "translator"
  | "analyst"
  | "suno_engineer"
  | "art_director"
  | "researcher"
  | "continuity_editor"
  | "producer";

export const LOCKED_DECISIONS: CanonDecision[] = [
  {
    id: "scope",
    question: "Scope album",
    choice: "Album completo ~15 tracce. Cassandra Complex tagliata.",
    status: "locked",
  },
  {
    id: "origin",
    question: "Origine del canale",
    choice: "1983. 5125 = 1983 × π.",
    status: "locked",
  },
  {
    id: "signals",
    question: "Direzione segnali",
    choice: "Bidirezionale: 1983→5125 e 5125→1984 espliciti; navicella 5125→1983.",
    status: "locked",
  },
  {
    id: "dadej",
    question: "Natura di Dadej",
    choice: "Jaded al contrario. Nessun testo originale.",
    status: "locked",
  },
  {
    id: "room",
    question: "Room",
    choice: "Pt.1 (5125 ascolto) + Pt.2 (1984 hit).",
    status: "locked",
  },
  {
    id: "finale",
    question: "Finale e ordine d'ascolto",
    choice: "14 Landing → 15 Distance Proof. Distance Proof chiude. Opzione A.",
    status: "locked",
  },
  {
    id: "year-prologue",
    question: "Anno prologo",
    choice: "1997 (Frantic Caller verificato), non 1993.",
    status: "locked",
  },
  {
    id: "she",
    question: "She",
    choice: "Compagna di viaggio sulla navicella. Non conosce tutte le cicatrici del narratore.",
    status: "locked",
  },
  {
    id: "pi",
    question: "Presenza di π",
    choice: "Sottile: lore e Distance Proof, non ovunque.",
    status: "locked",
  },
];
