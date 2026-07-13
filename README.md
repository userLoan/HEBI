# HEBI Dashboard

**Hidden Environmental Burden Index** — an interactive dashboard that scores and compares the hidden environmental burden of five Vietnamese cities (Hanoi, Ho Chi Minh City, Da Nang, Hai Phong, Can Tho) from seven weighted indicators: PM2.5, heat, noise, population density, green space, vulnerable population share, and income risk.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vite.dev/)
- [react-leaflet](https://react-leaflet.js.org/) for mapping
- [Recharts](https://recharts.org/) for the indicator breakdown chart

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
