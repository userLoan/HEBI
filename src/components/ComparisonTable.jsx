import { useI18n, localized } from '../lib/i18n'
import { indicatorLabel } from '../lib/hebi'
import RiskBadge from './RiskBadge'

export default function ComparisonTable({ scoredCities, weightsConfig, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()
  const rows = [...scoredCities].sort((a, b) => a.score.rank - b.score.rank)

  return (
    <section className="panel">
      <h2>{t.compareTitle}</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>{t.tableRank}</th>
            <th>{t.tableCity}</th>
            <th>{t.tableScore}</th>
            <th>{t.tableRisk}</th>
            <th>{t.tableDriver}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ city, score }) => (
            <tr
              key={city.id}
              className={city.id === selectedCityId ? 'is-selected' : ''}
              onClick={() => onSelectCity(city.id)}
            >
              <td>{score.rank}</td>
              <td>{localized(city, 'name', lang)}</td>
              <td>{score.hebiScore.toFixed(1)}</td>
              <td>
                <RiskBadge riskLevel={score.riskLevel} />
              </td>
              <td>{indicatorLabel(score.mainDriver, weightsConfig, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
