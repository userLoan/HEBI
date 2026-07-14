import { useI18n } from '../lib/i18n'
import about from '../data/about.json'

export default function MethodologyPage() {
  const { lang, t } = useI18n()

  return (
    <div className="app-shell about-shell">
      <section className="panel">
        <h2 className="panel-kicker">{about.methodology.heading[lang]}</h2>
        <p>{about.methodology.intro[lang]}</p>

        <div className="methodology-table">
          <div className="methodology-group">
            <h3>{t.aboutExposureGroupTitle}</h3>
            <p>{about.methodology.exposureGroup.label[lang]}</p>
            <ul>
              {(about.methodology.exposureGroup.indicators ?? []).map((item) => (
                <li key={item.en} className="methodology-indicator">
                  <img className="methodology-indicator-thumb" src={item.image} alt={item[lang]} />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="methodology-group">
            <h3>{t.aboutVulnerabilityGroupTitle}</h3>
            <p>{about.methodology.vulnerabilityGroup.label[lang]}</p>
            <ul>
              {(about.methodology.vulnerabilityGroup.indicators ?? []).map((item) => (
                <li key={item.en} className="methodology-indicator">
                  <img className="methodology-indicator-thumb" src={item.image} alt={item[lang]} />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p>{about.methodology.normalizationParagraph[lang]}</p>

        <p>{about.methodology.formulaLabel[lang]}</p>
        <div className="formula-box">{about.methodology.formula[lang]}</div>

        <p>{about.methodology.researchNoteParagraph[lang]}</p>
        <p>{about.methodology.mainDriverParagraph[lang]}</p>
        <p>{about.methodology.relativeIndexParagraph[lang]}</p>

        <div className="flow-diagram">
          <span className="flow-diagram-caption">{about.methodology.flowDiagram.caption[lang]}</span>
          <div className="flow-diagram-steps">
            {(about.methodology.flowDiagram.steps[lang] ?? []).map((step, index, steps) => (
              <span className="flow-diagram-step-wrap" key={step}>
                <span className="flow-diagram-step">{step}</span>
                {index < steps.length - 1 && <span className="flow-diagram-arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
