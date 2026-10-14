import { AlertTriangle, ArrowDown, CheckCircle2 } from 'lucide-react'
import { structuralConcept } from '../data/structuralConcept'

function FoundationGrid() {
  const columns = Array.from({ length: 10 }, (_, index) => ({
    x: 85 + (index % 5) * 125,
    y: index < 5 ? 82 : 242,
  }))

  return (
    <svg className="foundation-grid" viewBox="0 0 670 330" aria-label="Conceptual foundation grid showing ten pad footings in two rows">
      <title>Conceptual ten-column foundation grid, not to scale</title>
      <path className="grid-building" d="M55 48H615V278H55Z" />
      <path className="grid-beams" d="M85 82H585M85 242H585M85 82V242M210 82V242M335 82V242M460 82V242M585 82V242" />
      {columns.map(({ x, y }, index) => (
        <g key={index}>
          <rect className="grid-footing" x={x - 18} y={y - 18} width="36" height="36" />
          <circle className="grid-column" cx={x} cy={y} r="7" />
        </g>
      ))}
      <path className="dimension" d="M55 300H615M55 293V307M615 293V307" />
      <text className="dimension-label" x="319" y="320">16 m working assumption</text>
      <path className="dimension" d="M635 48V278M628 48H642M628 278H642" />
      <text className="dimension-label vertical" x="653" y="180">7 m</text>
      <g className="grid-legend">
        <circle className="grid-column" cx="75" cy="22" r="7" /><text x="88" y="26">RC column</text>
        <rect className="grid-footing" x="174" y="12" width="20" height="20" /><text x="203" y="26">Pad footing</text>
        <path className="grid-beams" d="M309 22h34" /><text x="352" y="26">Tie beam</text>
      </g>
    </svg>
  )
}

