import { useI18n, localized } from '../lib/i18n'

export default function CitySelector({ scoredCities, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()
  const selectedCity = scoredCities.find(({ city }) => city.id === selectedCityId)?.city

  return (
    <div className="city-selector">
      <label>
        <span className="city-selector-label">{t.selectCityLabel}</span>
        <select
          className="city-selector-input"
          value={selectedCityId ?? ''}
          onChange={(event) => onSelectCity(event.target.value)}
        >
          {scoredCities.map(({ city }) => (
            <option key={city.id} value={city.id}>
              {localized(city, 'name', lang)}
            </option>
          ))}
        </select>
      </label>

      {selectedCity?.photo && (
        <img
          className="city-selector-photo"
          src={selectedCity.photo}
          alt={localized(selectedCity, 'name', lang)}
        />
      )}
    </div>
  )
}
