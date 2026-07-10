import { useI18n, localized } from '../lib/i18n'
import { getRecommendation, indicatorLabel } from '../lib/hebi'
import RiskBadge from './RiskBadge'
import ScoreBreakdownChart from './ScoreBreakdownChart'

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

  return (
    <section className="panel city-detail">
      <div className="city-detail-heading">
        <div>
          <h2>{localized(city, 'name', lang)}</h2>
          <RiskBadge riskLevel={score.riskLevel} />
        </div>
        <div className="hebi-score">
          <span className="hebi-score-value">{score.hebiScore.toFixed(1)}</span>
          <span className="hebi-score-unit">{t.scoreUnit}</span>
        </div>
      </div>

      <div className="sub-scores">
        <div className="sub-score-bar">
          <span>{t.exposureLabel}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${score.exposureScore}%` }} />
          </div>
          <span>{score.exposureScore.toFixed(1)}</span>
        </div>
        <div className="sub-score-bar">
          <span>{t.vulnerabilityLabel}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${score.vulnerabilityScore}%` }} />
          </div>
          <span>{score.vulnerabilityScore.toFixed(1)}</span>
        </div>
      </div>

      <h3>{t.breakdownTitle}</h3>
      <ScoreBreakdownChart score={score} weightsConfig={weightsConfig} />

      <div className="recommendation-box">
        <h3>
          {t.recommendationTitle} — {indicatorLabel(score.mainDriver, weightsConfig, lang)}
        </h3>
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
        {recommendation.explanationVi && (
          <>
            <h4>{t.explanationTitle}</h4>
            <p>{localized(recommendation, 'explanation', lang)}</p>
          </>
        )}
      </div>
    </section>
  )
}
