import { DndContext, DragEndEvent } from "@dnd-kit/core"
import KanbanContainer from "./KanbanContainer/KanbanContainer"
import { TaskContext } from "../../../context/TaskContext"
import { useContext } from "react"

export default function KanbanBoard() {
  const { tasks, reorderTask } = useContext(TaskContext)

  function handleDragEnd(event: DragEndEvent) {
    if (!event.active.data.current) return
    if (!event.over?.data.current) return

    const taskId = event.active.id.toString()

    const currentIndex = event.active.data.current.sortable.index
    const toIndex = event.over.data.current.sortable.index

    reorderTask(taskId, currentIndex, toIndex)
  }

  return (
    <div>
      <h1>Kanban Board</h1>
      <DndContext id="kanban" onDragEnd={handleDragEnd}>
        {Object.keys(tasks).map(key => (
          <KanbanContainer key={key} id={key} items={tasks[key] || []} />
        ))}
      </DndContext>
    </div>
  )
}
