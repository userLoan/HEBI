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
          {paragraphs[1] && <p>{paragraphs[1]}</p>}
        </div>

        <img className="about-hunre-logo" src={images.hunreLogo.src} alt={images.hunreLogo.alt[lang]} />

        <img className="about-river-photo" src={images.redRiver.src} alt={images.redRiver.alt[lang]} />

        {paragraphs[2] && <p>{paragraphs[2]}</p>}

        <div className="story-section-text story-section-text-spaced">
          <span className="story-section-number">03</span>
          {paragraphs[3] && <p>{paragraphs[3]}</p>}
        </div>

        {paragraphs.slice(4).map((paragraph, index) => (
          <p key={index + 4}>{paragraph}</p>
        ))}
      </section>
    </div>
  )
}
