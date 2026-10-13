import { useRef, useState } from 'react'
import {
  ArrowDown, Check, ChevronRight, Download, ExternalLink, FileUp, HardDrive,
  History, Image, Menu, Plus, RotateCcw, X,
} from 'lucide-react'
import './App.css'
import { ConceptPlan } from './components/ConceptPlan'
import type { AreaClass, Floor, RegisterRecord, Space, Status } from './data/project'
import { calculateAreaTotals, calculateRectangularSiteArea } from './data/projectStore'
import { useProject } from './hooks/useProject'

const imageLow = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Four-room+Ahangama+guesthouse+with+timber+lounge-low-res.webp'
const imageHigh = 'https://customer-apps-techhq.s3.eu-west-2.amazonaws.com/ahangama-design/Four-room+Ahangama+guesthouse+with+timber+lounge-high-res.png'

const nav = [
  ['overview', 'Overview'], ['site', 'Site & constraints'], ['design', 'Design & plans'],
  ['areas', 'Areas'], ['materials', 'Materials'], ['coordination', 'Consultants'],
  ['register', 'Decisions'], ['roadmap', 'Roadmap'],
]

const statusLabels: Record<Status, string> = {
  confirmed: 'Confirmed', provisional: 'Provisional', open: 'Not confirmed', recorded: 'Recorded',
}

function StatusMark({ status }: { status: Status }) {
  return <span className={`status status-${status}`}>{statusLabels[status]}</span>
}

function SectionHeading({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro: string }) {
  return (
    <header className="section-heading">
      <span className="section-number">{number}</span>
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-intro">{intro}</p></div>
    </header>
  )
}