export function StructuralConcept() {
  return (
    <section id="structure" className="content-section structure-section">
      <header className="structure-header">
        <div>
          <p className="eyebrow">Proposed foundation & reinforced concrete structure</p>
          <h2>A practical frame to test.</h2>
        </div>
        <div className="structure-meta"><span>Ahangama Guesthouse</span><strong>{structuralConcept.version}</strong><span>{structuralConcept.date}</span></div>
      </header>

      <div className="structural-warning">
        <AlertTriangle aria-hidden="true" />
        <p><strong>Preliminary sizing and quantity exercise only.</strong> This is not a construction-ready structural design. A Sri Lankan structural engineer must verify all foundation dimensions, reinforcement and concrete strength using soil investigation results and the final architectural layout.</p>
      </div>

      <div className="structure-intro">
        <p className="structure-lead">Start by testing an RC column-and-beam frame, isolated pad footings joined by RC tie beams, an RC first-floor slab and a lightweight pitched roof.</p>
        <ul>
          <li><strong>Ground floor</strong>Four guest rooms at approximately 26 m² each, including bathroom</li>
          <li><strong>First floor</strong>Open coworking lounge for 6–8 people, shared kitchen and terrace</li>
          <li><strong>Roof</strong>Lightweight timber or corrosion-protected steel framing</li>
          <li><strong>Stair</strong>External, independently supported or integrated into the main frame</li>
        </ul>
      </div>

      <article className="structure-chapter">
        <div className="chapter-heading"><span>01</span><div><h3>Proposed structural arrangement</h3><p>Working geometry and a regular grid for consultant testing.</p></div></div>
        <div className="geometry-strip">{structuralConcept.geometry.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
        <div className="grid-layout">
          <div><FoundationGrid /><p className="figure-caption">Conceptual foundation grid, plan view · not to scale</p></div>
          <div className="grid-notes">
            <p><strong>Baseline:</strong> 10 concrete columns arranged as two longitudinal rows of five.</p>
            <div className="load-path"><span>Roof</span><ArrowDown /><span>Beams + columns</span><ArrowDown /><span>Pad foundations</span><ArrowDown /><span>Soil</span></div>
            <p>The 7 m transverse span is a significant structural consideration. Room partitions must not be assumed to carry upper-floor loads.</p>
          </div>
        </div>
      </article>

      <article className="structure-chapter">
        <div className="chapter-heading"><span>02</span><div><h3>Foundation and concrete components</h3><p>Concept placeholders to establish the questions, not dimensions to build from.</p></div></div>
        <div className="table-wrap structural-table"><table><thead><tr><th>Component</th><th>Preliminary concept size</th><th>Purpose</th></tr></thead><tbody>{structuralConcept.components.map(([component, size, purpose]) => <tr key={component}><td><strong>{component}</strong></td><td>{size}</td><td>{purpose}</td></tr>)}</tbody></table></div>
        <p className="technical-note">The 7 m span, soil bearing capacity, wind loads, lateral stability, terrace loads and exposure conditions can change these sizes substantially. Coastal durability requires particular attention to reinforcement cover, concrete specification, drainage and chloride-related corrosion.</p>
      </article>

      <article className="structure-chapter">
        <div className="chapter-heading"><span>03</span><div><h3>Preliminary material allowances</h3><p>Broad ranges for initial cost planning using the 16 × 7 m footprint and 10-column scheme.</p></div></div>
        <div className="quantity-summary"><div><span>Structural concrete + ground slab</span><strong>50–71 <small>m³</small></strong></div><div><span>Reinforcement steel</span><strong>4.3–8.2 <small>t</small></strong></div></div>
        <div className="table-wrap structural-table"><table><thead><tr><th>Structural element</th><th>Concrete (m³)</th><th>Rebar (tonnes)</th></tr></thead><tbody>{structuralConcept.quantities.map(([element, concrete, rebar]) => <tr key={element}><td>{element}</td><td>{concrete}</td><td>{rebar}</td></tr>)}</tbody><tfoot><tr><td>Total preliminary allowance</td><td>49.5–71</td><td>4.3–8.2</td></tr></tfoot></table></div>
        <p className="technical-note">Budgeting ranges only, not a calculated reinforcement schedule. Excludes roof structure, substantial retaining works, unusual foundations and any additional support grid.</p>
      </article>

      <article className="structure-chapter split-chapter">
        <div>
          <div className="chapter-heading"><span>04</span><div><h3>Likely reinforcement diameters</h3><p>A future bar bending schedule may use several bar sizes.</p></div></div>
          <div className="bar-list">{structuralConcept.reinforcement.map(([diameter, use]) => <div key={diameter}><strong>{diameter}</strong><span>{use}</span></div>)}</div>
          <p className="technical-note">Bar numbers, spacing, anchorage, laps and cover require engineering design. Wind uplift and lateral stability must also be incorporated.</p>
        </div>
        <div>
          <div className="chapter-heading"><span>05</span><div><h3>Cost-reduction study</h3><p>Compare shorter spans with fewer obstructions.</p></div></div>
          <div className="structure-options">{structuralConcept.options.map((option) => <div key={option.name}><span>{option.name} · {option.status}</span><h4>{option.title}</h4><p>{option.detail}</p></div>)}</div>
          <p className="preferred-note"><CheckCircle2 /> Investigate Option B first if middle columns can align with bathroom or room partition walls. It is not yet proven cheaper.</p>
          <p className="technical-note">For the roof, test lightweight timber or corrosion-protected steel trusses instead of another concrete slab, subject to rain protection and engineering review.</p>
        </div>
      </article>

      <article className="structure-chapter boq-chapter">
        <div className="chapter-heading"><span>06</span><div><h3>Historical BOQ comparison</h3><p>A documented reference from a much larger multistorey scheme, not a quantity basis for this guesthouse.</p></div></div>
        <div className="boq-layout">
          <div className="table-wrap structural-table"><table><thead><tr><th>BOQ item</th><th>Quantity</th></tr></thead><tbody>{structuralConcept.boq.map(([item, quantity]) => <tr key={item}><td>{item}</td><td>{quantity}</td></tr>)}</tbody></table></div>
          <div className="boq-note"><strong>Do not transfer these quantities directly.</strong><p>The referenced development includes a lift, several suspended floors and a rooftop pool.</p><p>Documented rates: LKR 32,000/m³ for Grade 25 concrete and LKR 520/kg for reinforcement. These are not verified October 2026 market quotations; formwork is measured separately.</p><small>Source stated in the supplied brief: “Ahangama – Option 2.pdf”, pages 5 and 8.</small></div>
        </div>
      </article>

      <article className="structure-chapter information-chapter">
        <div className="chapter-heading"><span>07</span><div><h3>Information needed before fixing foundations</h3><p>Resolve site conditions and load assumptions before structural sizes are adopted.</p></div></div>
        <ul className="information-list">{structuralConcept.requiredInformation.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul>
        <div className="decision-question"><span>Critical structural question</span><p>Should the coworking level use a full RC slab across the 16 × 7 m working footprint, or should the team assess a lighter steel or timber floor?</p><small>This decision materially affects beam sizes, foundation loads, steel quantities and overall cost.</small></div>
      </article>
    </section>
  )
}