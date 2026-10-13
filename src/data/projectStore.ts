import { initialProject, type AreaClass, type ProjectData } from './project'

const STORAGE_KEY = 'ahangama-project-v1'

export const calculateAreaTotals = (spaces: ProjectData['spaces']) => {
  const byClass: Record<AreaClass, number> = {
    enclosed: 0,
    'covered-open': 0,
    uncovered: 0,
  }
  const byFloor = { Ground: 0, First: 0 }

  spaces.forEach((space) => {
    const total = space.quantity * space.unitArea
    byClass[space.areaClass] += total
    byFloor[space.floor] += total
  })

  return {
    byClass,
    byFloor,
    scheduled: Object.values(byClass).reduce((sum, value) => sum + value, 0),
  }
}

export const calculateRectangularSiteArea = (site: ProjectData['site']) => {
  const length = Number(site.find((field) => field.id === 'plot-length')?.value)
  const width = Number(site.find((field) => field.id === 'plot-width')?.value)
  return length > 0 && width > 0 ? length * width : null
}

export const validateProject = (value: unknown): value is ProjectData => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ProjectData>
  return candidate.schemaVersion === 1
    && typeof candidate.metadata?.name === 'string'
    && Array.isArray(candidate.site)
    && Array.isArray(candidate.spaces)
    && candidate.spaces.every((space) => (
      typeof space.id === 'string'
      && typeof space.unitArea === 'number'
      && space.unitArea >= 0
      && typeof space.quantity === 'number'
      && space.quantity >= 0
      && ['enclosed', 'covered-open', 'uncovered'].includes(space.areaClass)
    ))
    && Array.isArray(candidate.coordination)
    && Array.isArray(candidate.register)
    && Array.isArray(candidate.revisions)
}

export const projectRepository = {
  load(): ProjectData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return structuredClone(initialProject)
      const parsed: unknown = JSON.parse(stored)
      return validateProject(parsed) ? parsed : structuredClone(initialProject)
    } catch {
      return structuredClone(initialProject)
    }
  },
  save(project: ProjectData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY)
    return structuredClone(initialProject)
  },
}