# operations-website Agent Notes

## Project
- Vite + React + Tailwind single-page German landing page for a Technical Operations Partner offer.
- Main app lives in `src/App.jsx`; React entrypoint is `src/main.jsx`.
- Tailwind is loaded from `src/index.css` with `@import "tailwindcss";`.
- Deployment runs through GitHub Actions in `.github/workflows/deploy.yml` and publishes Vite's `dist/` folder to GitHub Pages.

## Implementation Rules
- Use Serena MCP and Context7 MCP when those tools are available in the session.
- Keep the site German-only unless a language switch is explicitly requested.
- Keep `index.html` aligned with the public positioning: German document language, Johann Wiedmeier browser title, and a concise Technical Operations meta description.
- Preserve the premium alternating dark/light visual direction:
  - Gold accent: `#c8913a`
  - Dark background: `#111210`
  - Light backgrounds: `#fdfcf9` and `#f7f4ee`
- Use local components and inline SVG icons in `src/App.jsx`; do not add `lucide-react` or `shadcn/ui` unless explicitly requested.
- Keep the primary CTA concrete: `Operations Audit anfragen`, using `mail@johannwiedmeier.de`.
- Use `Über Zusammenarbeit sprechen` only for broader about-page collaboration requests.
- Keep the mobile header menu functional, accessible, and dependency-free.
- Keep `#ueber-mich` as an internal credibility page for Operations, Software Architecture, DevSecOps, Cloud/Backend engineering, recruiter requests, and customer project work.
- Keep Johann's portrait image at `public/johann-wiedmeier.jpg` unless replacing it with a newer optimized version.
- Keep the landing page concise; use compact credibility teasers there and reserve deeper CV/background detail for `#ueber-mich`.
- Keep the offer section as one sequential journey: Operations Audit first, Automatisierungs-Sprint after the audit, Operations Retainer optional.
- Footer legal links must route internally with `#impressum` and `#datenschutz`.
- Detail/legal views must render in-app when their hash is active and include a `← Zurück zur Startseite` link to `#top`.
- Detail route changes should reset scroll to the top so users do not land midway down a newly rendered page.

## Verification
- Run `npm run build` before handing off frontend changes.
- Run `npm run lint` before handing off frontend changes.
- Run `npm run dev` to confirm the Vite app starts.
- If browser MCP tooling is available, verify the landing page and legal hash routes visually.
