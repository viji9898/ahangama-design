import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, ChevronRight, Download, FileSpreadsheet,
  Search, ShieldAlert,
} from 'lucide-react'
import './CostPage.css'
import costPlan from './data/costPlan.json'
import workbookUrl from './cost/Ahangama_Guesthouse_Complete_Cost_Plan_V13.xlsx?url'

const formatLkr = (value: number) => new Intl.NumberFormat('en-LK', {
  style: 'currency', currency: 'LKR', maximumFractionDigits: 0,
}).format(value)

const formatMillions = (value: number) => `LKR ${(value / 1_000_000).toFixed(2)}m`
const palette = ['#435b48', '#a7553a', '#c29b3a', '#49767a', '#6e5d77', '#817658']

export default function CostPage() {
  const [includeContingency, setIncludeContingency] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(costPlan.packages[0].package)
  const [search, setSearch] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')

  useEffect(() => {
    document.title = 'Cost Plan V13 — Ahangama Guesthouse'
  }, [])

  const displayedTotal = includeContingency ? costPlan.totals.total : costPlan.totals.base
  const selectedSummary = costPlan.packages.find((item) => item.package === selectedPackage)!
  const packageItems = useMemo(() => costPlan.items.filter((item) => {
    const matchesPackage = item.package === selectedPackage
    const query = search.toLowerCase()
    return matchesPackage && (!query || `${item.item} ${item.source} ${item.qualification}`.toLowerCase().includes(query))
  }), [selectedPackage, search])
  const riskStatuses = ['All', ...new Set(costPlan.risks.map((risk) => risk.status))]
  const visibleRisks = costPlan.risks.filter((risk) => riskFilter === 'All' || risk.status === riskFilter)
  const maxPackage = Math.max(...costPlan.packages.map((item) => includeContingency ? item.total : item.base))
  const pricedArea = 224

  return (
    <div className="cost-page">
      <header className="cost-topbar">
        <a className="cost-brand" href="/"><span>AG</span><strong>Ahangama Guesthouse</strong></a>
        <nav aria-label="Cost plan sections">
          <a href="#overview">Overview</a><a href="#packages">Packages</a><a href="#boq">Detailed BOQ</a><a href="#risks">Risks</a><a href="#basis">Basis</a>
        </nav>
        <a className="cost-plans-link" href="/images">Images</a>
        <a className="cost-plans-link" href="/plans">Drawing set</a>
        <a className="cost-back-link" href="/"><ArrowLeft /> Concept brief</a>
      </header>

      <main>
        <section className="cost-hero" id="overview">
          <div className="cost-hero-copy">
            <div className="cost-kicker"><span>Planning estimate</span><strong>Version {costPlan.version} · {costPlan.estimateDate}</strong></div>
            <h1>A cost plan built<br />to expose uncertainty.</h1>
            <p>Prototype estimate for the four-room guesthouse, assembled from historical BOQ rates and provisional allowances. It is a coordination tool, not a tender price.</p>
            <div className="cost-warning"><AlertTriangle /><span><strong>Market verification required.</strong> Historical rates, overlaps, exclusions and unpriced enclosure work remain unresolved.</span></div>
          </div>
          <div className="headline-cost">
            <span>{includeContingency ? 'Planning total including 15% contingency' : 'Base estimate before contingency'}</span>
            <strong>{formatMillions(displayedTotal)}</strong>
            <small>{formatLkr(displayedTotal)}</small>
            <div className="cost-mode" role="group" aria-label="Cost display mode">
              <button className={!includeContingency ? 'active' : ''} onClick={() => setIncludeContingency(false)}>Base</button>
              <button className={includeContingency ? 'active' : ''} onClick={() => setIncludeContingency(true)}>+ 15% contingency</button>
            </div>
          </div>
        </section>

        <section className="cost-metrics" aria-label="Cost plan summary">
          <div><span>Base estimate</span><strong>{formatMillions(costPlan.totals.base)}</strong><small>Workbook package total</small></div>
          <div><span>Planning contingency</span><strong>{formatMillions(costPlan.totals.contingency)}</strong><small>15% model convention</small></div>
          <div><span>Indicative cost / gross m²</span><strong>{formatLkr(costPlan.totals.total / pricedArea)}</strong><small>224 m² includes covered open floor</small></div>
          <div className="metric-alert"><span>Known unpriced scope</span><strong>Upper enclosure</strong><small>Zero placeholder; quote required</small></div>
        </section>

        <section className="cost-section evolution-section">
          <header className="cost-section-heading"><span>01</span><div><p>Scope evolution</p><h2>What moved the plan to LKR 47.52m.</h2></div></header>
          <div className="scope-bridge">
            {costPlan.comparison.map((item, index) => (
              <div key={item.label} className={index === 0 ? 'scope-base' : item.total === 0 ? 'scope-unpriced' : ''}>
                <span>{index === 0 ? 'Starting scope' : `+ ${String(index).padStart(2, '0')}`}</span>
                <strong>{formatMillions(item.total)}</strong>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <p className="scope-note">The comparison is arithmetic from the V13 workbook. “Prior scope” is recalculated and may differ slightly from previously quoted figures due to rounding and earlier arithmetic.</p>
        </section>

        <section className="cost-section package-section" id="packages">
          <header className="cost-section-heading"><span>02</span><div><p>Package allocation</p><h2>Structure, roof and opening costs lead.</h2></div></header>
          <div className="package-layout">
            <div className="package-bars">
              {costPlan.packages.map((item, index) => {
                const value = includeContingency ? item.total : item.base
                return <button key={item.package} className={selectedPackage === item.package ? 'active' : ''} onClick={() => { setSelectedPackage(item.package); setSearch('') }}>
                  <span className="package-name">{item.package.replace(' NEW', '')}</span>
                  <span className="bar-track"><i style={{ width: `${value / maxPackage * 100}%`, background: palette[index % palette.length] }} /></span>
                  <strong>{formatMillions(value)}</strong>
                </button>
              })}
            </div>
            <aside className="package-focus">
              <span>Selected package</span><h3>{selectedSummary.package}</h3>
              <strong>{formatMillions(includeContingency ? selectedSummary.total : selectedSummary.base)}</strong>
              <dl><div><dt>Base</dt><dd>{formatLkr(selectedSummary.base)}</dd></div><div><dt>Contingency</dt><dd>{formatLkr(selectedSummary.contingency)}</dd></div><div><dt>Line items</dt><dd>{costPlan.items.filter((item) => item.package === selectedPackage).length}</dd></div></dl>
              <p>{selectedSummary.basis}</p><a href="#boq">Review line items <ChevronRight /></a>
            </aside>
          </div>
        </section>

        <section className="cost-section boq-section" id="boq">
          <header className="cost-section-heading"><span>03</span><div><p>Detailed BOQ</p><h2>Trace every allowance.</h2></div></header>
          <div className="boq-toolbar">
            <label>Package<select value={selectedPackage} onChange={(event) => { setSelectedPackage(event.target.value); setSearch('') }}>{costPlan.packages.map((item) => <option key={item.package}>{item.package}</option>)}</select></label>
            <label className="boq-search"><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this package" /></label>
            <div><span>{packageItems.length} items</span><strong>{formatLkr(packageItems.reduce((sum, item) => sum + item.total, 0))}</strong></div>
          </div>
          <div className="cost-table-wrap"><table className="cost-table"><thead><tr><th>Work item</th><th>Quantity</th><th>Rate</th><th>Total</th><th>Source / confidence</th><th>Qualification</th></tr></thead><tbody>{packageItems.map((item) => <tr key={`${item.package}-${item.item}`}><td><strong>{item.item}</strong><small>{item.status}</small></td><td>{item.quantity} {item.unit}</td><td>{formatLkr(item.rate)}</td><td>{formatLkr(item.total)}</td><td><span className={`confidence ${item.source.toLowerCase().includes('historical') || item.source === 'BOQ' ? 'historical' : ''}`}>{item.source}</span></td><td>{item.qualification}</td></tr>)}</tbody></table></div>
          {!packageItems.length && <p className="empty-cost-state">No line items match this search.</p>}
        </section>

        <section className="cost-section risk-section" id="risks">
          <header className="cost-section-heading"><span>04</span><div><p>Scope & risk register</p><h2>The number is not the certainty.</h2></div></header>
          <div className="risk-toolbar">{riskStatuses.map((status) => <button key={status} className={riskFilter === status ? 'active' : ''} onClick={() => setRiskFilter(status)}>{status}</button>)}</div>
          <div className="risk-list">{visibleRisks.map((risk, index) => <article key={risk.topic}><span>{String(index + 1).padStart(2, '0')}</span><div><div><h3>{risk.topic}</h3><em>{risk.status}</em></div><p>{risk.action}</p></div></article>)}</div>
        </section>

        <section className="cost-section basis-section" id="basis">
          <header className="cost-section-heading"><span>05</span><div><p>Estimate basis</p><h2>Assumptions and evidence.</h2></div></header>
          <div className="basis-layout">
            <div><h3>Model assumptions</h3><div className="assumption-list">{costPlan.assumptions.map((item) => <div key={item.label}><span>{item.label}</span><strong>{typeof item.value === 'number' && item.unit === 'fraction' ? `${item.value * 100}%` : `${item.value}${item.unit ? ` ${item.unit}` : ''}`}</strong><small>{item.basis}</small></div>)}</div></div>
            <div><h3>Sources and reliability</h3><div className="source-list">{costPlan.sources.map((item) => <article key={item.source}><span>{item.source}</span><strong>{item.use}</strong><p>{item.reliability}</p></article>)}</div></div>
          </div>
        </section>

        <section className="cost-download">
          <div><FileSpreadsheet /><div><span>Source workbook</span><h2>Ahangama Guesthouse Complete Cost Plan V13</h2><p>Five worksheets · 140 line items · cached totals verified against this page.</p></div></div>
          <a href={workbookUrl} download="Ahangama_Guesthouse_Complete_Cost_Plan_V13.xlsx"><Download /> Download XLSX</a>
        </section>

        <section className="cost-disclaimer"><ShieldAlert /><p><strong>Planning estimate only.</strong> This page reproduces workbook V13. It does not validate quantities, current market rates, taxes, financing, land cost, consultant design or tender suitability.</p></section>
      </main>
    </div>
  )
}
