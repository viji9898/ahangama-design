import { describe, expect, it } from 'vitest'
import { initialProject } from './project'
import { calculateAreaTotals, calculateRectangularSiteArea, validateProject } from './projectStore'

describe('project calculations', () => {
  it('updates enclosed totals without counting included en-suites separately', () => {
    const baseline = calculateAreaTotals(initialProject.spaces)
    const edited = initialProject.spaces.map((space) => (
      space.id === 'g-1' ? { ...space, unitArea: 30 } : space
    ))

    expect(baseline.byClass.enclosed).toBe(124)
    expect(calculateAreaTotals(edited).byClass.enclosed).toBe(128)
  })

  it('keeps site area unknown until both rectangular dimensions are valid', () => {
    expect(calculateRectangularSiteArea(initialProject.site)).toBeNull()
    const completed = initialProject.site.map((field) => {
      if (field.id === 'plot-length') return { ...field, value: '40' }
      if (field.id === 'plot-width') return { ...field, value: '20' }
      return field
    })
    expect(calculateRectangularSiteArea(completed)).toBe(800)
  })

  it('rejects unsupported or malformed imported data', () => {
    expect(validateProject(initialProject)).toBe(true)
    expect(validateProject({ ...initialProject, schemaVersion: 2 })).toBe(false)
    expect(validateProject({ ...initialProject, spaces: [{ id: 'bad', unitArea: -1 }] })).toBe(false)
  })
})