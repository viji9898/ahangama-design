import { describe, expect, it } from 'vitest'
import costPlan from './costPlan.json'

describe('cost plan snapshot', () => {
  it('reconciles line items and packages to the workbook totals', () => {
    const itemBase = costPlan.items.reduce((sum, item) => sum + item.total, 0)
    const packageBase = costPlan.packages.reduce((sum, item) => sum + item.base, 0)
    const contingency = costPlan.packages.reduce((sum, item) => sum + item.contingency, 0)

    expect(itemBase).toBeCloseTo(costPlan.totals.base, 2)
    expect(packageBase).toBeCloseTo(costPlan.totals.base, 2)
    expect(contingency).toBeCloseTo(costPlan.totals.contingency, 2)
    expect(packageBase + contingency).toBeCloseTo(costPlan.totals.total, 2)
  })

  it('retains the enclosure upgrade as unpriced scope', () => {
    const enclosure = costPlan.packages.find((item) => item.package.includes('Enclosure upgrade'))
    const enclosureItem = costPlan.items.find((item) => item.package.includes('Enclosure upgrade'))

    expect(enclosure).toBeDefined()
    expect(enclosure?.total).toBe(0)
    expect(enclosureItem?.source).toBe('UNPRICED')
  })
})