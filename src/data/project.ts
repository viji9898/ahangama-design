export type Status = 'confirmed' | 'provisional' | 'open' | 'recorded'
export type AreaClass = 'enclosed' | 'covered-open' | 'uncovered'
export type Floor = 'Ground' | 'First'

export interface Space {
  id: string
  name: string
  floor: Floor
  category: string
  quantity: number
  unitArea: number
  areaClass: AreaClass
  notes: string
  status: Status
  includes?: string[]
}

export interface SiteField {
  id: string
  label: string
  value: string
  status: Status
}

export interface CoordinationRecord {
  id: string
  discipline: string
  prompt: string
  responsibility: string
  dependency: string
  impact: string
  notes: string
  status: 'Open' | 'In review' | 'Resolved'
  targetDate: string
}

export interface RegisterRecord {
  id: string
  type: 'Confirmed information' | 'Provisional assumption' | 'Open question' | 'Recorded decision'
  title: string
  description: string
  discipline: string
  priority: 'Critical' | 'High' | 'Normal'
  status: Status
  source: string
  responsible: string
  createdAt: string
  updatedAt: string
  targetDate: string
  related: string
  impact: string
}

export interface Revision {
  id: string
  at: string
  summary: string
  kind: 'automatic' | 'manual'
}

export interface ProjectData {
  schemaVersion: 1
  metadata: {
    name: string
    location: string
    stage: string
    status: Status
    lastUpdated: string
  }
  site: SiteField[]
  spaces: Space[]
  coordination: CoordinationRecord[]
  register: RegisterRecord[]
  revisions: Revision[]
}

const today = '2026-10-13'

