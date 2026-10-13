import { useEffect, useState } from 'react'
import { type ProjectData } from '../data/project'
import { projectRepository, validateProject } from '../data/projectStore'

const timestamp = () => new Date().toISOString()

export function useProject() {
  const [project, setProject] = useState<ProjectData>(() => projectRepository.load())
  const [message, setMessage] = useState('Changes save automatically in this browser.')

  useEffect(() => {
    projectRepository.save(project)
  }, [project])

  const update = (recipe: (current: ProjectData) => ProjectData) => {
    setProject((current) => {
      const next = recipe(current)
      return { ...next, metadata: { ...next.metadata, lastUpdated: timestamp() } }
    })
    setMessage('Saved locally')
  }

  const recordSnapshot = () => update((current) => ({
    ...current,
    revisions: [{
      id: `rev-${Date.now()}`,
      at: timestamp(),
      summary: 'Project snapshot recorded from the concept workspace.',
      kind: 'automatic',
    }, ...current.revisions],
  }))

  const exportProject = () => {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'ahangama-guesthouse-project.json'
    link.click()
    URL.revokeObjectURL(link.href)
    setMessage('Project JSON exported')
  }

  const importProject = async (file: File) => {
    try {
      const candidate: unknown = JSON.parse(await file.text())
      if (!validateProject(candidate)) throw new Error('Invalid project file')
      setProject(candidate)
      setMessage('Project JSON imported and saved locally')
    } catch {
      setMessage('Import failed: use a valid schema version 1 project file')
    }
  }

  const reset = () => {
    if (!window.confirm('Reset all locally saved changes to the initial concept data?')) return
    setProject(projectRepository.reset())
    setMessage('Initial concept data restored')
  }

  return { project, update, message, recordSnapshot, exportProject, importProject, reset }
}