import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import KanbanContainer from "./KanbanContainer/KanbanContainer"
import { TaskContext } from "../../../context/TaskContext"
import { useContext, useState } from "react"
import { Task } from "../../../types/Task"

export default function KanbanBoard() {
  const { tasks, reorderTask, moveTaskToStatus, findTaskById } = useContext(TaskContext)
  const [activeTask, setActiveTask] = useState<Task>()

  function handleDragEnd(event: DragEndEvent) {
    if (!event.active.data.current) return
    if (!event.over?.data.current) return

    const currentContainer = event.active.data.current.sortable.containerId
    const overContainer = event.active.data.current.sortable.containerId

    const currentIndex = event.active.data.current.sortable.index
    const toIndex = event.over.data.current.sortable.index

    if (currentContainer !== overContainer) {
      moveTaskToStatus(currentContainer, overContainer, currentContainer, toIndex)
    } else {
      const taskId = event.active.id.toString()

      reorderTask(taskId, currentIndex, toIndex)
    }
  }

  function handleDragOver(event: DragOverEvent) {
    if (!event.active.data.current) return
    if (!event.over?.data.current) return

    const activeContainer = event.active.data.current.sortable.containerId
    const overContainer = event.over.data.current.sortable.containerId

    const currentIndex = event.active.data.current.sortable.index
    const toIndex = event.over.data.current.sortable.index

    if (activeContainer !== overContainer) {
      moveTaskToStatus(activeContainer, overContainer, currentIndex, toIndex)
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const foundTask = findTaskById(event.active.id.toString())

    setActiveTask(foundTask)
  }

  return (
    <div>
      <h1>Kanban Board</h1>
      <DndContext id="kanban" onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
        {Object.keys(tasks).map(key => (
          <KanbanContainer key={key} id={key} items={tasks[key] || []} />
        ))}
        <DragOverlay>
          {activeTask ? (
            <div className="touch-none">
              <h1>{activeTask.title}</h1>
            </div>
          ) : undefined}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
