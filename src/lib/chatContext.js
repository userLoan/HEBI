import { computeAllCityScores, indicatorLabel } from './hebi'
import citiesData from '../data/cities.json'
import weightsConfig from '../data/weights.json'
import recommendationsData from '../data/recommendations.json'
import aboutData from '../data/about.json'

function formatCityBlock(scoredCity) {
  const { city, score } = scoredCity
  const cityRecommendations = recommendationsData[city.id]

  const lines = [
    `### ${city.nameEn} (${city.nameVi})`,
    `HEBI score: ${score.hebiScore.toFixed(1)}/100, risk level: ${score.riskLevel.labelEn} (${score.riskLevel.labelVi})`,
    `Main driver: ${indicatorLabel(score.mainDriver, weightsConfig, 'en')}, second driver: ${indicatorLabel(score.secondDriver, weightsConfig, 'en')}`,
  ]

  if (cityRecommendations) {
    for (const key of ['priority1', 'priority2']) {
      const item = cityRecommendations[key]
      lines.push(`Priority — ${indicatorLabel(item.driver, weightsConfig, 'en')}:`)
      lines.push(item.paragraphsEn.join(' '))
      lines.push(`Sources: ${item.sources}`)
    }
  }

  return lines.join('\n')
}

export function buildSystemPrompt() {
  const scoredCities = computeAllCityScores(citiesData, weightsConfig)
  const cityBlocks = scoredCities.map(formatCityBlock).join('\n\n')

  const methodology = aboutData.methodology
  const methodologyText = [
    methodology.intro.en,
    methodology.normalizationParagraph.en,
    methodology.formula.en,
    methodology.mainDriverParagraph.en,
    methodology.relativeIndexParagraph.en,
    methodology.aiLayersParagraph1.en,
    methodology.aiLayersParagraph2.en,
  ].join('\n')

  const storyText = aboutData.story.paragraphs.en.join('\n')

  return `You are HEBI's friendly in-app assistant. Speak in the first person ("I"/"mình"), and ALWAYS reply in the same language as the user's latest message, no matter what language this system prompt is written in. You have two responsibilities: (1) explain HEBI's own data, methodology, and per-city recommendations using ONLY the facts given below; (2) answer general-knowledge questions using your own broader knowledge whenever the user asks about something outside HEBI. Never present HEBI's results as an official assessment — they are for reference and comparison only. Answer only what the user asked — do not end your replies with a generic summary of what else you can help with (e.g. "You can ask me about...") or any other meta-commentary about your own capabilities. Keep greetings and small talk natural and brief (e.g. "Hi! How can I help you today?") — don't force the word "HEBI" into every sentence just because it's the app's name.

## About HEBI
${storyText}

## Methodology
${methodologyText}

## City data (all 5 cities, ranked by HEBI score, highest burden first)
${cityBlocks}`
}
