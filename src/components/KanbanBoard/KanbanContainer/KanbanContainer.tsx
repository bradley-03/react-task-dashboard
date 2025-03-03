import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Task } from "../../../../types/Task"
import KanbanItem from "../KanbanItem/KanbanItem"
import { useDroppable } from "@dnd-kit/core"

type KanbanContainerProps = {
  id: string
  items: Task[]
}

export default function KanbanContainer({ id, items }: KanbanContainerProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  })
  const droppableStyle = {
    padding: "20px 10px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 110,
  }

  return (
    <div>
      <h1>{id}</h1>
      <div ref={setNodeRef} style={droppableStyle}>
        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <KanbanItem key={item.id} id={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
