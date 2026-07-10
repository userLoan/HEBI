import React, { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'hebi-lang'

const dictionaries = {
  en: {
    appTitle: 'HEBI Dashboard',
    appSubtitle: 'Hidden Environmental Burden Index — illustrative city demo',
    disclaimer:
      'Demo dataset for transparency and illustration purposes only — not an official ranking. Real-time values are shown for reference; HEBI scores use representative inputs.',
    mapTitle: 'City map',
    compareTitle: '5-city comparison',
    tableRank: 'Rank',
    tableCity: 'City',
    tableScore: 'HEBI score',
    tableRisk: 'Risk level',
    tableDriver: 'Main driver',
    detailSelectPrompt: 'Select a city on the map or in the table to see its full breakdown.',
    exposureLabel: 'Exposure score',
    vulnerabilityLabel: 'Vulnerability score',
    breakdownTitle: 'Component breakdown',
    recommendationTitle: 'Recommendation',
    actionsTitle: 'Suggested actions',
    explanationTitle: 'Why this driver',
    footerNote: 'Source data and methodology: Công thức & trọng số / Nguồn dữ liệu & API worksheets.',
    scoreUnit: '/ 100',
  },
  vi: {
    appTitle: 'HEBI Dashboard',
    appSubtitle: 'Chỉ số Gánh nặng Môi trường Ẩn — bản demo minh họa theo thành phố',
    disclaimer:
      'Bộ dữ liệu demo phục vụ minh họa và tính minh bạch, không phải xếp hạng chính thức. Giá trị thời gian thực chỉ để tham khảo; điểm HEBI dùng dữ liệu đại diện.',
    mapTitle: 'Bản đồ thành phố',
    compareTitle: 'So sánh 5 thành phố',
    tableRank: 'Hạng',
    tableCity: 'Thành phố',
    tableScore: 'Điểm HEBI',
    tableRisk: 'Mức rủi ro',
    tableDriver: 'Tác nhân chính',
    detailSelectPrompt: 'Chọn một thành phố trên bản đồ hoặc trong bảng để xem chi tiết.',
    exposureLabel: 'Điểm phơi nhiễm',
    vulnerabilityLabel: 'Điểm dễ tổn thương',
    breakdownTitle: 'Phân tích thành phần',
    recommendationTitle: 'Khuyến nghị',
    actionsTitle: 'Hành động gợi ý',
    explanationTitle: 'Vì sao là tác nhân chính',
    footerNote: 'Nguồn dữ liệu và phương pháp: sheet Công thức & trọng số / Nguồn dữ liệu & API.',
    scoreUnit: '/ 100',
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
