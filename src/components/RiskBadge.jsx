import { useI18n, localized } from '../lib/i18n'

export default function RiskBadge({ riskLevel }) {
  const { lang } = useI18n()

  return (
    <span
      className="risk-badge"
      style={{ backgroundColor: `${riskLevel.color}22`, color: riskLevel.color, borderColor: riskLevel.color }}
    >
      <span className="risk-dot" style={{ backgroundColor: riskLevel.color }} />
      {localized(riskLevel, 'label', lang)}
    </span>
  )
}
