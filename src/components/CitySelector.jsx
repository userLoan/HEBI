import { useI18n, localized } from '../lib/i18n'

export default function CitySelector({ scoredCities, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()

  return (
    <label className="city-selector">
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
  )
}
