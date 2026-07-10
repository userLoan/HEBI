import { useMemo, useState } from 'react'
import { I18nProvider, useI18n } from './lib/i18n'
import { computeAllCityScores } from './lib/hebi'
import citiesData from './data/cities.json'
import weightsConfig from './data/weights.json'
import recommendations from './data/recommendations.json'
import Header from './components/Header'
import MapView from './components/MapView'
import ComparisonTable from './components/ComparisonTable'
import CityDetailPanel from './components/CityDetailPanel'

function Dashboard() {
  const { t } = useI18n()
  const scoredCities = useMemo(
    () => computeAllCityScores(citiesData, weightsConfig),
    [],
  )
  const [selectedCityId, setSelectedCityId] = useState(scoredCities[0]?.city.id ?? null)

  const selectedScoredCity = scoredCities.find(({ city }) => city.id === selectedCityId) ?? null

  return (
    <div className="app-shell">
      <Header />
      <main className="app-grid">
        <MapView
          scoredCities={scoredCities}
          selectedCityId={selectedCityId}
          onSelectCity={setSelectedCityId}
        />
        <ComparisonTable
          scoredCities={scoredCities}
          weightsConfig={weightsConfig}
          selectedCityId={selectedCityId}
          onSelectCity={setSelectedCityId}
        />
      </main>
      <CityDetailPanel
        scoredCity={selectedScoredCity}
        weightsConfig={weightsConfig}
        recommendations={recommendations}
      />
      <footer className="app-footer">{t.footerNote}</footer>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Dashboard />
    </I18nProvider>
  )
}
