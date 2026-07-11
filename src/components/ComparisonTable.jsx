import { useI18n, localized } from '../lib/i18n'
import RiskBadge from './RiskBadge'

export default function ComparisonTable({ scoredCities, selectedCityId, onSelectCity }) {
  const { lang, t } = useI18n()
  const rows = [...scoredCities].sort((a, b) => a.score.rank - b.score.rank)

  return (
    <section className="panel">
      <h2 className="panel-kicker">{t.compareTitle}</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>{t.tableRank}</th>
            <th>{t.tableCity}</th>
            <th>{t.tableScore}</th>
            <th>{t.tableRisk}</th>
            <th>{t.tableScoreBar}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ city, score }) => (
            <tr
              key={city.id}
              className={city.id === selectedCityId ? 'is-selected' : ''}
              onClick={() => onSelectCity(city.id)}
            >
              <td>
                <span className="rank-chip">{score.rank}</span>
              </td>
              <td className="city-cell">{localized(city, 'name', lang)}</td>
              <td className="score-cell">{score.hebiScore.toFixed(1)}</td>
              <td>
                <RiskBadge riskLevel={score.riskLevel} />
              </td>
              <td>
                <div className="scale-cell">
                  <div className="scale-track">
                    <div
                      className="scale-fill"
                      style={{ width: `${score.hebiScore}%`, backgroundColor: score.riskLevel.color }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
