# HEBI Dashboard

**Hidden Environmental Burden Index** — an interactive dashboard that scores and compares the hidden environmental burden of five Vietnamese cities (Hanoi, Ho Chi Minh City, Da Nang, Hai Phong, Can Tho) from seven weighted indicators: PM2.5, heat, noise, population density, green space, vulnerable population share, and income risk.

This project reimplements the scoring model originally prototyped in `HEBI app data.xlsx` as a client-side web app, so the same formulas that were designed and validated in the spreadsheet now run live in the browser.

## Live features

- **Interactive map** (Leaflet / OpenStreetMap) — cities plotted by coordinates, colored by risk level.
- **5-city comparison table** — ranked by HEBI score, with risk badge and main driver per city.
- **City detail panel** — HEBI score, exposure/vulnerability sub-scores, a 7-indicator breakdown chart, and an auto-generated recommendation based on the city's main driver.
- **EN / VI language toggle**, persisted in `localStorage`.

All scoring formulas live in [`src/lib/hebi.js`](src/lib/hebi.js), ported 1:1 from the `Công thức & trọng số` worksheet.

## Data

The app reads static JSON in `src/data/`, sourced from the Excel workbook:

- `cities.json` — raw indicator values and coordinates per city (from `Dữ liệu đầu vào`).
- `weights.json` — indicator metadata, normalization anchors, weights, risk bands (from `Công thức & trọng số`).
- `recommendations.json` — the recommendation lookup table keyed by main driver (from `Thư viện khuyến nghị`).

This mirrors the spreadsheet's own design principle: swap the raw input data and every derived score, chart, and recommendation recalculates automatically — no formula changes needed.

### Moving to real-time data later

`Nguồn dữ liệu & API` in the original workbook documents drop-in API replacements for the static fields, e.g. [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) for live PM2.5 and [Open-Meteo Weather API](https://open-meteo.com/en/docs) for temperature — both free and keyless. Swapping `cities.json` for a live fetch does not require changing `hebi.js`.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Tech stack

React 18 + Vite, [react-leaflet](https://react-leaflet.js.org/) for mapping, [Recharts](https://recharts.org/) for the indicator breakdown chart. No backend — deployable as a static site (e.g. Vercel).

## Project structure

```
src/
  data/               raw JSON data (cities, weights, recommendations)
  lib/
    hebi.js           scoring logic (normalize, compute score, rank, recommend)
    i18n.js           EN/VI translation dictionaries + context
  components/         Header, MapView, ComparisonTable, CityDetailPanel, ScoreBreakdownChart, RiskBadge, LanguageToggle
  App.jsx             top-level state and layout
```

## Disclaimer

This is a demo dataset built for transparency and illustration — not an official environmental ranking. Several indicators use representative or estimated values where authoritative real-time data was not available; see `Nguồn dữ liệu & API` in the source workbook for per-value sourcing notes.
