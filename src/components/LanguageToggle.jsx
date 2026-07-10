import { useI18n } from '../lib/i18n'

export default function LanguageToggle() {
  const { lang, setLang } = useI18n()

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'vi' ? 'is-active' : ''}
        onClick={() => setLang('vi')}
      >
        VI
      </button>
    </div>
  )
}
