# sandy-zhou-website
# Sandy Zhou Personal Website

A simple static website for Sandy Zhou, built for GitHub Pages.

## Structure

- `index.html` – main page
- `styles.css` – styles
- `data.js` – editable content (supports multi-language: EN/ZH)
- `script.js` – rendering logic
- `content-config.js` – one-time Google Sheets and Google Form links
- `assets/` – images and favicon

## How to edit

All fixed bilingual content is currently in `data.js`, structured by language keys (`en`, `zh`).

- hero text
- about paragraphs
- course portfolio
- programmes and service scenarios
- activities and participant feedback
- selected goods
- contact info

See `LOCAL-TESTING.md` for local preview and deployment instructions, and `CHANGES-V1.md` for the first-version scope.

After the two worksheets are published as CSV and their URLs are placed in `content-config.js`, the browser reads updates directly from Google Sheets. No application server is required.

## Deploy to GitHub Pages

1. Create a GitHub repository
2. Upload all files
3. Go to **Settings → Pages**
4. Choose the main branch and root folder
5. Bind your custom domain: `sandyzhou.org`

