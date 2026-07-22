import React, { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'hebi-lang'

const dictionaries = {
  en: {
    appTitle: 'Hidden Environmental\nBurden Index',
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
    priorityLabel: 'Priority',
    sourcesLabel: 'Source',
    scoreUnit: '/ 100',
    selectCityLabel: 'Select city',
    navDashboard: 'Dashboard',
    navAbout: 'About',
    navDataSources: 'Sources',
    navMethodology: 'Methodology',
    aboutExposureGroupTitle: 'Environmental exposure',
    aboutVulnerabilityGroupTitle: 'Community vulnerability',
    aboutSourcesTitle: 'Sources',
    chatTitle: 'HEBI Assistant',
    chatPlaceholder: 'Ask me anything…',
    chatEmptyState: "Hi! Ask me about HEBI's data, methodology, or anything else.",
    chatSend: 'Send',
    chatClear: 'Clear chat',
    chatClose: 'Close chat',
    chatOpenLabel: 'Open chat',
    chatErrorMissingKey: 'API key not configured.',
    chatErrorUnauthorized: 'Invalid API key.',
    chatErrorRateLimited: 'Rate limited, try again shortly.',
    chatErrorNetwork: 'No response, please try again.',
    chatErrorUnknown: 'Something went wrong, please try again.',
  },
  vi: {
    appTitle: 'Chỉ số Gánh nặng\nMôi trường Ẩn',
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
    priorityLabel: 'Ưu tiên',
    sourcesLabel: 'Nguồn',
    scoreUnit: '/ 100',
    selectCityLabel: 'Chọn thành phố',
    navDashboard: 'Dashboard',
    navAbout: 'Giới thiệu',
    navDataSources: 'Nguồn',
    navMethodology: 'Phương pháp',
    aboutExposureGroupTitle: 'Phơi nhiễm môi trường',
    aboutVulnerabilityGroupTitle: 'Dễ tổn thương cộng đồng',
    aboutSourcesTitle: 'Nguồn dữ liệu',
    chatTitle: 'Trợ lý HEBI',
    chatPlaceholder: 'Hỏi mình bất cứ điều gì...',
    chatEmptyState: 'Chào bạn! Hỏi mình về dữ liệu HEBI, phương pháp, hoặc bất kỳ điều gì khác nhé.',
    chatSend: 'Gửi',
    chatClear: 'Xóa hội thoại',
    chatClose: 'Đóng chat',
    chatOpenLabel: 'Mở chat',
    chatErrorMissingKey: 'Thiếu cấu hình API key.',
    chatErrorUnauthorized: 'API key không hợp lệ.',
    chatErrorRateLimited: 'Đang quá tải, thử lại sau ít phút.',
    chatErrorNetwork: 'Không nhận được phản hồi, thử lại nhé.',
    chatErrorUnknown: 'Đã có lỗi xảy ra, thử lại nhé.',
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
