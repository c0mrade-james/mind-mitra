# MindMitra — Ready for Deployment

Changes made to make this Vite + React project deployable on GitHub Pages and Vercel:

1. **vite.config.ts**
   - Added `base: mode === 'development' ? '/' : './'` so production builds use relative paths. This fixes blank pages on GitHub Pages.

2. **package.json**
   - Added script: `npm run build:gh` — builds the site and copies `dist/` to `docs/` (GitHub Pages can serve from `docs/`).

3. **scripts/copy-to-docs.js**
   - Utility to copy `dist` -> `docs` cross-platform.

How to deploy:

- **Vercel**
  - Push repository to GitHub and import to Vercel.
  - Build command: `npm run build`
  - Output directory: `dist`
  - Vercel should auto-detect Vite; if not, set framework to `Other` and use above build command.

- **GitHub Pages (using docs/ folder)**
  - Run locally:
    ```
    npm install
    npm run build:gh
    ```
    This creates/overwrites `docs/` with production files.
  - Commit and push `docs/` to GitHub.
  - In GitHub repository Settings → Pages, set source to `main` branch and `docs/` folder.
  - GitHub Pages will serve the site with correct relative paths.

Notes:
- I removed `node_modules` from the packaged zip to keep size small.
- If you prefer GitHub Pages from `gh-pages` branch, consider using the `gh-pages` npm package or GitHub Actions to publish `dist/` to `gh-pages`.
