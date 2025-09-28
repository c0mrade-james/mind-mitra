# MindMitra — Vercel Deployment

This project is pre-configured for **Vercel**.

## Deploy Steps
1. Push this repo to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your GitHub repo.
3. If asked, configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Vercel will deploy automatically.

## Notes
- `vercel.json` is included so React Router works (all routes fallback to `index.html`).
- No need for `docs/` or GitHub Pages hacks.
