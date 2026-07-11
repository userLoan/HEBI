import React, { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'hebi-lang'

const dictionaries = {
  en: {
    appTitle: 'HEBI Dashboard',
    mapTitle: 'City map',
    compareTitle: '5-city comparison',
    tableRank: 'Rank',
    tableCity: 'City',
    tableScore: 'HEBI score',
    tableRisk: 'Risk level',
    tableDriver: 'Main driver',
    tableScoreBar: 'Score bar',
    detailSelectPrompt: 'Select a city on the map or in the table to see its full breakdown.',
    breakdownTitle: 'Component breakdown',
    recommendationTitle: 'Recommendation',
    actionsTitle: 'Suggested actions',
    scoreUnit: '/ 100',
    selectCityLabel: 'Select city',
    summaryTitle: 'Summary',
  },
  vi: {
    appTitle: 'HEBI Dashboard',
    mapTitle: 'Bản đồ thành phố',
    compareTitle: 'So sánh 5 thành phố',
    tableRank: 'Hạng',
    tableCity: 'Thành phố',
    tableScore: 'Điểm HEBI',
    tableRisk: 'Mức rủi ro',
    tableDriver: 'Tác nhân chính',
    tableScoreBar: 'Thanh điểm',
    detailSelectPrompt: 'Chọn một thành phố trên bản đồ hoặc trong bảng để xem chi tiết.',
    breakdownTitle: 'Phân tích thành phần',
    recommendationTitle: 'Khuyến nghị',
    actionsTitle: 'Hành động gợi ý',
    scoreUnit: '/ 100',
    selectCityLabel: 'Chọn thành phố',
    summaryTitle: 'Tóm tắt kết quả',
  },
}

const I18nContext = createContext(null)

function getInitialLang() {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(STORAGE_KEY) ?? 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = (nextLang) => {
    setLangState(nextLang)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLang)
    }
  }

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  )

  return React.createElement(I18nContext.Provider, { value }, children)
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within an I18nProvider')
  return context
}

export function localized(entity, field, lang) {
  const key = `${field}${lang === 'vi' ? 'Vi' : 'En'}`
  return entity[key]
}
