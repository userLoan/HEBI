import { useI18n } from '../lib/i18n'
import about from '../data/about.json'

export default function AboutPage() {
  const { lang } = useI18n()
  const paragraphs = about.story.paragraphs[lang] ?? []
  const images = about.story.images

  return (
    <div className="app-shell about-shell">
      <section className="panel">
        <h2 className="panel-kicker">{about.story.heading}</h2>

        <div className="story-section">
          <div className="story-section-text">
            <span className="story-section-number">01</span>
            {paragraphs[0] && <p>{paragraphs[0]}</p>}
          </div>
          <div className="story-section-media story-section-media-column">
            <img className="about-author-photo" src={images.author.src} alt={images.author.alt[lang]} />
            <div className="about-contact-card">
              <span className="about-contact-name">{images.author.alt[lang]}</span>
              <span className="about-contact-email">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3.5 6L12 12.5L20.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {images.author.email}
              </span>
            </div>
          </div>
        </div>

        <div className="story-section-text">
          <span className="story-section-number">02</span>
          <h3 className="experience-label">{about.story.experience.label[lang]}</h3>
          <div className="experience-list">
            {about.story.experience.items.map((item) => (
              <div className="experience-item" key={item.date + item.role.en}>
                <span className="experience-date">{item.date}</span>
                <div className="experience-content">
                  <p className="experience-role">{item.role[lang]}</p>
                  <p className="experience-org">{item.org[lang]}</p>
                  <p className="experience-type">{item.type[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {paragraphs[1] && <p>{paragraphs[1]}</p>}

        <img className="about-river-photo" src={images.redRiver.src} alt={images.redRiver.alt[lang]} />

        {paragraphs[2] && <p>{paragraphs[2]}</p>}

        <div className="story-section-text">
          <span className="story-section-number">03</span>
          <h3 className="story-section-title">HEBI</h3>
        </div>

        {paragraphs.slice(3).map((paragraph, index) => (
          <p key={index + 3}>{paragraph}</p>
        ))}
      </section>
    </div>
  )
}
