import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { useI18n } from '../lib/i18n'
import { indicatorLabel } from '../lib/hebi'

export default function ScoreBreakdownChart({ score, weightsConfig }) {
  const { lang } = useI18n()

  const data = weightsConfig.indicators.map((indicator) => ({
    key: indicator.key,
    label: indicatorLabel(indicator.key, weightsConfig, lang),
    score: Math.round(score.componentScores[indicator.key] * 10) / 10,
    isMainDriver: indicator.key === score.mainDriver,
  }))

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="label" width={150} />
          <Tooltip formatter={(value) => [`${value} / 100`, '']} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.isMainDriver ? '#c9382f' : '#3b6ea5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
