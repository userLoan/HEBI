import { useI18n } from '../lib/i18n'
import LanguageToggle from './LanguageToggle'

export default function Header({ view, onNavigate }) {
  const { t } = useI18n()

  return (
    <header className="app-masthead">
      <div className="masthead-inner">
        <div className="masthead-row">
          <h1>{t.appTitle}</h1>
          <div className="masthead-controls">
            <nav className="nav-tabs" aria-label="Navigation">
              <a
                href="/"
                className={view === 'dashboard' ? 'is-active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/')
                }}
              >
                {t.navDashboard}
              </a>
              <a
                href="/about"
                className={view === 'about' ? 'is-active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/about')
                }}
              >
                {t.navAbout}
              </a>
              <a
                href="/data-sources"
                className={view === 'data-sources' ? 'is-active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/data-sources')
                }}
              >
                {t.navDataSources}
              </a>
              <a
                href="/methodology"
                className={view === 'methodology' ? 'is-active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/methodology')
                }}
              >
                {t.navMethodology}
              </a>
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
