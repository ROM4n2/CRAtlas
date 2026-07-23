# CRAtlas

CRAtlas (formerly CRMap) is a static-site web application for visualizing the evolution of rebel and conservative factions during the Cultural Revolution (1966–1976) through interactive maps, timelines, and relationship graphs. It is built with Next.js, TypeScript, and Tailwind CSS, and is deployed to GitHub Pages as a fully static export.

## Project Overview

CRAtlas renders historical data as:

- **Choropleth maps** — provincial control (rebel / conservative / military / contested) over time, powered by ECharts.
- **Timeline** — a draggable/playable timeline controlling the map and graph views.
- **Relationship graph** — actor/organization connections rendered with Cytoscape.
- **Detail pages** — event, person, and faction detail pages with sources and comments.

All data is static (TypeScript modules + GeoJSON) bundled at build time. There is no backend, no database, and no runtime API calls.

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
app/                # Next.js App Router pages & layouts
  event/[id]/       # Event detail pages
  person/[id]/      # Person detail pages
  faction/[id]/     # Faction detail pages
  map/              # Map view page
  graph/            # Relationship graph page
  timeline/         # Timeline view page
  about/            # About page
components/         # Shared React components
  map/              # Map components (ChinaMap, MapLegend, EventPopup, EventSidebar)
  graph/            # Graph components (FactionGraph, GraphFilter, NodeDetail)
  timeline/         # Timeline components (TimeAxis, EventCard)
  layout/           # Layout components (Navbar)
  ui/               # UI components (ErrorBoundary, SearchModal, SourceList, NotesPanel)
  comments/         # Comment components (GiscusComments)
data/               # Static TypeScript datasets (events, people, factions, regions, relationships)
lib/                # Core library (types, data queries, state store, notes)
public/             # Static assets (china.json GeoJSON)
docs/               # Project documentation & specs
.superpowers/       # SDD progress ledger & task briefs/reports
.github/            # Issue templates & PR template
```

## Data Model

CRAtlas uses five core entity types, all defined in `lib/types.ts`:

| Entity | Count | Description |
| --- | --- | --- |
| Events | 18 | Historical events with date, location, participants, significance |
| People | 18 | Key figures with biography and faction affiliations |
| Factions | 7 | Rebel/conservative/military organizations |
| Regions | 34 | Chinese provinces with map coordinates |
| Relationships | 19 | Membership, causality, faction interaction, social ties |

## Contributing

Contributions are welcome via two paths:

- **Low-threshold**: Open a GitHub Issue using our [correction](https://github.com/ROM4n2/CRAtlas/issues/new?template=correction.md) or [addition](https://github.com/ROM4n2/CRAtlas/issues/new?template=addition.md) template.
- **Formal**: Submit a Pull Request. See [PR template](https://github.com/ROM4n2/CRAtlas/blob/main/.github/PULL_REQUEST_TEMPLATE.md).

All contributions must include verifiable historical sources.

## License

TBD
