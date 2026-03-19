# AI Webflow Mini

A minimal prototype of an AI-to-Webflow-safe section builder built with Next.js App Router, TypeScript, Tailwind utility classes (via CDN for this prototype), and Zod.

## Goal
Turn a natural-language prompt into a safe structured layout tree that can be previewed and exported.

## Features
- prompt input
- in-browser mocked generation (static-export friendly)
- `generateLayoutFromPrompt(prompt: string)` abstraction
- strict zod schema validation
- JSON tree viewer
- live preview
- minimal Tailwind-styled UI
- HTML/CSS export
- copy HTML button
- copy CSS button
- normalization pass for vague prompt terms
- reusable CSS class generation in exporter

## Supported node types
- section
- div
- heading
- text
- button

## Supported styles
- display
- flexDirection
- justifyContent
- alignItems
- gap
- paddingTop
- paddingBottom
- paddingLeft
- paddingRight
- maxWidth
- backgroundColor
- color
- fontSize
- borderRadius

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
This prototype is configured for static export so it can be published on GitHub Pages.

```bash
npm install
npm run build
```

The exported static site will be generated in `out/`. Publish that directory with GitHub Pages or a GitHub Actions Pages workflow.

## Mock prompt examples
Try these prompts:
- `Create a dark hero section with a large heading, paragraph, and rounded button`
- `Make a CTA section with text on the left and button on the right`
- `Create a feature section with headline, paragraph, and CTA`

## Architecture
- `lib/generateLayoutFromPrompt.ts` – mocked generator abstraction for future AI integration
- `lib/schema.ts` – strict zod schema
- `lib/types.ts` – TypeScript node model
- `lib/normalize.ts` – vague prompt language normalization
- `lib/renderToHtml.ts` – HTML/CSS export with style deduplication
- `lib/demoData.ts` – hardcoded layout examples
- `components/` – prompt, tree, preview, and export UI

## Why this is a good first Codex repo
It is:
- narrow in scope
- deterministic
- easy to validate
- easy to extend
- close to a future real AI pipeline without needing one yet

## Next steps for real AI integration
When replacing the mock generator:
1. call a model inside `generateLayoutFromPrompt()`
2. require JSON-only output
3. parse the model output safely
4. validate with zod
5. normalize unsupported or vague values
6. reject invalid trees
7. render and export only validated nodes

## Recommended future upgrade ideas
- better prompt-to-layout matching
- stronger recursive typing for schema inference
- copy confirmation polish
- editable node inspector
- schema-safe style controls
