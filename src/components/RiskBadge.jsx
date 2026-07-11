import { useI18n, localized } from '../lib/i18n'

export default function RiskBadge({ riskLevel }) {
  const { lang } = useI18n()

  return (
    <span
      className="risk-badge"
      style={{ backgroundColor: `${riskLevel.color}14`, borderColor: `${riskLevel.color}59` }}
    >
      <span className="risk-dot" style={{ backgroundColor: riskLevel.color }} />
      {localized(riskLevel, 'label', lang)}
    </span>
  )
}
