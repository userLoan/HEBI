import { useI18n, localized } from '../lib/i18n'
import { getCityRecommendations, indicatorLabel, riskLevelForScore } from '../lib/hebi'
import ScoreBreakdownChart from './ScoreBreakdownChart'
import { GaugeIcon, AlertTriangleIcon, TargetIcon } from './icons'

function StatCard({ icon, label, value, color, textColor }) {
  return (
    <div className="stat-card">
      <span className="stat-card-icon" style={{ color, backgroundColor: `${color}1a` }}>
        {icon}
      </span>
      <div className="stat-card-body">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value" style={{ color: textColor ?? color }}>
          {value}
        </span>
      </div>
    </div>
  )
}

export default function CityDetailPanel({ scoredCity, weightsConfig, recommendations }) {
  const { lang, t } = useI18n()

  if (!scoredCity) {
    return (
      <section className="panel">
        <p className="empty-state">{t.detailSelectPrompt}</p>
      </section>
    )
  }

  const { city, score } = scoredCity
  const cityRecommendations = getCityRecommendations(city.id, recommendations)
  const mainDriverRisk = riskLevelForScore(score.componentScores[score.mainDriver], weightsConfig.riskLevels)
  const priorities = cityRecommendations
    ? [
        { item: cityRecommendations.priority1, risk: mainDriverRisk },
        {
          item: cityRecommendations.priority2,
          risk: riskLevelForScore(score.componentScores[score.secondDriver], weightsConfig.riskLevels),
        },
      ]
    : []

  return (
    <section className="panel city-detail">
      <p className="detail-city-label">{localized(city, 'name', lang)}</p>

      <div className="stat-cards">
        <StatCard
          icon={<GaugeIcon />}
          label={t.tableScore}
          value={`${score.hebiScore.toFixed(1)} ${t.scoreUnit}`}
          color={score.riskLevel.color}
          textColor={score.riskLevel.colorDeep}
        />
        <StatCard
          icon={<AlertTriangleIcon />}
          label={t.tableRisk}
          value={localized(score.riskLevel, 'label', lang)}
          color={score.riskLevel.color}
          textColor={score.riskLevel.colorDeep}
        />
        <StatCard
          icon={<TargetIcon />}
          label={t.tableDriver}
          value={indicatorLabel(score.mainDriver, weightsConfig, lang)}
          color={mainDriverRisk.color}
          textColor={mainDriverRisk.colorDeep}
        />
      </div>

      <div className="detail-columns">
        <div className="detail-breakdown">
          <div className="breakdown-header">
            <h3 className="panel-kicker">{t.breakdownTitle}</h3>
            <span className="driver-key">
              <span className="driver-key-swatch" style={{ backgroundColor: mainDriverRisk.color }} />
              {t.tableDriver}
            </span>
          </div>
          <ScoreBreakdownChart score={score} weightsConfig={weightsConfig} />
        </div>

        <div className="recommendation-group">
          <h3 className="panel-kicker">{t.recommendationTitle}</h3>
          {priorities.map(({ item, risk }, index) => (
            <aside key={item.driver} className="recommendation-box" style={{ borderLeftColor: risk.color }}>
              <h4 className="recommendation-priority-title">
                {t.priorityLabel} {index + 1}: {indicatorLabel(item.driver, weightsConfig, lang)}
              </h4>
              {(lang === 'vi' ? item.paragraphsVi : item.paragraphsEn).map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
              <p className="recommendation-sources">
                {t.sourcesLabel}: {item.sources}
              </p>
            </aside>
          ))}
        </div>
      </div>
    </section>
  )
}
