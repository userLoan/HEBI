import { useI18n, localized } from '../lib/i18n'
import { getRecommendation, indicatorLabel, riskLevelForScore } from '../lib/hebi'
import ScoreBreakdownChart from './ScoreBreakdownChart'
import { GaugeIcon, AlertTriangleIcon, TargetIcon } from './icons'

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card">
      <span className="stat-card-icon" style={{ color, backgroundColor: `${color}1a` }}>
        {icon}
      </span>
      <div className="stat-card-body">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value" style={{ color }}>
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
  const recommendation = getRecommendation(score.mainDriver, recommendations)
  const mainDriverColor = riskLevelForScore(
    score.componentScores[score.mainDriver],
    weightsConfig.riskLevels,
  ).color

  return (
    <section className="panel city-detail">
      <p className="detail-city-label">{localized(city, 'name', lang)}</p>

      <div className="stat-cards">
        <StatCard
          icon={<GaugeIcon />}
          label={t.tableScore}
          value={`${score.hebiScore.toFixed(1)} ${t.scoreUnit}`}
          color={score.riskLevel.color}
        />
        <StatCard
          icon={<AlertTriangleIcon />}
          label={t.tableRisk}
          value={localized(score.riskLevel, 'label', lang)}
          color={score.riskLevel.color}
        />
        <StatCard
          icon={<TargetIcon />}
          label={t.tableDriver}
          value={indicatorLabel(score.mainDriver, weightsConfig, lang)}
          color={mainDriverColor}
        />
      </div>

      <div className="detail-columns">
        <div className="detail-breakdown">
          <div className="breakdown-header">
            <h3 className="panel-kicker">{t.breakdownTitle}</h3>
            <span className="driver-key">
              <span className="driver-key-swatch" style={{ backgroundColor: mainDriverColor }} />
              {t.tableDriver}
            </span>
          </div>
          <ScoreBreakdownChart score={score} weightsConfig={weightsConfig} />
        </div>

        <div className="detail-side">
          <div className="summary-box">
            <h3 className="panel-kicker">{t.summaryTitle}</h3>
            <p>{localized(recommendation, 'explanation', lang)}</p>
          </div>

          <aside className="recommendation-box" style={{ borderLeftColor: score.riskLevel.color }}>
            <h3 className="panel-kicker">{t.recommendationTitle}</h3>
            <p>{localized(recommendation, 'recommendation', lang)}</p>
            {recommendation.action1Vi && (
              <>
                <h4>{t.actionsTitle}</h4>
                <ul>
                  <li>{localized(recommendation, 'action1', lang)}</li>
                  <li>{localized(recommendation, 'action2', lang)}</li>
                </ul>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
