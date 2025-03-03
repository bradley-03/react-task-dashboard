import { Task } from "../../../../types/Task"
import SortableItem from "../SortableItem/SortableItem"

type KanbanItemProps = {
  id: string
  item: Task
}

export default function KanbanItem({ id, item }: KanbanItemProps) {
  return (
    <SortableItem id={id}>
      <div className="select-none cursor-grab">
        <h1>{item.title}</h1>
      </div>
    </SortableItem>
  )
}
