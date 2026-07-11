import { useI18n } from '../lib/i18n'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t } = useI18n()

  return (
    <header className="app-masthead">
      <div className="masthead-scale" aria-hidden="true" />
      <div className="masthead-inner">
        <div className="masthead-row">
          <h1>{t.appTitle}</h1>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
