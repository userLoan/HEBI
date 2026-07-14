import { useI18n } from '../lib/i18n'
import about from '../data/about.json'

export default function DataSourcesPage() {
  const { lang, t } = useI18n()

  return (
    <div className="app-shell about-shell">
      <section className="panel">
        <h2 className="panel-kicker">{about.dataSources.heading[lang]}</h2>
        {(about.dataSources.paragraphs[lang] ?? []).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <div className="source-logos">
          <span className="source-logos-label">{t.aboutSourcesTitle}</span>
          <div className="source-logos-grid">
            {about.dataSources.sourceChips.map((chip) => (
              <figure className="source-logo-card" key={chip.en}>
                <img src={chip.image} alt={chip[lang]} />
                <figcaption>{chip[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
