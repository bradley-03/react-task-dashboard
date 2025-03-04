import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import KanbanContainer from "./KanbanContainer/KanbanContainer"
import { TaskContext } from "../../../context/TaskContext"
import { useContext, useState } from "react"
import { Task } from "../../../types/Task"
import KanbanItem from "./KanbanItem/KanbanItem"

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

  function findContainer(id: string) {
    if (id in tasks) {
      return id
    }

    const container = Object.keys(tasks).find(key => tasks[key].find(item => item.id === id))

    return container
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    const activeContainer = findContainer(active.id as string)
    const overContainer = findContainer(over?.id as string)

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    const activeItems = tasks[activeContainer]
    const overItems = tasks[overContainer]

    const activeIndex = activeItems.findIndex(item => item.id === active.id)
    let overIndex = overItems.findIndex(item => item.id !== over?.id)

    // hacky fix for status error if task is dragged in empty container
    if (overIndex === -1) {
      overIndex = 0
    }

    moveTaskToStatus(activeContainer, overContainer, activeIndex, overIndex)
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
        <DragOverlay>{activeTask ? <KanbanItem item={activeTask} /> : undefined}</DragOverlay>
      </DndContext>
    </div>
  )
}
