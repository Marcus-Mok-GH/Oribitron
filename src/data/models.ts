/**
 * Curated dataset of frontier and open-weight LLMs, compiled from public
 * sources (model cards, lab announcements, published evaluations) — last
 * reviewed October 2026. Figures are directional snapshots, not guarantees;
 * verify current specs with the provider before production use.
 */

export const LAST_UPDATED = "October 2026";

export type Capability =
  | "reasoning"
  | "coding"
  | "agentic"
  | "tools"
  | "vision"
  | "audio"
  | "video"
  | "long-context"
  | "multilingual"
  | "computer-use";

export const CAPABILITY_LABELS: Record<Capability, string> = {
  reasoning: "Reasoning",
  coding: "Coding",
  agentic: "Agentic",
  tools: "Tool use",
  vision: "Vision",
  audio: "Audio",
  video: "Video",
  "long-context": "Long context",
  multilingual: "Multilingual",
  "computer-use": "Computer use",
};

export type BenchmarkId =
  | "swebench"
  | "swebenchPro"
  | "terminalBench"
  | "gpqa"
  | "aime"
  | "arcAgi2"
  | "hle"
  | "mmluPro"
  | "arenaElo";

export interface BenchmarkMeta {
  label: string;
  description: string;
  unit: "%" | "Elo";
}

export const BENCHMARKS: Record<BenchmarkId, BenchmarkMeta> = {
  swebench: {
    label: "SWE-bench Verified",
    description: "Real GitHub issues resolved — the coding gold standard.",
    unit: "%",
  },
  swebenchPro: {
    label: "SWE-bench Pro",
    description: "Contamination-resistant successor to SWE-bench Verified.",
    unit: "%",
  },
  terminalBench: {
    label: "Terminal-Bench 2.1",
    description: "Agentic terminal workflows end to end.",
    unit: "%",
  },
  gpqa: {
    label: "GPQA Diamond",
    description: "PhD-level science reasoning; the main frontier differentiator.",
    unit: "%",
  },
  aime: {
    label: "AIME 2025",
    description: "Olympiad-level math problems.",
    unit: "%",
  },
  arcAgi2: {
    label: "ARC-AGI-2",
    description: "Abstract pattern reasoning — fluid intelligence, not recall.",
    unit: "%",
  },
  hle: {
    label: "Humanity's Last Exam",
    description: "Beyond-PhD questions from domain experts.",
    unit: "%",
  },
  mmluPro: {
    label: "MMLU-Pro",
    description: "Broad graduate-level knowledge across 14 domains.",
    unit: "%",
  },
  arenaElo: {
    label: "Arena Elo (text)",
    description: "Human preference rating from LMArena battles.",
    unit: "Elo",
  },
};

export interface Provider {
  id: string;
  name: string;
  short: string;
  color: string;
  region: string;
  blurb: string;
}

export const PROVIDERS: Provider[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    short: "AN",
    color: "#E0784F",
    region: "United States",
    blurb: "Safety-focused frontier lab behind the Claude family and a four-tier lineup.",
  },
  {
    id: "openai",
    name: "OpenAI",
    short: "OA",
    color: "#10A37F",
    region: "United States",
    blurb: "The GPT-5 family, Codex, and the platform that started the generative AI boom.",
  },
  {
    id: "google",
    name: "Google DeepMind",
    short: "GD",
    color: "#5E9EFF",
    region: "United States / UK",
    blurb: "Gemini models: natively multimodal, million-token context, aggressive shipping pace.",
  },
  {
    id: "xai",
    name: "xAI",
    short: "XA",
    color: "#C7D2E5",
    region: "United States",
    blurb: "Grok models with multi-agent architectures and a post-Cursor coding focus.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    short: "DS",
    color: "#4D6BFE",
    region: "China",
    blurb: "MIT-licensed MoE models that reset the economics of frontier reasoning.",
  },
  {
    id: "qwen",
    name: "Alibaba · Qwen",
    short: "QW",
    color: "#B78CF9",
    region: "China",
    blurb: "The most prolific open-weight family, with dedicated vision and coder lines.",
  },
  {
    id: "zhipu",
    name: "Zhipu AI · Z.ai",
    short: "GL",
    color: "#38BDF8",
    region: "China",
    blurb: "GLM models with MIT weights and open-weight ARC-AGI leadership.",
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    short: "KM",
    color: "#34D399",
    region: "China",
    blurb: "Kimi: open-weight agentic and coding models built for long tool-use loops.",
  },
  {
    id: "minimax",
    name: "MiniMax",
    short: "MM",
    color: "#F472B6",
    region: "China",
    blurb: "Agent-first models holding open-weight records on SWE-bench.",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    short: "MI",
    color: "#FBBF24",
    region: "France",
    blurb: "European lab shipping Apache-2.0 weights for EU-resident and on-prem deploys.",
  },
  {
    id: "meta",
    name: "Meta",
    short: "ME",
    color: "#0866FF",
    region: "United States",
    blurb: "Llama 4 MoE models — including the longest context window ever shipped.",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    short: "NV",
    color: "#76B900",
    region: "United States",
    blurb: "Nemotron hybrid Mamba-Transformer models tuned for agent throughput.",
  },
];

export type Modality = "text" | "image" | "audio" | "video" | "pdf";

export interface Model {
  slug: string;
  name: string;
  providerId: string;
  released: string; // YYYY-MM
  contextWindow: number;
  maxOutput: number;
  cutoff: string;
  /** API list price per 1M tokens; null when the model is self-hosted only. */
  pricing: { input: number; output: number; cache?: number; note?: string } | null;
  openWeights: boolean;
  license: string;
  params?: string;
  architecture?: string;
  modalities: Modality[];
  capabilities: Capability[];
  benchmarks: Partial<Record<BenchmarkId, number>>;
  summary: string;
  highlights: string[];
  bestFor: string[];
  featured?: boolean;
}

export const MODELS: Model[] = [];

export function getProvider(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

export function getModel(slug: string | undefined): Model | undefined {
  return MODELS.find((m) => m.slug === slug);
}

export function byProvider(providerId: string): Model[] {
  return MODELS.filter((m) => m.providerId === providerId);
}

export function featuredModels(): Model[] {
  return MODELS.filter((m) => m.featured);
}

export function similarModels(_model: Model, _count = 3): Model[] {
  return [];
}

export const STATS = {
  modelCount: MODELS.length,
  providerCount: PROVIDERS.length,
  openWeightCount: MODELS.filter((m) => m.openWeights).length,
  maxContext: 0,
  latestRelease: "",
};
