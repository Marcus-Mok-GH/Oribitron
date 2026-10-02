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

export const MODELS: Model[] = [
  // ---------------------------------------------------------------- Anthropic
  {
    slug: "claude-fable-5",
    name: "Claude Fable 5",
    providerId: "anthropic",
    released: "2026-06",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Jan 2026",
    pricing: { input: 10, output: 50 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context", "multilingual"],
    benchmarks: { swebench: 95.0, swebenchPro: 80.0, terminalBench: 83.1, gpqa: 92.6, hle: 53.3, mmluPro: 91.5 },
    summary:
      "Anthropic's Mythos-class flagship, made generally available in June 2026. The top of the four-tier Claude lineup, built for the hardest long-horizon agentic work with adaptive reasoning that is always on.",
    highlights: [
      "Leads SWE-bench Verified at 95.0% — the highest published coding score of any model",
      "1M-token context at standard rates, with no long-context surcharge",
      "128K max output, plus a 300K-output beta via the Message Batches API",
      "Briefly suspended worldwide June 12 – July 1, 2026 under a US export-control order",
    ],
    bestFor: ["Hardest agentic coding", "Long-horizon research", "Frontier reasoning"],
    featured: true,
  },
  {
    slug: "claude-opus-5",
    name: "Claude Opus 5",
    providerId: "anthropic",
    released: "2026-07",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "May 2026",
    pricing: { input: 5, output: 25, note: "Fast mode at 2× base price" },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: {},
    summary:
      "Released July 24, 2026 and now the default on Claude Max. Opus 5 is Anthropic's daily-driver frontier model for coding and agents, with configurable effort levels and adaptive reasoning.",
    highlights: [
      "Same $5 / $25 pricing as Opus 4.x despite a full generation jump",
      "Adaptive reasoning with adjustable effort levels — and a 2× fast mode",
      "Available via Claude Code, Bedrock, Google Cloud and Microsoft Foundry",
      "Pinned model identifiers: no silent upgrades behind your back",
    ],
    bestFor: ["Production coding agents", "Enterprise workflows"],
    featured: true,
  },
  {
    slug: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    providerId: "anthropic",
    released: "2026-06",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Jan 2026",
    pricing: { input: 3, output: 15, note: "$2 / $10 introductory ran through Aug 31, 2026" },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: { swebench: 85.2, hle: 57.4 },
    summary:
      "Anthropic's high-throughput workhorse, shipped June 30, 2026 — its first model to clear 80% on SWE-bench Verified at launch, now at 85.2%. Near-Opus quality for production volumes.",
    highlights: [
      "SWE-bench Verified 85.2% — up 5.6 points on Sonnet 4.6",
      "HLE 57.4% with tools enabled",
      "1M context and 128K output at standard Sonnet pricing",
      "Most cost-effective way to run Claude-class agents at scale",
    ],
    bestFor: ["High-throughput production", "Coding agents", "Everyday professional work"],
  },
  {
    slug: "claude-opus-4-8",
    name: "Claude Opus 4.8",
    providerId: "anthropic",
    released: "2026-06",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Feb 2026",
    pricing: { input: 5, output: 25 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: { swebench: 88.6, gpqa: 93.6, hle: 57.9 },
    summary:
      "The 2026 refresh of Opus: 88.6% on SWE-bench Verified and 93.6% on GPQA Diamond at an unchanged price. Direct upgrade path from Opus 4.7 with the same integration surface.",
    highlights: [
      "SWE-bench Verified 88.6%, up 1 point from Opus 4.7",
      "HLE 57.9% with tools — second only to Fable 5 inside the Claude family",
      "GPQA Diamond 93.6%: best-in-class scientific reasoning among Claude models",
    ],
    bestFor: ["Complex coding", "Nuanced writing", "Extended thinking"],
  },
  {
    slug: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    providerId: "anthropic",
    released: "2026-03",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Nov 2025",
    pricing: { input: 5, output: 25 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: { swebench: 80.8, gpqa: 91.3, aime: 99.8, arcAgi2: 68.8, arenaElo: 1502 },
    summary:
      "The generation that made 1M context standard across Claude. Still one of the strongest prose and coding models ever shipped, and widely deployed in production stacks from early 2026.",
    highlights: [
      "Highest Arena coding Elo (1,548) of its release window",
      "ARC-AGI-2 68.8% and AIME 99.8%",
      "OSWorld 72.5% for computer-use workflows",
      "No native audio or video — text and image input only",
    ],
    bestFor: ["Complex coding", "Best-in-class prose", "Production agents"],
  },
  {
    slug: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    providerId: "anthropic",
    released: "2026-02",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Nov 2025",
    pricing: { input: 3, output: 15 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: { swebench: 79.6, gpqa: 74.1, aime: 95, arenaElo: 1438 },
    summary:
      "The balanced quality/cost tier that carried 2026 production workloads before Sonnet 5. Still a strong default where Sonnet 5 capacity or budget isn't available.",
    highlights: [
      "SWE-bench Verified 79.6% and math at ~95%",
      "GDPval-AA leader at 1,633 Elo for office-style agentic work",
      "1M context generally available at $3 / $15",
    ],
    bestFor: ["Balanced production workloads", "Document analysis"],
  },
  {
    slug: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    providerId: "anthropic",
    released: "2025-10",
    contextWindow: 200_000,
    maxOutput: 64_000,
    cutoff: "Feb 2025",
    pricing: { input: 1, output: 5 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["tools", "vision", "multilingual"],
    benchmarks: {},
    summary:
      "The fast, cheap tier for sub-agents, classification and real-time interactions. The only current Claude model still capped at 200K context.",
    highlights: [
      "Extended thinking support at $1 / $5 per million tokens",
      "Built for sub-agent fan-out and high-volume extraction",
      "Not suitable for complex multi-step reasoning",
    ],
    bestFor: ["Sub-agents", "Classification", "Real-time interactions"],
  },

  // ------------------------------------------------------------------- OpenAI
  {
    slug: "gpt-5-6-sol",
    name: "GPT-5.6 Sol",
    providerId: "openai",
    released: "2026-07",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 5, output: 30 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "computer-use", "long-context"],
    benchmarks: { swebenchPro: 64.6, terminalBench: 88.8, hle: 47.2 },
    summary:
      "Top tier of OpenAI's restructured GPT-5.6 family (July 9, 2026). Built for frontier coding, cybersecurity and computer use, with reasoning control from none to max — plus an ultra mode (91.9% Terminal-Bench 2.1).",
    highlights: [
      "Terminal-Bench 2.1 at 88.8% (91.9% in Sol Ultra) — agentic terminal SOTA",
      "Reasoning effort from none to max, plus ultra for the hardest tasks",
      "SWE-bench Pro 64.6% — benchmark-verified without contamination concerns",
      "METR flagged high eval-gaming rates on launch evaluations",
    ],
    bestFor: ["Terminal & CI agents", "Cybersecurity", "Computer use"],
    featured: true,
  },
  {
    slug: "gpt-5-6-terra",
    name: "GPT-5.6 Terra",
    providerId: "openai",
    released: "2026-07",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 2.5, output: 15 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "long-context"],
    benchmarks: { swebenchPro: 63.4, terminalBench: 87.4 },
    summary:
      "The middle tier of the 5.6 family: 87.4% Terminal-Bench and 63.4% SWE-bench Pro at half of Sol's price. The default choice for everyday agentic and knowledge work.",
    highlights: [
      "Only ~1.4 points behind Sol on Terminal-Bench 2.1",
      "Half the input and output cost of Sol",
      "Reasoning control from none to max",
    ],
    bestFor: ["Everyday agents", "Knowledge work", "Cost-aware coding"],
  },
  {
    slug: "gpt-5-6-luna",
    name: "GPT-5.6 Luna",
    providerId: "openai",
    released: "2026-07",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 1, output: 6 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["tools", "vision", "long-context", "multilingual"],
    benchmarks: {},
    summary:
      "The high-volume tier of GPT-5.6: 1M context and reasoning control at $1 / $6 — OpenAI's cheapest million-token-class model.",
    highlights: [
      "1M context at the lowest GPT tier",
      "Same reasoning controls as Terra and Sol",
      "Built for cost-sensitive pipelines and fan-out",
    ],
    bestFor: ["High-volume pipelines", "Cheap long-context"],
  },
  {
    slug: "gpt-5-4",
    name: "GPT-5.4",
    providerId: "openai",
    released: "2026-04",
    contextWindow: 272_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 2.5, output: 15, note: "2× input cost over 272K context; 1.05M window" },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision", "computer-use", "long-context"],
    benchmarks: { gpqa: 92.0, arcAgi2: 73.3, arenaElo: 1463 },
    summary:
      "The generation that introduced native computer use: OSWorld 75% — above the human expert baseline — with ARC-AGI-2 at 73.3% (83.3% in Pro mode).",
    highlights: [
      "OSWorld 75% for native computer use",
      "ARC-AGI-2 73.3% standard / 83.3% Pro",
      "GPQA Diamond 92.0%",
      "Context pricing doubles beyond 272K tokens",
    ],
    bestFor: ["Computer use", "Structured reasoning", "Agentic tasks"],
  },
  {
    slug: "gpt-5-4-mini",
    name: "GPT-5.4 Mini",
    providerId: "openai",
    released: "2026-04",
    contextWindow: 400_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 0.75, output: 4.5 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["coding", "tools", "vision", "long-context"],
    benchmarks: { swebenchPro: 54.4, gpqa: 87.5 },
    summary:
      "Near-flagship performance at mid-tier prices: GPQA 87.5% and SWE-bench Pro 54.4% for $0.75 / $4.50.",
    highlights: [
      "400K context at mini pricing",
      "GPQA Diamond 87.5% — ahead of most 2025 flagships",
      "The cost-efficiency pick inside OpenAI's lineup",
    ],
    bestFor: ["Cost-efficient agents", "Extraction", "Mid-tier coding"],
  },
  {
    slug: "gpt-5-nano",
    name: "GPT-5 Nano",
    providerId: "openai",
    released: "2025-08",
    contextWindow: 400_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 0.05, output: 0.4 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["tools", "vision", "long-context"],
    benchmarks: {},
    summary:
      "Ultra-cheap unit economics: $0.05 / $0.40 per million tokens with a 400K window. The floor of 2026 API pricing.",
    highlights: [
      "Cheapest million-token pricing of any major lab",
      "400K context window",
      "Limited reasoning depth — ideal for filtering and routing",
    ],
    bestFor: ["High-volume processing", "Routing & filters"],
  },

  // ------------------------------------------------------------- Google DeepMind
  {
    slug: "gemini-3-6-flash",
    name: "Gemini 3.6 Flash",
    providerId: "google",
    released: "2026-07",
    contextWindow: 1_048_576,
    maxOutput: 65_536,
    cutoff: "See model card",
    pricing: { input: 1.5, output: 7.5, note: "$0.75 / $3.75 on Batch and Flex" },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image", "audio", "video", "pdf"],
    capabilities: ["agentic", "coding", "tools", "vision", "audio", "video", "long-context", "computer-use"],
    benchmarks: {},
    summary:
      "The current stable Gemini flagship (July 2026) — built entirely on the Flash architecture. Aimed at agentic coding loops and spatial reasoning, with computer use in preview.",
    highlights: [
      "Accepts text, image, video, audio and PDF input",
      "Computer use available in preview",
      "1M+ context with 64K max output",
      "Batch and Flex pricing halves the rate",
    ],
    bestFor: ["Agentic coding loops", "Multimodal pipelines", "Spatial reasoning"],
    featured: true,
  },
  {
    slug: "gemini-3-5-flash",
    name: "Gemini 3.5 Flash",
    providerId: "google",
    released: "2026-04",
    contextWindow: 1_048_576,
    maxOutput: 65_536,
    cutoff: "Jan 2025",
    pricing: { input: 1.5, output: 9, note: "$0.75 / $4.50 on Batch" },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image", "audio", "video", "pdf"],
    capabilities: ["agentic", "tools", "vision", "audio", "video", "long-context"],
    benchmarks: {},
    summary:
      "The long-horizon Flash tier: sub-agent deployment and multi-step work at 1M+ context, with the same multimodal inputs as 3.6.",
    highlights: [
      "Optimized for long-horizon sub-agent deployment",
      "Full multimodal input support",
      "Slightly higher output pricing than 3.6 Flash",
    ],
    bestFor: ["Sub-agent deployment", "Long-horizon work"],
  },
  {
    slug: "gemini-3-1-pro",
    name: "Gemini 3.1 Pro",
    providerId: "google",
    released: "2026-05",
    contextWindow: 1_000_000,
    maxOutput: 64_000,
    cutoff: "Jan 2025",
    pricing: { input: 2, output: 12, note: "Pricing doubles over 200K context" },
    openWeights: false,
    license: "Proprietary API (Preview)",
    modalities: ["text", "image", "audio", "video", "pdf"],
    capabilities: ["reasoning", "coding", "tools", "vision", "audio", "video", "long-context", "multilingual"],
    benchmarks: { gpqa: 94.3, arcAgi2: 77.1, hle: 44.7, aime: 100, swebench: 80.6, arenaElo: 1492 },
    summary:
      "The science and abstract-reasoning leader: GPQA Diamond 94.3% and ARC-AGI-2 77.1%, with native text, image, audio and video. Still in preview per Google's docs — evaluation-first, not production.",
    highlights: [
      "GPQA Diamond 94.3% — highest published of any model",
      "ARC-AGI-2 77.1% and AIME 2025 at 100%",
      "Native omnimodal input; 1M context",
      "Preview status carries tight rate limits and ~2-week deprecation notices",
    ],
    bestFor: ["Scientific reasoning", "Large document processing", "Multimodal"],
  },
  {
    slug: "gemini-3-flash",
    name: "Gemini 3 Flash",
    providerId: "google",
    released: "2025-12",
    contextWindow: 1_000_000,
    maxOutput: 65_536,
    cutoff: "Jan 2025",
    pricing: { input: 0.5, output: 3 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image", "audio", "video", "pdf"],
    capabilities: ["coding", "tools", "vision", "audio", "video", "long-context"],
    benchmarks: { swebench: 78.0, gpqa: 90.4, hle: 33.7 },
    summary:
      "Still one of the best value points in the market: SWE-bench 78%, GPQA 90.4% and 3× the speed of 2.5 Pro at $0.50 / $3.00.",
    highlights: [
      "MMMU Pro 81.2% for multimodal reasoning",
      "SWE-bench Verified 78% — beats many larger models",
      "1M context with 64K output",
    ],
    bestFor: ["High-throughput multimodal", "Budget coding agents"],
  },

  // ---------------------------------------------------------------------- xAI
  {
    slug: "grok-4-5",
    name: "Grok 4.5",
    providerId: "xai",
    released: "2026-06",
    contextWindow: 500_000,
    maxOutput: 64_000,
    cutoff: "Not disclosed",
    pricing: { input: 2, output: 6, cache: 0.5 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["coding", "agentic", "tools", "vision"],
    benchmarks: { swebenchPro: 64.7, terminalBench: 83.3 },
    summary:
      "xAI's first model built specifically for coding after its Cursor acquisition: SWE-bench Pro 64.7%, Terminal-Bench 83.3% and #1 on SWE Marathon pass@1 (29.0%).",
    highlights: [
      "SWE Marathon pass@1 29.0% — first place",
      "Cache hits cost $0.50/M — a 75% discount",
      "500K context — smaller than Grok 4's 2M",
      "No classic academic benchmarks published at launch",
    ],
    bestFor: ["Coding agents", "Repository-scale tasks"],
    featured: false,
  },
  {
    slug: "grok-4",
    name: "Grok 4",
    providerId: "xai",
    released: "2025-07",
    contextWindow: 2_000_000,
    maxOutput: 64_000,
    cutoff: "Not disclosed",
    pricing: { input: 3, output: 15 },
    openWeights: false,
    license: "Proprietary API",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "tools", "vision", "long-context"],
    benchmarks: { aime: 100, hle: 50.7, arenaElo: 1493 },
    summary:
      "The 2M-context reasoning model that led HLE (50.7%) and USAMO'25 (61.9%) on release. Expensive at long context, but unmatched for extreme-context reasoning.",
    highlights: [
      "2M-token context — the largest of any closed model",
      "HLE 50.7% and AIME at 100%",
      "USAMO'25 leader at 61.9%",
    ],
    bestFor: ["Extreme-context reasoning", "Hard math"],
  },
  {
    slug: "grok-4-20-beta",
    name: "Grok 4.20 Beta",
    providerId: "xai",
    released: "2026-08",
    contextWindow: 2_000_000,
    maxOutput: 64_000,
    cutoff: "Not disclosed",
    pricing: { input: 2, output: 6 },
    openWeights: false,
    license: "Proprietary API (Beta)",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "agentic", "tools", "vision", "long-context"],
    benchmarks: { arenaElo: 1520 },
    summary:
      "A 4-agent parallel debate architecture at 2M context, with the lowest hallucination rate measured (22%). Beta build — treat as experimental.",
    highlights: [
      "Four-agent parallel debate for answers",
      "2M context at $2 / $6",
      "Lowest measured hallucination rate (22%) in its evaluation cohort",
    ],
    bestFor: ["Factual research", "Multi-perspective reasoning"],
  },

  // ----------------------------------------------------------------- DeepSeek
  {
    slug: "deepseek-v3-2",
    name: "DeepSeek-V3.2",
    providerId: "deepseek",
    released: "2025-12",
    contextWindow: 128_000,
    maxOutput: 8_000,
    cutoff: "Jun 2025",
    pricing: { input: 0.28, output: 0.42 },
    openWeights: true,
    license: "MIT",
    params: "685B total · 37B active (MoE)",
    architecture: "MoE, hybrid thinking / non-thinking in one model",
    modalities: ["text"],
    capabilities: ["reasoning", "coding", "tools", "multilingual"],
    benchmarks: { swebench: 67.8, gpqa: 71.5, aime: 89.3, mmluPro: 85.0, arenaElo: 1421 },
    summary:
      "DeepSeek's flagship and the default behind both deepseek-chat and deepseek-reasoner. GPT-5-class coding and math at roughly 1/20th the price — with MIT weights.",
    highlights: [
      "MIT license — free to self-host and fine-tune",
      "Hybrid thinking / non-thinking modes in a single model",
      "$0.28 / $0.42 per million tokens via the official API",
      "8000-token max output in non-thinking mode; 64K thinking",
    ],
    bestFor: ["Self-hosting", "Logic-heavy work", "Budget reasoning"],
    featured: true,
  },

  // --------------------------------------------------------------------- Qwen
  {
    slug: "qwen-3-5-397b",
    name: "Qwen3.5 397B",
    providerId: "qwen",
    released: "2026-04",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: null,
    openWeights: true,
    license: "Apache 2.0",
    params: "397B total · 17B active (MoE)",
    architecture: "MoE with native vision-language fusion",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "vision", "multilingual", "long-context"],
    benchmarks: { swebench: 76.4, gpqa: 88.4, aime: 91.3 },
    summary:
      "Alibaba's latest open-weight flagship — the first Qwen trained with native vision-language fusion on text, images and UI screenshots. Thinking and Fast modes, FP8 pipeline for 50% memory savings.",
    highlights: [
      "GPQA 88.4% and SWE-bench 76.4% — frontier-adjacent, fully open",
      "Native vision-language fusion (text, images, UI screenshots)",
      "19× faster than Qwen3-Max on long-context tasks",
      "Plus API adds 1M-token context and adaptive tool-use Auto mode",
    ],
    bestFor: ["Self-hosting", "Vision-language apps", "Multilingual"],
  },
  {
    slug: "qwen-3-coder-480b",
    name: "Qwen3-Coder 480B",
    providerId: "qwen",
    released: "2025-07",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: null,
    openWeights: true,
    license: "Apache 2.0",
    params: "480B total · 35B active (MoE)",
    architecture: "MoE, RL-trained across 20K parallel coding environments",
    modalities: ["text"],
    capabilities: ["coding", "agentic", "tools", "long-context"],
    benchmarks: {},
    summary:
      "The dedicated open agentic coding model: SOTA among open weights on SWE-bench Verified at release, with full-repository comprehension and Claude-Sonnet-level tool fluency.",
    highlights: [
      "Full-repo comprehension, PR reviews and multi-file refactoring in one context",
      "256K context, extendable to 1M",
      "Trained with RL across 20,000 parallel coding environments",
    ],
    bestFor: ["Open coding agents", "Repo-scale refactors"],
  },

  // -------------------------------------------------------------------- Zhipu
  {
    slug: "glm-5-2",
    name: "GLM-5.2",
    providerId: "zhipu",
    released: "2026-06",
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    cutoff: "Not disclosed",
    pricing: { input: 1.4, output: 4.4, note: "Third-party hosted; no official per-token rate" },
    openWeights: true,
    license: "MIT",
    modalities: ["text"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "long-context", "multilingual"],
    benchmarks: { swebenchPro: 62.1, gpqa: 91.2, hle: 54.7, arcAgi2: 22.8 },
    summary:
      "The strongest all-round open-weight model of mid-2026: 1M context under MIT, GPQA 91.2% and the best ARC-AGI-2 score of any open model (22.8%, verified by ARC Prize).",
    highlights: [
      "1M-token context at open weights — up from 200K in GLM-5.1",
      "SWE-bench Pro 62.1% and HLE 54.7% with tools",
      "Highest verified ARC-AGI-2 score for open weights",
      "~$1.40 / $4.40 hosted through third-party inference providers",
    ],
    bestFor: ["Self-hosting at scale", "Long-context agents", "MIT licensing"],
    featured: true,
  },

  // ------------------------------------------------------------------ Moonshot
  {
    slug: "kimi-k2-5",
    name: "Kimi K2.5",
    providerId: "moonshot",
    released: "2026-04",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: null,
    openWeights: true,
    license: "Modified MIT",
    params: "1T total · 32B active (MoE)",
    architecture: "MoE, agentic tool-use training",
    modalities: ["text"],
    capabilities: ["coding", "agentic", "tools", "long-context"],
    benchmarks: { swebench: 76.8, gpqa: 87.6, hle: 51.8 },
    summary:
      "Moonshot's agentic flagship: SWE-bench 76.8% with strong long tool-use loops, available as open weights for self-hosting.",
    highlights: [
      "SWE-bench Verified 76.8% — top tier among open models",
      "HLE 51.8% with tools enabled",
      "Designed for long agentic tool-use sessions",
    ],
    bestFor: ["Open agent stacks", "Coding agents"],
  },

  // ------------------------------------------------------------------- MiniMax
  {
    slug: "minimax-m2-5",
    name: "MiniMax M2.5",
    providerId: "minimax",
    released: "2026-05",
    contextWindow: 204_800,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: null,
    openWeights: true,
    license: "Open weights",
    params: "230B total · 10B active (MoE)",
    architecture: "MoE, agent-first training",
    modalities: ["text"],
    capabilities: ["coding", "agentic", "tools"],
    benchmarks: { swebench: 80.2 },
    summary:
      "The open-weight SWE-bench record holder at 80.2% — ahead of every other open model and most closed flagships at release.",
    highlights: [
      "SWE-bench Verified 80.2% with open weights",
      "Agent-first training regime",
      "Self-hosted only — no official per-token API pricing",
    ],
    bestFor: ["Self-hosted coding agents"],
  },

  // ------------------------------------------------------------------- Mistral
  {
    slug: "mistral-large-3",
    name: "Mistral Large 3",
    providerId: "mistral",
    released: "2025-12",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: { input: 0.5, output: 1.5 },
    openWeights: true,
    license: "Apache 2.0",
    params: "675B total · 41B active (MoE)",
    architecture: "Sparse MoE, trained on 3,000 NVIDIA H200 GPUs",
    modalities: ["text", "image"],
    capabilities: ["vision", "multilingual", "long-context", "tools"],
    benchmarks: {},
    summary:
      "Mistral's frontier open-weight flagship: top open-source on the LMArena non-reasoning leaderboard, 40+ native languages, and deployable on a single 8-GPU node.",
    highlights: [
      "Apache 2.0 — the permissive license choice for enterprises",
      "Native multimodal (text + image) with 40+ languages",
      "Available on Azure, AWS, Hugging Face and NVIDIA NIM",
      "Top open-source on LMArena's non-reasoning board",
    ],
    bestFor: ["EU-resident deployments", "Enterprise RAG", "On-prem"],
  },
  {
    slug: "mistral-medium-3-5",
    name: "Mistral Medium 3.5",
    providerId: "mistral",
    released: "2026-04",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: { input: 1.5, output: 7.5 },
    openWeights: true,
    license: "Modified MIT",
    modalities: ["text", "image"],
    capabilities: ["reasoning", "coding", "agentic", "tools", "vision"],
    benchmarks: {},
    summary:
      "Mistral's frontier-class model — confusingly not the Large. Newer than and stronger than Large 3, at 3× input / 5× output pricing. Open weights under a modified MIT license.",
    highlights: [
      "Frontier-class agentic and coding performance from an EU lab",
      "Open weights (modified MIT) with 256K context",
      "First in Mistral's own model list by capability",
    ],
    bestFor: ["Agentic coding", "EU-resident deployments"],
  },
  {
    slug: "mistral-small-4",
    name: "Mistral Small 4",
    providerId: "mistral",
    released: "2026-03",
    contextWindow: 256_000,
    maxOutput: 32_000,
    cutoff: "Not disclosed",
    pricing: { input: 0.15, output: 0.6 },
    openWeights: true,
    license: "Apache 2.0",
    params: "119B total · 6.5B active (MoE)",
    architecture: "MoE — instruct, reasoning and coding unified",
    modalities: ["text", "image"],
    capabilities: ["coding", "reasoning", "vision", "multilingual"],
    benchmarks: {},
    summary:
      "One small model for instruct, reasoning and coding duties at $0.15 / $0.60 — among the best value open weights available.",
    highlights: [
      "119B total but only 6.5B active parameters per token",
      "Apache 2.0 with native vision",
      "$0.15 / $0.60 via API, or self-host on modest hardware",
    ],
    bestFor: ["Budget deployments", "Edge & local", "Self-hosting"],
  },

  // ---------------------------------------------------------------------- Meta
  {
    slug: "llama-4-scout",
    name: "Llama 4 Scout",
    providerId: "meta",
    released: "2025-04",
    contextWindow: 10_000_000,
    maxOutput: 32_000,
    cutoff: "Aug 2024",
    pricing: { input: 0.15, output: 0.5, note: "Third-party hosted rates" },
    openWeights: true,
    license: "Llama 4 Community",
    params: "109B total · 17B active (MoE, 16 experts)",
    architecture: "MoE, natively multimodal",
    modalities: ["text", "image", "video"],
    capabilities: ["vision", "multilingual", "long-context", "video"],
    benchmarks: {},
    summary:
      "The longest context window ever shipped — open or closed: 10M tokens. Built for full-codebase analysis and multi-year datasets, still fitting on a single H100 in Int4.",
    highlights: [
      "10M-token context — 5× the nearest competitor",
      "Natively multimodal across 200+ languages",
      "Runs on a single H100 (Int4)",
      "Llama 4 Community License — acceptable use policy applies",
    ],
    bestFor: ["Full-codebase analysis", "Long document sets", "Self-hosting"],
  },
  {
    slug: "llama-4-maverick",
    name: "Llama 4 Maverick",
    providerId: "meta",
    released: "2025-04",
    contextWindow: 1_000_000,
    maxOutput: 32_000,
    cutoff: "Aug 2024",
    pricing: { input: 0.22, output: 0.85, note: "Third-party hosted rates" },
    openWeights: true,
    license: "Llama 4 Community",
    params: "400B total · 17B active (MoE, 128 experts)",
    architecture: "MoE, natively multimodal",
    modalities: ["text", "image", "video"],
    capabilities: ["reasoning", "vision", "multilingual", "long-context", "video"],
    benchmarks: { mmluPro: 85.5, arenaElo: 1380 },
    summary:
      "The general-purpose Llama 4 flagship: 43.4 LiveCodeBench, native multimodality and 200+ languages, sized to fit a single H100 host.",
    highlights: [
      "Outperformed GPT-4o and Gemini 2.0 Flash on release benchmarks",
      "1M context window",
      "Fits a single H100 host",
    ],
    bestFor: ["General assistants", "Creative writing", "Image understanding"],
  },

  // -------------------------------------------------------------------- NVIDIA
  {
    slug: "nemotron-3-ultra",
    name: "Nemotron 3 Ultra",
    providerId: "nvidia",
    released: "2026-03",
    contextWindow: 1_000_000,
    maxOutput: 32_000,
    cutoff: "Jun 2025",
    pricing: null,
    openWeights: true,
    license: "NVIDIA Open Model License",
    params: "~500B total · ~50B active (MoE)",
    architecture: "Hybrid Mamba-Transformer MoE",
    modalities: ["text"],
    capabilities: ["reasoning", "agentic", "tools", "long-context"],
    benchmarks: {},
    summary:
      "NVIDIA's flagship: hybrid Mamba-Transformer MoE tuned for complex enterprise agentic applications, with granular reasoning-budget control at inference time.",
    highlights: [
      "Ships with weights, training datasets and RL environments",
      "1M-token context without quadratic attention cost",
      "Reasoning budget tunable per request",
    ],
    bestFor: ["Enterprise agents", "Long-context efficiency"],
  },
  {
    slug: "nemotron-3-super",
    name: "Nemotron 3 Super",
    providerId: "nvidia",
    released: "2026-03",
    contextWindow: 1_000_000,
    maxOutput: 32_000,
    cutoff: "Jun 2025",
    pricing: null,
    openWeights: true,
    license: "NVIDIA Open Model License",
    params: "120B total · 12B active (MoE)",
    architecture: "Hybrid Mamba-Transformer MoE with Multi-Token Prediction",
    modalities: ["text"],
    capabilities: ["agentic", "tools", "long-context"],
    benchmarks: {},
    summary:
      "The throughput-to-accuracy pick: 2.2× the inference throughput of GPT-OSS-120B on comparable benchmarks, built for multi-agent pipelines.",
    highlights: [
      "2.2× faster inference than GPT-OSS-120B at similar accuracy",
      "7.5× faster than Qwen3.5-122B on comparable benchmarks",
      "Multi-Token Prediction for speculative decoding",
    ],
    bestFor: ["Multi-agent pipelines", "IT automation", "Customer service"],
  },
  {
    slug: "nemotron-3-nano",
    name: "Nemotron 3 Nano",
    providerId: "nvidia",
    released: "2025-12",
    contextWindow: 1_000_000,
    maxOutput: 32_000,
    cutoff: "Jun 2025",
    pricing: null,
    openWeights: true,
    license: "NVIDIA Open Model License",
    params: "31.6B total · 3.6B active (MoE)",
    architecture: "Hybrid Mamba-2 / Transformer",
    modalities: ["text"],
    capabilities: ["coding", "reasoning", "tools", "long-context"],
    benchmarks: {},
    summary:
      "The efficient end of the Nemotron 3 family: 4× the throughput of Nemotron 2 Nano, quantized versions fit in 20–32GB of VRAM.",
    highlights: [
      "1M-token context on edge-class hardware",
      "Outperforms Qwen3-30B-A3B-Thinking at 3.3× the throughput",
      "Runs on A100 / H100 or quantized to 20–32GB VRAM",
    ],
    bestFor: ["Edge", "Local inference", "Low-latency agents"],
  },
];

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

export function similarModels(model: Model, count = 3): Model[] {
  return MODELS.filter((m) => m.slug !== model.slug && m.openWeights === model.openWeights)
    .sort((a, b) => Math.abs(a.contextWindow - model.contextWindow) - Math.abs(b.contextWindow - model.contextWindow))
    .slice(0, count);
}

export const STATS = {
  modelCount: MODELS.length,
  providerCount: PROVIDERS.length,
  openWeightCount: MODELS.filter((m) => m.openWeights).length,
  maxContext: Math.max(...MODELS.map((m) => m.contextWindow)),
  latestRelease: [...MODELS].sort((a, b) => b.released.localeCompare(a.released))[0]?.released ?? "",
};
