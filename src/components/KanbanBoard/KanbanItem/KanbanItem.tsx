import { Task } from "../../../../types/Task"

type KanbanItemProps = {
  item: Task
}

export default function KanbanItem({ item }: KanbanItemProps) {
  return (
    <div className="select-none cursor-grab">
      <h1>{item.title}</h1>
    </div>
  )
}
