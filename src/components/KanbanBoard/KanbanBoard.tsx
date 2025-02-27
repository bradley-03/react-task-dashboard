import { DndContext } from "@dnd-kit/core"
import KanbanContainer from "./KanbanContainer/KanbanContainer"
import { TaskContext } from "../../../context/TaskContext"
import { useContext } from "react"

export default function KanbanBoard() {
  const { tasks } = useContext(TaskContext)

  return (
    <div>
      <h1>Kanban Board</h1>
      <DndContext id="kanban">
        <KanbanContainer id={"pending"} items={tasks.pending} />
        <KanbanContainer id={"completed"} items={tasks.completed} />
      </DndContext>
    </div>
  )
}
