# Interview Pattern Trainer

A mobile-friendly React + TypeScript learning app for coding interview pattern recognition. It includes Java-first lessons, flashcard quizzes, spaced review, a roadmap, and simple step-based algorithm visualizers.


## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The Vite `base` is set to `/pattern-tracker2/` in `vite.config.ts`, and the app uses `HashRouter`, so nested routes work on GitHub Pages without server rewrites.

One simple deployment path:

1. Build with `npm run build`.
2. Publish the generated `dist` folder with a GitHub Pages action or `gh-pages`.
3. Set the repository Pages source to the deployed branch or action.

## Content Notes

Problem summaries and explanations are original. External links are placeholders to practice collections and can later be replaced with specific problem links.

## Future System Design Module

Later-phase system design ideas are preserved in `src/data/futureSystemDesignIdeas.ts`. That module is intentionally not surfaced as a full route yet, but it is ready to plug into a future learning path.
