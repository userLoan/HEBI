import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n, localized } from '../lib/i18n'
import weightsConfig from '../data/weights.json'

const VIETNAM_CENTER = [16.0, 106.5]

export default function MapView({ scoredCities, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()

  return (
    <section className="panel map-panel">
      <h2 className="panel-kicker">{t.mapTitle}</h2>
      <div className="map-frame">
        <MapContainer
          center={VIETNAM_CENTER}
          zoom={5.4}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {scoredCities.map(({ city, score }) => {
            const isSelected = city.id === selectedCityId
            return (
              <CircleMarker
                key={city.id}
                center={[city.lat, city.lon]}
                radius={isSelected ? 12 : 9}
                pathOptions={{
                  color: isSelected ? '#12303f' : '#ffffff',
                  weight: isSelected ? 2.5 : 2,
                  fillColor: score.riskLevel.color,
                  fillOpacity: isSelected ? 1 : 0.85,
                }}
                eventHandlers={{ click: () => onSelectCity(city.id) }}
              >
                <Tooltip direction="top" offset={[0, -6]}>
                  <span className="map-tooltip-name">{localized(city, 'name', lang)}</span>{' '}
                  <span className="map-tooltip-score">· {score.hebiScore.toFixed(1)}</span>
                </Tooltip>
              </CircleMarker>
            )
          })}
        </MapContainer>
        <div className="map-legend" aria-hidden="true">
          {weightsConfig.riskLevels.map((level) => (
            <span key={level.color} className="map-legend-item">
              <span className="map-legend-dot" style={{ backgroundColor: level.color }} />
              {localized(level, 'label', lang)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
