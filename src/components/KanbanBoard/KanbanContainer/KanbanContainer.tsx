import { SortableContext } from "@dnd-kit/sortable"
import { Task } from "../../../../types/Task"
import KanbanItem from "../KanbanItem/KanbanItem"

type KanbanContainerProps = {
  id: string
  items: Task[]
}

export default function KanbanContainer({ id, items }: KanbanContainerProps) {
  return (
    <div>
      <h1>{id}</h1>
      <SortableContext id={id} items={items}>
        {items.map(item => (
          <KanbanItem key={item.id} id={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  )
}
