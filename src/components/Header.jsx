import { useI18n } from '../lib/i18n'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t } = useI18n()

  return (
    <header className="app-header">
      <div className="app-header-top">
        <div>
          <h1>{t.appTitle}</h1>
          <p className="app-subtitle">{t.appSubtitle}</p>
        </div>
        <LanguageToggle />
      </div>
      <p className="disclaimer">{t.disclaimer}</p>
    </header>
  )
}
