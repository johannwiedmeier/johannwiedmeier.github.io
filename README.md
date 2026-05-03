# operations-website

Premium German single-page website for the `JW.OPS` Technical Operations Partner offer.

## Stack

- Vite
- React
- Tailwind CSS
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

## Deployment

The site deploys to GitHub Pages on every push to `main` through `.github/workflows/deploy.yml`.

The workflow installs dependencies with `npm ci`, runs `npm run lint`, builds the Vite app with `npm run build`, and publishes the `dist/` artifact.

The custom domain is preserved through `public/CNAME`, which Vite copies into `dist/CNAME` during the build.

## Structure

- `src/main.jsx` contains the React entrypoint and imports `App` from `./App.jsx`.
- `src/App.jsx` contains the landing page, local UI components, inline SVG icons, the about page, and legal hash views.
- `src/index.css` imports Tailwind with `@import "tailwindcss";`.
- `index.html` contains the German document language, browser title, and meta description.

## About Page

The internal `#ueber-mich` page positions Johann Wiedmeier for Operations, Software Architecture, DevSecOps, Cloud/Backend engineering, recruiter requests, and current customer project work.
It includes CV-backed proof points and a customer security audit reference for a dance school app.
The portrait image is served from `public/johann-wiedmeier.jpg`.
The landing page keeps only a compact credibility teaser and links to the full about page for deeper background.

## Contact CTA

Primary calls to action use the concrete label `Operations Audit anfragen` and open an email to `mail@johannwiedmeier.de`.
The mobile header includes a functional menu with the main section links and the same audit CTA.
The about page can use the broader closing CTA `Über Zusammenarbeit sprechen`.

## Internal Hash Routes

The footer and navigation links route internally through URL hashes:

- `#ueber-mich`
- `#impressum`
- `#datenschutz`

When a detail hash is active, the app renders the matching page instead of the landing page. These pages include a `← Zurück zur Startseite` link to `#top`.
Opening a detail hash resets scroll to the top of the rendered detail page.
