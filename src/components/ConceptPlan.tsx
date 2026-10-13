import type { Floor, Space } from '../data/project'

interface ConceptPlanProps {
  floor: Floor
  spaces: Space[]
  selectedId: string | null
  onSelect: (id: string) => void
}

interface SelectableProps {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  width: number
  height: number
  selected: boolean
  className?: string
  onSelect: (id: string) => void
}

const Selectable = ({ id, label, sublabel, x, y, width, height, selected, className = '', onSelect }: SelectableProps) => (
  <g
    className={`plan-space ${className} ${selected ? 'is-selected' : ''}`}
    role="button"
    tabIndex={0}
    aria-label={`Select ${label}`}
    onClick={() => onSelect(id)}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') onSelect(id)
    }}
  >
    <rect x={x} y={y} width={width} height={height} />
    <text x={x + 10} y={y + 22}>{label}</text>
    {sublabel && <text className="plan-note" x={x + 10} y={y + 39}>{sublabel}</text>}
  </g>
)

export function ConceptPlan({ floor, spaces, selectedId, onSelect }: ConceptPlanProps) {
  const area = (id: string) => spaces.find((space) => space.id === id)?.unitArea ?? 0

  if (floor === 'Ground') {
    return (
      <svg className="plan" viewBox="0 0 760 340" aria-label="Ground-floor schematic plan">
        <title>Ground-floor concept plan with four guest rooms and en-suites</title>
        <path className="plan-outline" d="M40 45H680V267H40Z" />
        {[0, 1, 2, 3].map((index) => {
          const id = `g-${index + 1}`
          const x = 40 + index * 160
          return (
            <g key={id}>
              <Selectable id={id} label={`ROOM 0${index + 1}`} sublabel={`${area(id)} m² incl. en-suite`} x={x} y={45} width={160} height={180} selected={selectedId === id} onSelect={onSelect} />
              <rect className="bath" x={x + 100} y={45} width={60} height={70} />
              <text className="bath-label" x={x + 109} y={83}>EN-SUITE</text>
              <path className="bed" d={`M${x + 20} 125h66v66H${x + 20}z M${x + 20} 143h66 M${x + 31} 131h18v9H${x + 31}z M${x + 57} 131h18v9H${x + 57}z`} />
              <path className="door" d={`M${x + 65} 225v-19a19 19 0 0 1 19 19`} />
            </g>
          )
        })}
        <Selectable id="g-circulation" label="SHADED ACCESS GALLERY" sublabel={`${area('g-circulation')} m² provisional`} x={40} y={225} width={640} height={42} selected={selectedId === 'g-circulation'} className="circulation" onSelect={onSelect} />
        <Selectable id="g-service" label="SERVICE" sublabel={`${area('g-service')} m²`} x={680} y={175} width={55} height={92} selected={selectedId === 'g-service'} className="service" onSelect={onSelect} />
        <path className="stair" d="M680 45h55v130h-55 M687 58h41M687 73h41M687 88h41M687 103h41M687 118h41M687 133h41M687 148h41" />
        <text className="stair-label" x="692" y="164">UP</text>
        <path className="north" d="M24 95V55M24 55l-7 13M24 55l7 13" />
        <text className="north-label" x="18" y="48">N?</text>
      </svg>
    )
  }

  return (
    <svg className="plan" viewBox="0 0 760 340" aria-label="First-floor schematic plan">
      <title>First-floor concept plan with coworking lounge, kitchen, terrace and stair</title>
      <path className="roof-line" d="M22 30H738V292H22Z" />
      <path className="plan-outline" d="M55 65H680V260H55Z" />
      <Selectable id="f-lounge" label="COWORKING + LOUNGE" sublabel={`${area('f-lounge')} m² · 6–8 places`} x={55} y={65} width={380} height={195} selected={selectedId === 'f-lounge'} className="lounge" onSelect={onSelect} />
      <Selectable id="f-kitchen" label="SHARED KITCHEN" sublabel={`${area('f-kitchen')} m²`} x={435} y={65} width={150} height={105} selected={selectedId === 'f-kitchen'} className="kitchen" onSelect={onSelect} />
      <Selectable id="f-stair" label="STAIR ARRIVAL" sublabel={`${area('f-stair')} m²`} x={585} y={65} width={95} height={105} selected={selectedId === 'f-stair'} className="circulation" onSelect={onSelect} />
      <Selectable id="f-terrace" label="OPEN TERRACE" sublabel={`${area('f-terrace')} m² uncovered`} x={435} y={170} width={245} height={90} selected={selectedId === 'f-terrace'} className="terrace" onSelect={onSelect} />
      {[0, 1, 2, 3, 4, 5].map((index) => <circle key={index} className="seat" cx={120 + index * 48} cy={168 + (index % 2) * 38} r="12" />)}
      <rect className="table" x="95" y="148" width="270" height="75" rx="2" />
      <path className="counter" d="M455 88h108v55H455zM470 102h30v20h-30z" />
      <text className="roof-label" x="28" y="320">DASHED LINE: INDICATIVE ROOF COVERAGE / GENEROUS OVERHANG</text>
    </svg>
  )
}