import { useEffect, type MouseEvent } from 'react'
import {
  ArrowDown, ArrowRight, BedDouble, BriefcaseBusiness, ExternalLink,
  Images, Landmark, ReceiptText, Users,
} from 'lucide-react'
import './ConceptPage.css'
import costPlan from './data/costPlan.json'

const exterior = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Boutique+Guesthouse+at+Golden+Hour.webp'
const coworking = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Coworking+Terrace+at+Golden+Hour.webp'
const kitchen = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Tropical+Open-Air+Kitchen+Lounge.webp'
const bedroom = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bedroom.avif'
const bathroom = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/bathroom+view+shower.avif'

const principles = [
  ['Repeat', 'One clear room module keeps planning, structure and procurement straightforward.'],
  ['Shade', 'Deep cover and open edges reduce heat before mechanical cooling is considered.'],
  ['Share', 'The upper floor concentrates work, cooking and social life in one flexible place.'],
  ['Maintain', 'Simple, locally serviceable materials support a durable operating model.'],
]

const formatMillions = (value: number) => `LKR ${(value / 1_000_000).toFixed(2)}m`

export default function ConceptPage() {
  const scrollToSummary = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      const scrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - (window.innerWidth <= 650 ? 145 : 170))
      document.documentElement.style.scrollBehavior = scrollBehavior
    }
  }

  useEffect(() => {
    document.title = 'Concept — Ahangama Guesthouse'
    const handleHashChange = () => {
      if (window.location.hash) scrollToSummary(window.location.hash.slice(1))
    }

    requestAnimationFrame(handleHashChange)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    window.history.pushState(null, '', `#${id}`)
    scrollToSummary(id)
  }

  return (
    <div className="simple-concept">
      <header className="concept-header">
        <a href="#top" className="concept-mark"><span>AG</span><strong>Ahangama Guesthouse</strong></a>
        <nav aria-label="Concept sections"><a href="#idea">Idea</a><a href="#rooms">Rooms</a><a href="#upstairs">Upstairs</a><a href="#details">Details</a></nav>
        <a href="/" className="concept-workspace">Project workspace <ExternalLink /></a>
      </header>

      <main id="top">
        <section className="concept-hero">
          <img src={exterior} alt="Tropical two-storey Ahangama guesthouse concept at golden hour" />
          <div className="concept-hero-shade" />
          <div className="concept-hero-copy">
            <p>Ahangama, Sri Lanka · Initial concept</p>
            <h1>Ahangama<br />Guesthouse</h1>
            <strong>Four private rooms below.<br />A shared tropical life above.</strong>
          </div>
          <a href="#idea" className="concept-scroll">The idea <ArrowDown /></a>
        </section>

        <nav className="concept-panel" aria-label="Concept overview">
          <a href="#design-summary" onClick={(event) => jumpTo(event, 'design-summary')}><Landmark /><span><small>01</small><strong>Design</strong><em>Form, planning and construction</em></span><ArrowDown /></a>
          <a href="#image-summary" onClick={(event) => jumpTo(event, 'image-summary')}><Images /><span><small>02</small><strong>Images</strong><em>18 visual studies and films</em></span><ArrowDown /></a>
          <a href="#cost-summary" onClick={(event) => jumpTo(event, 'cost-summary')}><ReceiptText /><span><small>03</small><strong>Cost</strong><em>V13 planning position</em></span><ArrowDown /></a>
        </nav>

        <section className="concept-intro" id="idea">
          <span>01 / The idea</span>
          <div>
            <h2>Simple enough to build.<br />Generous enough to remember.</h2>
            <p>A compact guesthouse shaped around the essentials: quiet rooms, useful shade, natural air and one communal upper floor where guests can work, cook and gather.</p>
          </div>
          <aside>
            <div><BedDouble /><strong>4</strong><span>private rooms</span></div>
            <div><Users /><strong>8</strong><span>guests</span></div>
            <div><BriefcaseBusiness /><strong>6–8</strong><span>coworking places</span></div>
          </aside>
        </section>

        <section className="concept-principles" aria-label="Design principles">
          {principles.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </section>

        <section className="rooms-story" id="rooms">
          <div className="rooms-copy">
            <span>02 / Ground floor</span>
            <h2>A calm room,<br />repeated four times.</h2>
            <p>Each room is conceived as a compact 26 m² retreat with a king bed, private en-suite, practical storage and a shaded relationship to the garden.</p>
            <dl>
              <div><dt>Room allowance</dt><dd>26 m² including en-suite</dd></div>
              <div><dt>Capacity</dt><dd>2 guests per room</dd></div>
              <div><dt>Planning idea</dt><dd>Repeatable room module</dd></div>
            </dl>
          </div>
          <figure className="bedroom-image"><img src={bedroom} alt="Warm minimal guestroom interior concept" loading="lazy" /><figcaption>Guestroom atmosphere · concept study</figcaption></figure>
          <figure className="bathroom-image"><img src={bathroom} alt="Compact tropical guesthouse shower concept" loading="lazy" /><figcaption>En-suite material direction</figcaption></figure>
        </section>

        <section className="upstairs-story" id="upstairs">
          <header><span>03 / First floor</span><h2>The social floor.</h2><p>An open, shaded level for focused work in the morning, shared meals in the evening and a breeze throughout the day.</p></header>
          <div className="upstairs-images">
            <figure><img src={coworking} alt="Open first-floor coworking terrace concept" loading="lazy" /><figcaption><strong>48 m²</strong> coworking lounge · 6–8 places</figcaption></figure>
            <figure><img src={kitchen} alt="Shared open-air kitchen and lounge concept" loading="lazy" /><figcaption><strong>14 m²</strong> shared kitchen</figcaption></figure>
          </div>
          <div className="upstairs-strip"><span>Covered lounge</span><span>Shared kitchen</span><span>Open terrace</span><span>External arrival</span></div>
        </section>

        <section className="concept-materials">
          <div><span>04 / Character</span><h2>Tropical, useful,<br />quietly crafted.</h2></div>
          <div className="material-list">
            <p><strong>Structure</strong><span>A simple reinforced-concrete frame designed around repetition.</span></p>
            <p><strong>Roof</strong><span>A generous pitched roof with an expressed timber character.</span></p>
            <p><strong>Envelope</strong><span>Deep shade, open edges and robust masonry where enclosure is needed.</span></p>
            <p><strong>Palette</strong><span>Warm timber, lime-toned walls, natural textures and restrained fittings.</span></p>
          </div>
        </section>

        <section className="concept-caveat">
          <span>Concept status</span>
          <p>The visual language and spatial arrangement are provisional. Survey, orientation, planning constraints, structure, services and current market pricing still require consultant verification.</p>
        </section>

        <section className="summary-section design-summary" id="design-summary">
          <header><span>Design summary</span><h2>The scheme<br />at a glance.</h2></header>
          <div className="summary-body">
            <p className="summary-lead">A two-level, 16 × 7 m guesthouse concept: private accommodation and aligned wet areas below, with a mostly open communal floor beneath a generous pitched roof.</p>
            <div className="summary-facts">
              <div><span>Site allowance</span><strong>20 perches</strong><small>Approximately 506 m²</small></div>
              <div><span>Building footprint</span><strong>112 m²</strong><small>16 × 7 m drawing basis</small></div>
              <div><span>Gross floor area</span><strong>224 m²</strong><small>Includes covered open floor</small></div>
              <div><span>Accommodation</span><strong>4 rooms</strong><small>8 guests total</small></div>
            </div>
            <div className="summary-points">
              <p><strong>Ground floor</strong><span>Four repeatable rooms, private en-suites, covered access and concentrated services.</span></p>
              <p><strong>First floor</strong><span>Coworking lounge, shared kitchen, open terrace and external arrival.</span></p>
              <p><strong>Construction</strong><span>Provisional reinforced-concrete frame, masonry enclosure and expressed timber roof.</span></p>
              <p><strong>Still to resolve</strong><span>Survey, orientation, approvals, soil, drainage, services and upper-floor enclosure strategy.</span></p>
            </div>
            <a className="summary-link" href="/plans">Review the drawing set <ArrowRight /></a>
          </div>
        </section>

        <section className="summary-section image-summary" id="image-summary">
          <header><span>Image summary</span><h2>The visual<br />direction.</h2></header>
          <div className="summary-body">
            <p className="summary-lead">The current library tests a warm, low-key tropical character rather than prescribing finished architecture. It covers the building, communal floor and compact guestroom experience.</p>
            <div className="media-counts">
              <div><strong>04</strong><span>Exterior views</span></div>
              <div><strong>07</strong><span>Coworking studies</span><small>2 stills · 5 films</small></div>
              <div><strong>07</strong><span>Guestroom studies</span></div>
            </div>
            <div className="summary-image-strip">
              <img src={exterior} alt="Exterior concept preview" loading="lazy" />
              <img src={coworking} alt="Coworking concept preview" loading="lazy" />
              <img src={bedroom} alt="Guestroom concept preview" loading="lazy" />
            </div>
            <a className="summary-link" href="/images">Open all images and films <ArrowRight /></a>
          </div>
        </section>

        <section className="summary-section cost-summary" id="cost-summary">
          <header><span>Cost summary</span><h2>A planning<br />position, not a quote.</h2></header>
          <div className="summary-body">
            <p className="summary-lead">Cost Plan V13 combines historical BOQ rates with provisional allowances. It is useful for scope coordination, but current market pricing and measured quantities remain unverified.</p>
            <div className="cost-overview">
              <div><span>Base estimate</span><strong>{formatMillions(costPlan.totals.base)}</strong></div>
              <div><span>15% contingency</span><strong>{formatMillions(costPlan.totals.contingency)}</strong></div>
              <div className="cost-total"><span>Planning total</span><strong>{formatMillions(costPlan.totals.total)}</strong></div>
            </div>
            <div className="cost-notes">
              <p><strong>18</strong><span>cost packages</span></p>
              <p><strong>140</strong><span>detailed BOQ lines</span></p>
              <p><strong>Unpriced</strong><span>upper-floor enclosure</span></p>
            </div>
            <p className="cost-warning-copy">Land, taxes, financing and escalation are excluded. Generator sizing, external works, soil, wastewater and several overlaps require verification.</p>
            <a className="summary-link" href="/cost">Review cost packages and risks <ArrowRight /></a>
          </div>
        </section>

        <section className="detail-links" id="details">
          <header><span>08 / Explore</span><h2>Go deeper.</h2><p>The full working material remains available when more detail is useful.</p></header>
          <nav aria-label="Detailed project pages">
            <a href="/images"><span>Visual library</span><strong>Exterior, coworking and room studies</strong><ArrowRight /></a>
            <a href="/plans"><span>Drawing set</span><strong>Plans, section, elevation and schedule</strong><ArrowRight /></a>
            <a href="/cost"><span>Cost plan V13</span><strong>Packages, BOQ, assumptions and risks</strong><ArrowRight /></a>
            <a href="/"><span>Project workspace</span><strong>Assumptions, structure and coordination</strong><ArrowRight /></a>
          </nav>
        </section>
      </main>

      <footer className="concept-footer"><strong>Ahangama Guesthouse</strong><span>Stage 1 concept · October 2026</span></footer>
    </div>
  )
}
