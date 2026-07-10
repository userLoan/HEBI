import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n, localized } from '../lib/i18n'

const VIETNAM_CENTER = [16.0, 106.5]

export default function MapView({ scoredCities, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()

  return (
    <section className="panel">
      <h2>{t.mapTitle}</h2>
      <MapContainer
        center={VIETNAM_CENTER}
        zoom={5.4}
        scrollWheelZoom={false}
        style={{ height: 420, width: '100%', borderRadius: 12 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {scoredCities.map(({ city, score }) => {
          const isSelected = city.id === selectedCityId
          return (
            <CircleMarker
              key={city.id}
              center={[city.lat, city.lon]}
              radius={isSelected ? 14 : 10}
              pathOptions={{
                color: score.riskLevel.color,
                fillColor: score.riskLevel.color,
                fillOpacity: isSelected ? 0.9 : 0.55,
                weight: isSelected ? 3 : 1,
              }}
              eventHandlers={{ click: () => onSelectCity(city.id) }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                {localized(city, 'name', lang)} — {score.hebiScore.toFixed(1)}
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </section>
  )
}
