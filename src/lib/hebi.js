// Pure scoring functions for the Hidden Environmental Burden Index (HEBI).
// Formulas and weights are ported 1:1 from the "Công thức & trọng số" sheet.

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export function riskLevelForScore(value, riskLevels) {
  return (
    riskLevels.find((level) => value >= level.min && value <= level.max) ??
    riskLevels[riskLevels.length - 1]
  )
}

export function normalize(value, low, high, direction) {
  const ratio =
    direction === 'higherIsBetter'
      ? (high - value) / (high - low)
      : (value - low) / (high - low)
  return clamp(ratio * 100, 0, 100)
}

export function computeCityScore(city, weightsConfig) {
  const { indicators, riskLevels } = weightsConfig

  const componentScores = {}
  const contributions = {}
  let hebiScore = 0
  let exposureWeighted = 0
  let exposureWeightSum = 0
  let vulnerabilityWeighted = 0
  let vulnerabilityWeightSum = 0

  for (const indicator of indicators) {
    const rawValue = city.indicators[indicator.key]
    const score = normalize(rawValue, indicator.low, indicator.high, indicator.direction)
    const contribution = score * indicator.weight

    componentScores[indicator.key] = score
    contributions[indicator.key] = contribution
    hebiScore += contribution

    if (indicator.group === 'exposure') {
      exposureWeighted += contribution
      exposureWeightSum += indicator.weight
    } else {
      vulnerabilityWeighted += contribution
      vulnerabilityWeightSum += indicator.weight
    }
  }

  const exposureScore = exposureWeightSum > 0 ? exposureWeighted / exposureWeightSum : 0
  const vulnerabilityScore =
    vulnerabilityWeightSum > 0 ? vulnerabilityWeighted / vulnerabilityWeightSum : 0

  const riskLevel = riskLevelForScore(hebiScore, riskLevels)

  const mainDriver = indicators.reduce((topKey, indicator) =>
    contributions[indicator.key] > contributions[topKey] ? indicator.key : topKey,
    indicators[0].key,
  )

  return {
    cityId: city.id,
    componentScores,
    contributions,
    exposureScore,
    vulnerabilityScore,
    hebiScore,
    riskLevel,
    mainDriver,
  }
}

export function computeAllCityScores(cities, weightsConfig) {
  const scored = cities.map((city) => ({
    city,
    score: computeCityScore(city, weightsConfig),
  }))

  scored.sort((a, b) => b.score.hebiScore - a.score.hebiScore)
  scored.forEach((entry, index) => {
    entry.score.rank = index + 1
  })

  return scored
}

export function getRecommendation(mainDriver, recommendations) {
  return recommendations.byDriver[mainDriver] ?? recommendations.default
}

export function indicatorLabel(key, weightsConfig, lang) {
  const indicator = weightsConfig.indicators.find((item) => item.key === key)
  if (!indicator) return key
  return lang === 'vi' ? indicator.labelVi : indicator.labelEn
}
