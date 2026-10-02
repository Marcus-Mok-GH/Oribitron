# Oribitron

Website for large language models (LLMs) — a curated, benchmark-aware index of the 2026 model landscape.

Oribitron tracks **34 models from 12 labs** (frontier APIs and open weights), with:

- **Model directory** — search and filter by lab, capability, open weights, price or benchmark score.
- **Model detail pages** — context windows, pricing, licenses, parameter counts, and the 2026
  benchmarks that still separate models (SWE-bench Verified / Pro, Terminal-Bench, GPQA Diamond,
  ARC-AGI-2, HLE, AIME, Arena Elo).
- **Side-by-side compare** — up to three models in a URL-shareable comparison table.
- **Cost calculator** — monthly token volumes ranked by list API cost.

## Stack

- Vite + React + TypeScript
- Tailwind CSS (custom cosmic theme) + Framer Motion
- React Router
- Data lives in `src/data/models.ts` — a hand-curated snapshot compiled from public sources and
  reviewed October 2026.

## Run it

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # static output in dist/
bun tsc -b --noEmit
```

Model specs and benchmark scores are directional snapshots from public sources — verify with the
provider before production use.
