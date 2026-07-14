import { useEffect, useMemo, useState } from 'react'
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
import AboutPage from './components/AboutPage'
import DataSourcesPage from './components/DataSourcesPage'
import MethodologyPage from './components/MethodologyPage'

function viewForPath(pathname) {
  if (pathname === '/about') return 'about'
  if (pathname === '/data-sources') return 'data-sources'
  if (pathname === '/methodology') return 'methodology'
  return 'dashboard'
}

function Dashboard() {
  const scoredCities = useMemo(
    () => computeAllCityScores(citiesData, weightsConfig),
    [],
  )
  const [selectedCityId, setSelectedCityId] = useState(scoredCities[0]?.city.id ?? null)
  const [view, setView] = useState(() =>
    typeof window === 'undefined' ? 'dashboard' : viewForPath(window.location.pathname),
  )

  useEffect(() => {
    const handlePopState = () => setView(viewForPath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setView(viewForPath(path))
  }

  const selectedScoredCity = scoredCities.find(({ city }) => city.id === selectedCityId) ?? null

  return (
    <div className="app-root">
      <Header view={view} onNavigate={navigate} />
      {view === 'about' ? (
        <AboutPage />
      ) : view === 'data-sources' ? (
        <DataSourcesPage />
      ) : view === 'methodology' ? (
        <MethodologyPage />
      ) : (
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
      )}
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
