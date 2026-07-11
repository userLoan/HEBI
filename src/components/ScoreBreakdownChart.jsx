import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts'
import { useI18n } from '../lib/i18n'
import { indicatorLabel, riskLevelForScore } from '../lib/hebi'

export default function ScoreBreakdownChart({ score, weightsConfig }) {
  const { lang } = useI18n()

  const data = weightsConfig.indicators.map((indicator) => {
    const value = Math.round(score.componentScores[indicator.key] * 10) / 10
    const isMainDriver = indicator.key === score.mainDriver
    return {
      key: indicator.key,
      label: indicatorLabel(indicator.key, weightsConfig, lang),
      score: value,
      isMainDriver,
      color: riskLevelForScore(value, weightsConfig.riskLevels).color,
    }
  })

  // Direct-label only the main driver; the axis + tooltip carry the rest.
  const renderDriverLabel = ({ x, y, width, height, value, index }) => {
    const entry = data[index]
    if (!entry?.isMainDriver) return null
    return (
      <text
        x={x + width + 8}
        y={y + height / 2}
        dy={4}
        fill={entry.color}
        fontSize={12}
        fontWeight={700}
      >
        {value}
      </text>
    )
  }

  return (
    <div className="breakdown-chart" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 40, bottom: 0, left: 4 }}
          barCategoryGap="34%"
        >
          <CartesianGrid horizontal={false} stroke="#eceadf" />
          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#8a929b', fontSize: 11.5 }}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={150}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#39434d', fontSize: 12.5 }}
          />
          <Tooltip
            formatter={(value) => [`${value} / 100`, '']}
            separator=""
            cursor={{ fill: 'rgba(26, 107, 138, 0.06)' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e5e0d4',
              boxShadow: '0 6px 20px -6px rgba(14, 43, 58, 0.25)',
              fontSize: '0.82rem',
              padding: '7px 11px',
            }}
            labelStyle={{ fontWeight: 650, color: '#1f2933', marginBottom: 2 }}
            itemStyle={{ color: '#5c6670', padding: 0 }}
          />
          <Bar dataKey="score" barSize={16} radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.color} fillOpacity={entry.isMainDriver ? 1 : 0.62} />
            ))}
            <LabelList dataKey="score" content={renderDriverLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
