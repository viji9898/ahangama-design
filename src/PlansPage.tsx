import { useEffect, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight, Download,
  ExternalLink, FileText, Maximize2, Minus, Plus, Printer,
} from 'lucide-react'
import './PlansPage.css'
import sitePlan from './plans/A-001_site.svg'
import groundFloorPlan from './plans/A-101_ground_floor.svg'
import firstFloorPlan from './plans/A-102_first_floor.svg'
import roofPlan from './plans/A-103_roof.svg'
import sectionPlan from './plans/A-201_section.svg'
import elevationPlan from './plans/A-301_elevation.svg'
import quantitySchedule from './plans/Q-001_schedule.svg'

const sheets = [
  { id: 'A-001', title: 'Site arrangement', subtitle: '20 perches · diagrammatic', group: 'Site', src: sitePlan },
  { id: 'A-101', title: 'Ground floor', subtitle: 'Four-room arrangement', group: 'Plans', src: groundFloorPlan },
  { id: 'A-102', title: 'First floor', subtitle: 'Covered lounge + kitchen', group: 'Plans', src: firstFloorPlan },
  { id: 'A-103', title: 'Roof plan', subtitle: 'Area takeoff · 30° pitch', group: 'Plans', src: roofPlan },
  { id: 'A-201', title: 'Building section', subtitle: 'Weather envelope', group: 'Views', src: sectionPlan },
  { id: 'A-301', title: 'Front elevation', subtitle: 'Massing and openings', group: 'Views', src: elevationPlan },
  { id: 'Q-001', title: 'Quantity schedule', subtitle: 'QS basis + discrepancies', group: 'Schedule', src: quantitySchedule },
]

const criticalIssues = [
  'Each 4 × 7 m room bay is 28 m² gross, not the earlier 26 m² allowance.',
  'The drawn bathrooms are 8.4 m² each; the earlier cost allowance used 5 m².',
  'First-floor air conditioning requires a defined enclosed, conditioned zone.',
  'The external stair sits outside the 16 × 7 m footprint and may affect setbacks.',
  'Structure, openings, drainage, utilities and site levels require coordination.',
]

export default function PlansPage() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [showIssues, setShowIssues] = useState(false)
  const activeSheet = sheets[activeIndex]

  useEffect(() => {
    document.title = `${activeSheet.id} ${activeSheet.title} — Ahangama Drawings`
  }, [activeSheet])

  const selectSheet = (index: number) => {
    setActiveIndex(index)
    setZoom(1)
  }

  const move = (direction: -1 | 1) => {
    selectSheet((activeIndex + direction + sheets.length) % sheets.length)
  }

  return (
    <div className="drawings-page">
      <header className="drawings-topbar">
        <a href="/" className="drawings-brand"><span>AG</span><strong>Ahangama Guesthouse</strong></a>
        <div className="drawings-title"><span>Consultant drawing set</span><strong>Revision A · 14 October 2026</strong></div>
        <a href="/images" className="back-link">Images</a>
        <a href="/cost" className="back-link">Cost plan</a>
        <a href="/" className="back-link"><ArrowLeft /> Concept brief</a>
      </header>

      <main className="drawings-layout">
        <aside className="sheet-index">
          <div className="index-heading">
            <p>Drawing register</p>
            <strong>{sheets.length} sheets</strong>
          </div>
          <nav aria-label="Drawing sheets">
            {sheets.map((sheet, index) => (
              <button className={index === activeIndex ? 'active' : ''} key={sheet.id} onClick={() => selectSheet(index)}>
                <img src={sheet.src} alt="" />
                <span><b>{sheet.id}</b><strong>{sheet.title}</strong><small>{sheet.subtitle}</small></span>
              </button>
            ))}
          </nav>
          <button className="issues-toggle" onClick={() => setShowIssues(!showIssues)} aria-expanded={showIssues}>
            <AlertTriangle /> <span><strong>5 coordination issues</strong><small>Review before measurement</small></span>
          </button>
        </aside>

        <section className="drawing-workspace">
          <header className="viewer-header">
            <div><span>{activeSheet.group} · Sheet {activeIndex + 1} of {sheets.length}</span><h1>{activeSheet.id} / {activeSheet.title}</h1></div>
            <div className="drawing-actions">
              <button title="Previous sheet" aria-label="Previous sheet" onClick={() => move(-1)}><ChevronLeft /></button>
              <button title="Next sheet" aria-label="Next sheet" onClick={() => move(1)}><ChevronRight /></button>
              <span className="action-divider" />
              <button title="Zoom out" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(.65, value - .15))}><Minus /></button>
              <button className="zoom-value" title="Reset zoom" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button>
              <button title="Zoom in" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(2.5, value + .15))}><Plus /></button>
              <button title="Fit drawing" aria-label="Fit drawing" onClick={() => setZoom(1)}><Maximize2 /></button>
              <span className="action-divider" />
              <a href={activeSheet.src} download={`${activeSheet.id}_${activeSheet.title.replaceAll(' ', '_')}.svg`} title="Download SVG" aria-label="Download SVG"><Download /></a>
              <a href={activeSheet.src} target="_blank" rel="noreferrer" title="Open SVG in new tab" aria-label="Open SVG in new tab"><ExternalLink /></a>
              <button title="Print current page" aria-label="Print current page" onClick={() => window.print()}><Printer /></button>
            </div>
          </header>

          <div className="drawing-viewport">
            <div className="drawing-sheet" style={{ width: `${zoom * 100}%` }}>
              <img src={activeSheet.src} alt={`${activeSheet.id} ${activeSheet.title} consultant concept drawing`} />
            </div>
          </div>

          <footer className="viewer-footer">
            <div><span className="provisional-dot" /> Not for construction</div>
            <p>All dimensions, setbacks, levels and quantities require survey and consultant verification.</p>
            <span>SVG · 1400 × 990</span>
          </footer>
        </section>

        {showIssues && (
          <aside className="issues-panel">
            <header><div><span>Coordination review</span><h2>Resolve before pricing.</h2></div><button onClick={() => setShowIssues(false)} aria-label="Close issues"><ChevronRight /></button></header>
            <ol>{criticalIssues.map((issue, index) => <li key={issue}><span>{String(index + 1).padStart(2, '0')}</span><p>{issue}</p></li>)}</ol>
            <div className="qs-request"><FileText /><div><strong>Requested from QS</strong><p>Measure as provisional, report discrepancies, separate provisional sums and validate local rates before tender.</p></div></div>
          </aside>
        )}
      </main>
    </div>
  )
}
