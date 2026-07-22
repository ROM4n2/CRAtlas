# CRAtlas

CRAtlas (formerly CRMap) is a static-site web application for visualizing the Cultural Revolution (1966–1969) through interactive maps, timelines, and relationship graphs. It is built with Next.js, TypeScript, and Tailwind CSS, and is deployed to GitHub Pages as a fully static export.

## Project Overview

CRAtlas renders historical data as:

- **Choropleth maps** — provincial control (rebel / conservative / military / contested) over time, powered by ECharts.
- **Timeline** — key events plotted chronologically.
- **Relationship graph** — actor/organization connections rendered with Cytoscape.

All data is static (GeoJSON + JSON) bundled at build time. There is no backend, no database, and no runtime API calls.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (static export, `output: 'export'`) |
| Language | TypeScript 5 |
| UI | React 18 |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Charts | ECharts 5 + echarts-for-react |
| Graphs | Cytoscape 3 + react-cytoscapejs |
| State | Zustand 4 |
| Testing | Jest 29 + ts-jest |
| Lint | ESLint + eslint-config-next |

## How to Run

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open <http://localhost:3000>. The dev server supports hot reload.

### Build (static export)

```bash
npm run build
```

Output goes to `out/`, which is deployed to GitHub Pages.

### Test

```bash
npm test            # run once
npm run test:watch  # watch mode
```

### Lint

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values as needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for GitHub Pages (e.g. `/CRAtlas`) |
| `NEXT_PUBLIC_GISCUS_REPO` | Giscus comments repo (Phase 4) |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | Giscus repo ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | Giscus discussion category |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | Giscus category ID |

## Project Structure

```
app/            # Next.js App Router pages & layouts
components/     # Shared React components
data/           # Static GeoJSON + JSON datasets
lib/            # Helper functions & hooks
scripts/        # Build/download scripts
docs/           # Project documentation & specs
```

## License

TBD