export const initialProject: ProjectData = {
  schemaVersion: 1,
  metadata: {
    name: 'Ahangama Guesthouse',
    location: 'Ahangama, Sri Lanka',
    stage: 'Stage 1 — Concept',
    status: 'provisional',
    lastUpdated: today,
  },
  site: [
    { id: 'plot-length', label: 'Plot length (m)', value: '', status: 'open' },
    { id: 'plot-width', label: 'Plot width (m)', value: '', status: 'open' },
    { id: 'boundary', label: 'Boundary information', value: '', status: 'open' },
    { id: 'north', label: 'North orientation', value: '', status: 'open' },
    { id: 'access', label: 'Road access and entry', value: '', status: 'open' },
    { id: 'setbacks', label: 'Required setbacks', value: '', status: 'open' },
    { id: 'levels', label: 'Ground levels and drainage', value: '', status: 'open' },
    { id: 'adjacent', label: 'Adjacent conditions', value: '', status: 'open' },
    { id: 'planning', label: 'Planning restrictions', value: '', status: 'open' },
    { id: 'utilities', label: 'Available utilities', value: '', status: 'open' },
    { id: 'soil', label: 'Soil and foundations', value: '', status: 'open' },
  ],
  spaces: [
    ...['Room 01', 'Room 02', 'Room 03', 'Room 04'].map((name, index): Space => ({
      id: `g-${index + 1}`,
      name,
      floor: 'Ground',
      category: 'Guest accommodation',
      quantity: 1,
      unitArea: 26,
      areaClass: 'enclosed',
      notes: 'Initial allowance includes the private en-suite; bathroom is not counted separately.',
      status: 'provisional',
      includes: ['King bedroom', 'En-suite bathroom'],
    })),
    { id: 'g-circulation', name: 'Covered access gallery', floor: 'Ground', category: 'Circulation', quantity: 1, unitArea: 22, areaClass: 'covered-open', notes: 'Provisional shared circulation allowance.', status: 'provisional' },
    { id: 'g-service', name: 'Service / riser allowance', floor: 'Ground', category: 'Services', quantity: 1, unitArea: 6, areaClass: 'enclosed', notes: 'Location and requirements to be coordinated.', status: 'provisional' },
    { id: 'f-lounge', name: 'Coworking lounge', floor: 'First', category: 'Communal', quantity: 1, unitArea: 48, areaClass: 'covered-open', notes: 'Flexible seating for approximately 6–8 people.', status: 'provisional' },
    { id: 'f-kitchen', name: 'Shared kitchen', floor: 'First', category: 'Service', quantity: 1, unitArea: 14, areaClass: 'enclosed', notes: 'Compact shared kitchen; equipment brief outstanding.', status: 'provisional' },
    { id: 'f-terrace', name: 'Open terrace', floor: 'First', category: 'Communal', quantity: 1, unitArea: 30, areaClass: 'uncovered', notes: 'Uncovered area; weather exposure and drainage require review.', status: 'provisional' },
    { id: 'f-stair', name: 'Stair and arrival', floor: 'First', category: 'Circulation', quantity: 1, unitArea: 12, areaClass: 'covered-open', notes: 'External stair concept; safety and weather protection unresolved.', status: 'provisional' },
  ],
  coordination: [
    { id: 'coord-arch', discipline: 'Architecture', prompt: 'Refine the repeatable room module while protecting privacy, ventilation and a compact footprint.', responsibility: 'Architect', dependency: 'Survey, orientation and operator brief', impact: 'Planning efficiency, guest comfort and approvals', notes: '', status: 'Open', targetDate: '' },
    { id: 'coord-struct', discipline: 'Structural engineering', prompt: 'What is the simplest economical grid for enclosed rooms below and an open communal level above?', responsibility: 'Structural engineer', dependency: 'Architectural layout and soil information', impact: 'Columns, foundations, room planning and cost', notes: '', status: 'Open', targetDate: '' },
    { id: 'coord-interior', discipline: 'Interior design', prompt: 'Define a durable, low-maintenance room kit using locally serviceable fittings.', responsibility: 'Interior designer', dependency: 'Room module and operating model', impact: 'Guest experience, procurement and replacement cost', notes: '', status: 'Open', targetDate: '' },
    { id: 'coord-mep', discipline: 'MEP', prompt: 'Test wet-area alignment, drainage, hot water, electrical demand and maintenance access.', responsibility: 'MEP engineer', dependency: 'Site utilities and bathroom layout', impact: 'Service routes, plant allowances and operating cost', notes: '', status: 'Open', targetDate: '' },
    { id: 'coord-qs', discipline: 'Quantity surveying', prompt: 'Identify major cost drivers and information needed for an initial elemental estimate.', responsibility: 'Quantity surveyor', dependency: 'Area schedule and outline construction strategy', impact: 'Affordability, scope choices and feasibility', notes: '', status: 'Open', targetDate: '' },
  ],
  register: [
    { id: 'A-001', type: 'Provisional assumption', title: 'Room area allowance', description: 'Each guest room is allowed 26 m² including its en-suite.', discipline: 'Architecture', priority: 'High', status: 'provisional', source: 'Owner concept brief', responsible: 'Architect', createdAt: today, updatedAt: today, targetDate: '', related: 'g-1, g-2, g-3, g-4', impact: 'Total enclosed area and cost' },
    { id: 'Q-001', type: 'Open question', title: 'Survey and plot constraints', description: 'Obtain a measured survey, access information, levels and verified boundaries.', discipline: 'Architecture', priority: 'Critical', status: 'open', source: 'Information gap', responsible: 'Owner / surveyor', createdAt: today, updatedAt: today, targetDate: '', related: 'Site', impact: 'Building position, orientation and approvals' },
    { id: 'C-001', type: 'Confirmed information', title: 'Accommodation brief', description: 'Four private rooms for two guests each, with one king bed and private en-suite.', discipline: 'Architecture', priority: 'High', status: 'confirmed', source: 'Owner brief', responsible: 'Owner', createdAt: today, updatedAt: today, targetDate: '', related: 'Ground floor', impact: 'Core accommodation schedule' },
  ],
  revisions: [
    { id: 'rev-initial', at: `${today}T09:00:00.000Z`, summary: 'Initial concept brief established.', kind: 'manual' },
  ],
}