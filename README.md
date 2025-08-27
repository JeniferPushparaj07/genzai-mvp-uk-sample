# GenZ.AI – MVP v3 (UK-only demo)

Psychometric-first MVP with:
- Student (Class→Subject) using inbuilt UK curriculum demo data for KS3/GCSE/A-Level.
- Professional (ATS CV tailoring + job search placeholder).
- Hobbyist (adaptive chat).
- Accessibility: dark/light, high contrast, large text, dyslexia-friendly, reduce motion.

## Run locally
```bash
npm i
npm run dev
```
Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Notes
- Replace the demo curriculum map in `App.jsx` with curated UK gov open datasets.
- Swap the JobSearch demo with a backend API route that queries an open UK job source.
- Replace `demoAnswer()` with your AI endpoint for real explanations.