function App() {
  const { project, update, message, recordSnapshot, exportProject, importProject, reset } = useProject()
  const [navOpen, setNavOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState<string | null>('g-1')
  const [planFloor, setPlanFloor] = useState<Floor>('Ground')
  const [registerFilter, setRegisterFilter] = useState('All')
  const [selectedRecord, setSelectedRecord] = useState<string | null>('A-001')
  const importRef = useRef<HTMLInputElement>(null)
  const totals = calculateAreaTotals(project.spaces)
  const siteArea = calculateRectangularSiteArea(project.site)
  const activeSpace = project.spaces.find((space) => space.id === selectedSpace)
  const activeRecord = project.register.find((record) => record.id === selectedRecord)
  const filteredRecords = project.register.filter((record) => registerFilter === 'All' || record.type === registerFilter)

  const updateSpace = (id: string, patch: Partial<Space>) => update((current) => ({
    ...current, spaces: current.spaces.map((space) => space.id === id ? { ...space, ...patch } : space),
  }))

  const updateRecord = (id: string, patch: Partial<RegisterRecord>) => update((current) => ({
    ...current,
    register: current.register.map((record) => record.id === id ? { ...record, ...patch, updatedAt: new Date().toISOString().slice(0, 10) } : record),
  }))

  const addRecord = () => {
    const id = `Q-${String(project.register.length + 1).padStart(3, '0')}`
    const date = new Date().toISOString().slice(0, 10)
    const record: RegisterRecord = { id, type: 'Open question', title: 'New project question', description: '', discipline: 'Architecture', priority: 'Normal', status: 'open', source: '', responsible: '', createdAt: date, updatedAt: date, targetDate: '', related: '', impact: '' }
    update((current) => ({ ...current, register: [record, ...current.register] }))
    setSelectedRecord(id)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#overview"><span>AG</span><strong>Ahangama Guesthouse</strong></a>
        <button className="icon-button nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation"><Menu /></button>
        <nav className={navOpen ? 'is-open' : ''} aria-label="Project sections">
          {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setNavOpen(false)}>{label}</a>)}
        </nav>
        <div className="storage-state"><HardDrive size={15} /><span>Local workspace</span></div>
      </header>

      <main>
        <section id="overview" className="hero-section">
          <button className="hero-image" onClick={() => setImageOpen(true)} aria-label="Enlarge architectural reference image">
            <img src={imageLow} alt="Architectural concept reference showing a long tropical two-storey guesthouse with four rooms below and an open timber lounge above" />
            <span className="image-action"><Image size={16} /> View reference</span>
          </button>
          <div className="hero-overlay">
            <div className="hero-kicker"><StatusMark status="provisional" /><span>Initial concept · Ahangama, Sri Lanka</span></div>
            <h1>A simple guesthouse,<br />designed to work hard.</h1>
            <p>Four repeatable rooms below. A shaded communal life above. Every design move tested against comfort, buildability and cost.</p>
            <a href="#design" className="hero-link">Explore the concept <ArrowDown size={17} /></a>
          </div>
          <p className="image-caption">Primary architectural reference · visual inspiration only, not technical evidence</p>
        </section>

        <section className="project-strip" aria-label="Project summary">
          <div><span>Accommodation</span><strong>4 rooms · 8 guests</strong></div>
          <div><span>Communal brief</span><strong>6–8 coworking places</strong></div>
          <div><span>Enclosed area</span><strong>{totals.byClass.enclosed} m² <small>provisional</small></strong></div>
          <div><span>Critical unknowns</span><strong>{project.register.filter((item) => item.priority === 'Critical' && item.status === 'open').length} open</strong></div>
        </section>

        <section className="content-section intent-section">
          <SectionHeading number="01" eyebrow="Project intent" title="Economy through clarity" intro="Low cost should come from disciplined decisions, not reduced comfort or short-lived materials." />
          <div className="principles">
            {[
              ['01', 'Repeat', 'Use one efficient room module and align wet areas wherever practical.'],
              ['02', 'Simplify', 'Keep the grid, circulation, roof and construction junctions straightforward.'],
              ['03', 'Shade', 'Prioritise deep cover and natural airflow before mechanical responses.'],
              ['04', 'Maintain', 'Choose locally available materials and systems that can be repaired simply.'],
            ].map(([index, title, text]) => <article key={title}><span>{index}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <blockquote>“Review the concept, test its assumptions and recommend simplifications before the layout becomes fixed.”<cite>Consultant invitation · Stage 1</cite></blockquote>
        </section>

        <section id="site" className="content-section site-section">
          <SectionHeading number="02" eyebrow="Site & constraints" title="Unknown until verified" intro="No surveyed boundary, orientation or planning requirement is inferred from the visual reference." />
          <div className="site-layout">
            <div className="site-diagram">
              <div className="site-boundary"><span>Surveyed boundary<br />not available</span><div className="building-footprint">Indicative building<br />placement only</div></div>
              <div className="north-marker">N?<ArrowDown /></div>
              <p>{siteArea ? <><strong>{siteArea} m²</strong> simple rectangular assumption</> : <><strong>Site area not calculated</strong>Enter both plot dimensions to test a rectangular assumption.</>}</p>
            </div>
            <div className="site-fields">
              {project.site.map((field) => <label key={field.id}><span>{field.label}<StatusMark status={field.value ? field.status : 'open'} /></span><input value={field.value} placeholder="Not confirmed" inputMode={field.id.includes('plot-') ? 'decimal' : 'text'} onChange={(event) => update((current) => ({ ...current, site: current.site.map((item) => item.id === field.id ? { ...item, value: event.target.value } : item) }))} /></label>)}
            </div>
          </div>
        </section>

        <section id="design" className="content-section plans-section">
          <SectionHeading number="03" eyebrow="Design logic" title="One clear spatial idea" intro="The diagrams explain relationships, not technical dimensions. Area edits update schedules but do not redraw geometry." />
          <div className="plan-toolbar"><div className="segmented">{(['Ground', 'First'] as Floor[]).map((floor) => <button key={floor} className={planFloor === floor ? 'active' : ''} onClick={() => { setPlanFloor(floor); setSelectedSpace(floor === 'Ground' ? 'g-1' : 'f-lounge') }}>{floor} floor</button>)}</div><strong>CONCEPT ONLY — NOT TO SCALE</strong></div>
          <div className="plan-workspace">
            <div className="plan-canvas"><ConceptPlan floor={planFloor} spaces={project.spaces} selectedId={selectedSpace} onSelect={setSelectedSpace} /><p>Editable values are maintained separately from this fixed schematic geometry.</p></div>
            <aside className="space-inspector">
              {activeSpace && <>
                <div className="inspector-heading"><StatusMark status={activeSpace.status} /><span>{activeSpace.id.toUpperCase()}</span></div>
                <label>Space name<input value={activeSpace.name} onChange={(event) => updateSpace(activeSpace.id, { name: event.target.value })} /></label>
                <label>Scheduled unit area <div className="number-input"><input type="number" min="0" step="0.5" value={activeSpace.unitArea} onChange={(event) => updateSpace(activeSpace.id, { unitArea: Number(event.target.value) })} /><span>m²</span></div></label>
                <label>Notes<textarea rows={5} value={activeSpace.notes} onChange={(event) => updateSpace(activeSpace.id, { notes: event.target.value })} /></label>
                <div className="inspector-question"><strong>Design question</strong><p>{activeSpace.floor === 'Ground' ? 'Can this module become more efficient without compromising privacy, ventilation or the included bathroom?' : 'How should weather protection preserve openness without creating a costly enclosure?'}</p></div>
              </>}
            </aside>
          </div>
        </section>

        <section id="areas" className="content-section areas-section">
          <SectionHeading number="04" eyebrow="Area & efficiency" title="Count every metre once" intro="Room allowances include their en-suites. Covered open space and uncovered terrace remain separate from enclosed floor area." />
          <div className="area-totals">
            {([['enclosed', 'Enclosed floor area'], ['covered-open', 'Covered open area'], ['uncovered', 'Uncovered terrace']] as [AreaClass, string][]).map(([key, label]) => <div key={key}><span>{label}</span><strong>{totals.byClass[key]} <small>m²</small></strong></div>)}
            <div className="total"><span>Total scheduled area</span><strong>{totals.scheduled} <small>m²</small></strong></div>
          </div>
          <div className="table-wrap"><table><thead><tr><th>Space</th><th>Floor</th><th>Category</th><th>Qty</th><th>Unit area</th><th>Total</th><th>Classification</th><th>Status</th></tr></thead><tbody>{project.spaces.map((space) => <tr key={space.id}><td><button className="text-button" onClick={() => { setPlanFloor(space.floor); setSelectedSpace(space.id); document.querySelector('#design')?.scrollIntoView() }}>{space.name}</button><small>{space.includes?.join(' + ')}</small></td><td>{space.floor}</td><td>{space.category}</td><td>{space.quantity}</td><td><input aria-label={`${space.name} unit area`} type="number" min="0" step="0.5" value={space.unitArea} onChange={(event) => updateSpace(space.id, { unitArea: Number(event.target.value) })} /></td><td>{space.quantity * space.unitArea} m²</td><td>{space.areaClass.replace('-', ' ')}</td><td><StatusMark status={space.status} /></td></tr>)}</tbody><tfoot><tr><td colSpan={5}>Ground floor subtotal</td><td colSpan={3}>{totals.byFloor.Ground} m²</td></tr><tr><td colSpan={5}>First floor subtotal</td><td colSpan={3}>{totals.byFloor.First} m²</td></tr></tfoot></table></div>
        </section>

        <section id="materials" className="content-section materials-section">
          <SectionHeading number="05" eyebrow="Materials & atmosphere" title="Warm, durable, repairable" intro="The reference establishes a mood, not a specification. Timber visible in the image does not confirm timber construction." />
          <div className="materials-layout">
            <figure><img src={imageLow} alt="Crop of the main architectural reference used as material atmosphere inspiration" /><figcaption>Reference inspiration · natural shade, open edges and a strong protective roof</figcaption></figure>
            <div className="material-directions">
              {[
                ['Overall form', 'Long, legible volume beneath one simple pitched roof', 'provisional'],
                ['Guest rooms', 'Calm surfaces, shaded openings and robust built-in elements', 'provisional'],
                ['Bathrooms', 'Compact wet zones with easily sourced, replaceable fittings', 'open'],
                ['Communal terrace', 'An open, breezy room with movable furniture and rain protection', 'provisional'],
                ['Material strategy', 'Compare masonry, concrete and responsibly sourced timber by cost and maintenance', 'open'],
              ].map(([title, text, status]) => <article key={title}><div><h3>{title}</h3><StatusMark status={status as Status} /></div><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="coordination" className="content-section coordination-section">
          <SectionHeading number="06" eyebrow="Consultant engagement" title="A focused question for each discipline" intro="Professional input should protect the concept’s simplicity while exposing missing information and hidden cost." />
          <div className="discipline-list">{project.coordination.map((item, index) => <details key={item.id} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.discipline}</strong><em>{item.status}</em><ChevronRight /></summary><div className="discipline-body"><div className="lead-question"><span>Primary question</span><p>{item.prompt}</p></div><dl><div><dt>Responsible</dt><dd>{item.responsibility}</dd></div><div><dt>Dependency</dt><dd>{item.dependency}</dd></div><div><dt>Impact</dt><dd>{item.impact}</dd></div></dl><label>Consultant response / recommendations<textarea rows={4} value={item.notes} placeholder="Add review notes, risks or recommendations…" onChange={(event) => update((current) => ({ ...current, coordination: current.coordination.map((record) => record.id === item.id ? { ...record, notes: event.target.value } : record) }))} /></label><div className="inline-fields"><label>Status<select value={item.status} onChange={(event) => update((current) => ({ ...current, coordination: current.coordination.map((record) => record.id === item.id ? { ...record, status: event.target.value as typeof item.status } : record) }))}><option>Open</option><option>In review</option><option>Resolved</option></select></label><label>Target date<input type="date" value={item.targetDate} onChange={(event) => update((current) => ({ ...current, coordination: current.coordination.map((record) => record.id === item.id ? { ...record, targetDate: event.target.value } : record) }))} /></label></div></div></details>)}</div>
          <p className="future-note"><Plus size={17} /> Expandable later: planning, operations, feasibility and financing</p>
        </section>

        <section id="register" className="content-section register-section">
          <SectionHeading number="07" eyebrow="Project register" title="Know what is true, and what is not" intro="Editing a value does not confirm it. Sources, responsibility and status remain explicit." />
          <div className="register-tools"><div className="filter-row">{['All', 'Confirmed information', 'Provisional assumption', 'Open question', 'Recorded decision'].map((filter) => <button className={registerFilter === filter ? 'active' : ''} key={filter} onClick={() => setRegisterFilter(filter)}>{filter}</button>)}</div><button className="primary-button" onClick={addRecord}><Plus /> Add record</button></div>
          <div className="register-layout"><div className="record-list">{filteredRecords.map((record) => <button key={record.id} className={selectedRecord === record.id ? 'active' : ''} onClick={() => setSelectedRecord(record.id)}><span><strong>{record.id}</strong><StatusMark status={record.status} /></span><h3>{record.title}</h3><p>{record.discipline} · {record.priority} priority</p></button>)}</div>{activeRecord && <div className="record-editor"><div className="editor-grid"><label>Record type<select value={activeRecord.type} onChange={(event) => updateRecord(activeRecord.id, { type: event.target.value as RegisterRecord['type'] })}><option>Confirmed information</option><option>Provisional assumption</option><option>Open question</option><option>Recorded decision</option></select></label><label>Status<select value={activeRecord.status} onChange={(event) => updateRecord(activeRecord.id, { status: event.target.value as Status })}><option value="confirmed">Confirmed</option><option value="provisional">Provisional</option><option value="open">Open</option><option value="recorded">Recorded</option></select></label></div><label>Title<input value={activeRecord.title} onChange={(event) => updateRecord(activeRecord.id, { title: event.target.value })} /></label><label>Description<textarea rows={4} value={activeRecord.description} onChange={(event) => updateRecord(activeRecord.id, { description: event.target.value })} /></label><div className="editor-grid"><label>Discipline<input value={activeRecord.discipline} onChange={(event) => updateRecord(activeRecord.id, { discipline: event.target.value })} /></label><label>Priority<select value={activeRecord.priority} onChange={(event) => updateRecord(activeRecord.id, { priority: event.target.value as RegisterRecord['priority'] })}><option>Critical</option><option>High</option><option>Normal</option></select></label><label>Responsible party<input value={activeRecord.responsible} onChange={(event) => updateRecord(activeRecord.id, { responsible: event.target.value })} /></label><label>Target resolution<input type="date" value={activeRecord.targetDate} onChange={(event) => updateRecord(activeRecord.id, { targetDate: event.target.value })} /></label></div><label>Source or rationale<input value={activeRecord.source} onChange={(event) => updateRecord(activeRecord.id, { source: event.target.value })} /></label><label>Impact on design, cost or feasibility<textarea rows={2} value={activeRecord.impact} onChange={(event) => updateRecord(activeRecord.id, { impact: event.target.value })} /></label><p className="record-dates">Created {activeRecord.createdAt} · Updated {activeRecord.updatedAt}</p></div>}</div>
        </section>

        <section id="roadmap" className="content-section roadmap-section">
          <SectionHeading number="08" eyebrow="Development pathway" title="Resolve uncertainty in the right order" intro="Only the concept stage is active. Later stages describe required work without inventing costs, projections or specifications." />
          <ol className="roadmap">{[
            ['Concept', 'Active', 'Brief, references, provisional plans, area schedule and assumptions', 'Consultant-ready concept package'],
            ['Consultant review', 'Next', 'Architecture, structure, MEP, interiors and cost-planning feedback', 'Coordinated recommendations and closed critical questions'],
            ['Feasibility', 'Pending', 'Cost range, market assumptions, operations and funding requirements', 'Evidence-based go / revise decision'],
            ['Schematic design', 'Pending', 'Coordinated drawings, systems strategy and updated estimates', 'Approved coordinated schematic package'],
            ['Detailed design', 'Pending', 'Technical documents, specifications, schedules and bill of quantities', 'Construction and financing documentation'],
          ].map(([name, stageStatus, deliverables, completion], index) => <li key={name} className={index === 0 ? 'active' : ''}><div className="stage-index">{String(index + 1).padStart(2, '0')}</div><div><span>{stageStatus}</span><h3>{name}</h3><p>{deliverables}</p><small>Completion: {completion}</small></div></li>)}</ol>
        </section>

        <section className="workspace-footer">
          <div><p className="eyebrow">Workspace data</p><h2>Keep the concept portable.</h2><p>Data is stored only in this browser. It is not shared with consultants unless you export and send the JSON file.</p><span className="save-message"><Check size={15} /> {message}</span></div>
          <div className="workspace-actions"><button onClick={recordSnapshot}><History /> Record snapshot</button><button onClick={exportProject}><Download /> Export JSON</button><button onClick={() => importRef.current?.click()}><FileUp /> Import JSON</button><input ref={importRef} hidden type="file" accept="application/json" onChange={(event) => event.target.files?.[0] && importProject(event.target.files[0])} /><button className="danger-button" onClick={reset}><RotateCcw /> Reset data</button></div>
        </section>
      </main>

      {imageOpen && <div className="image-modal" role="dialog" aria-modal="true" aria-label="Architectural reference image"><button className="modal-close" onClick={() => setImageOpen(false)} aria-label="Close image"><X /></button><img src={imageHigh} alt="High resolution architectural concept reference for the Ahangama guesthouse" /><div><span>Architectural reference · not technical evidence</span><a href={imageHigh} target="_blank" rel="noreferrer">Open high resolution <ExternalLink size={16} /></a></div></div>}
    </div>
  )
}

export default App