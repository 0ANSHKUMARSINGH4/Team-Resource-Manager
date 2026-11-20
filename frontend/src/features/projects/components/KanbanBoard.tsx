import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Project } from '../types'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'

interface KanbanBoardProps {
  projects: Project[]
  onStatusChange: (projectId: number, newStatus: string) => void
  onDeleteProject: (projectId: number) => void
  onAddNewToColumn: (status: string) => void
}

const COLUMNS = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Completed' },
]

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  onStatusChange,
  onDeleteProject,
  onAddNewToColumn,
}) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getProjectsByStatus = (columnId: string) => {
    return projects.filter((p) => {
      const s = p.status
      if (columnId === 'TODO') return s === 'TODO' || s === 'To Do'
      if (columnId === 'IN_PROGRESS') return s === 'IN_PROGRESS' || s === 'In Progress'
      if (columnId === 'DONE') return s === 'DONE' || s === 'Done'
      return false
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const found = projects.find((p) => p.id === active.id)
    if (found) {
      setActiveProject(found)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveProject(null)

    if (!over) return

    const activeId = active.id as number
    const overId = over.id

    // Check if dropped directly on a column container
    if (overId === 'TODO' || overId === 'IN_PROGRESS' || overId === 'DONE') {
      const activeProj = projects.find((p) => p.id === activeId)
      if (activeProj && activeProj.status !== overId) {
        onStatusChange(activeId, overId as string)
      }
      return
    }

    // Check if dropped onto another card in a column
    const overProj = projects.find((p) => p.id === overId)
    if (overProj) {
      let targetStatus = overProj.status
      if (targetStatus === 'To Do') targetStatus = 'TODO'
      if (targetStatus === 'In Progress') targetStatus = 'IN_PROGRESS'
      if (targetStatus === 'Done') targetStatus = 'DONE'

      const activeProj = projects.find((p) => p.id === activeId)
      if (activeProj && activeProj.status !== targetStatus) {
        onStatusChange(activeId, targetStatus)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-6">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            projects={getProjectsByStatus(col.id)}
            onAddNew={onAddNewToColumn}
            onDeleteProject={onDeleteProject}
            onMoveStatus={onStatusChange}
          />
        ))}
      </div>

      <DragOverlay>
        {activeProject ? (
          <KanbanCard project={activeProject} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
