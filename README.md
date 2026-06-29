# UI Style Pilot

AI-assisted UI standards and style governance for consistent frontend delivery.

UI Style Pilot is a starter kit for teams that use AI to generate or modify frontend code and want the results to stay aligned with shared UI standards, reusable components, interaction rules, and review checklists.

## What It Contains

- `docs/frontend-standards/`  
  Standards for design tokens, layouts, navigation, components, interactions, coding rules, AI generation, page templates, reviews, component inventory, and chart rules.

- `docs/ai-skills/frontend/`  
  Project-local skill definitions for:
  - `frontend-page-builder`
  - `frontend-design-review`
  - `frontend-component-reuse`
  - `frontend-style-migration`

- `templates/vue3/`  
  A small template area for project files that teams commonly copy into Vue projects, such as `src/components/index.ts`.

- Vite + Vue 3 preview app  
  A lightweight landing page that explains the workflow and points to the docs.

## Quick Start

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Live Preview

The preview app is deployed to GitHub Pages on every push to `main`:

https://wanghuanlab.github.io/ui-style-pilot/

## Recommended Workflow

1. Read `docs/frontend-standards/USAGE.md`.
2. Copy or adapt the standards into your product repository.
3. Add shared component exports like `templates/vue3/src/components/index.ts`.
4. Ask AI agents to read the relevant standards before generating UI.
5. Review every generated page with `docs/frontend-standards/09-review-checklist.md`.

## Why This Exists

AI can generate frontend pages quickly, but without guardrails it often creates inconsistent spacing, colors, component structures, and interaction patterns. UI Style Pilot turns your standards into working material that both humans and AI agents can follow.

## Project Status

Early starter kit. The initial content was extracted from a real enterprise Vue project and organized into a reusable open-source structure.

## License

MIT
