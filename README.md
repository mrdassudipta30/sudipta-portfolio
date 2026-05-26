# Sudipta Das — Portfolio

Professional portfolio site showcasing Flutter development work, built from CV content.

## Structure

```
sudipta-portfolio/
├── index.html          # Main page
├── css/styles.css      # Animations & custom styles
├── js/
│   ├── data.js         # Projects, skills (edit here)
│   └── main.js         # Scroll reveal, filters, nav
└── Sudipta_Das.pdf     # Downloadable CV
```

## Run locally

Open `index.html` in a browser, or serve with any static server:

```bash
cd sudipta-portfolio
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Customize

- **Projects**: Edit `js/data.js` → `PORTFOLIO_DATA.projects`
- **Skills**: Edit `js/data.js` → `PORTFOLIO_DATA.skills`
- **Colors**: Tailwind config in `index.html` `<script>tailwind.config`

## Changelog

### 2026-05-26 — v1.0.0
- Added Qahveen (AI coffee reading — App Store & Play Store)
- Initial portfolio: hero, about, projects, experience, education, skills, contact
- Scroll animations, project filters (All / Live / AI), mobile menu
- CV download link
