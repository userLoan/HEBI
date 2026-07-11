import { useMemo, useState } from 'react'
import { I18nProvider } from './lib/i18n'
import { computeAllCityScores } from './lib/hebi'
import citiesData from './data/cities.json'
import weightsConfig from './data/weights.json'
import recommendations from './data/recommendations.json'
import Header from './components/Header'
import MapView from './components/MapView'
import ComparisonTable from './components/ComparisonTable'
import CitySelector from './components/CitySelector'
import CityDetailPanel from './components/CityDetailPanel'

function Dashboard() {
  const scoredCities = useMemo(
    () => computeAllCityScores(citiesData, weightsConfig),
    [],
  )
  const [selectedCityId, setSelectedCityId] = useState(scoredCities[0]?.city.id ?? null)

  const selectedScoredCity = scoredCities.find(({ city }) => city.id === selectedCityId) ?? null

  return (
    <div className="app-root">
      <Header />
      <div className="app-shell">
        <CitySelector
          scoredCities={scoredCities}
          selectedCityId={selectedCityId}
          onSelectCity={setSelectedCityId}
        />
        <CityDetailPanel
          scoredCity={selectedScoredCity}
          weightsConfig={weightsConfig}
          recommendations={recommendations}
        />
        <main className="app-main">
          <ComparisonTable
            scoredCities={scoredCities}
            weightsConfig={weightsConfig}
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
          />
          <MapView
            scoredCities={scoredCities}
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
          />
        </main>
      </div>
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
