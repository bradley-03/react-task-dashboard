import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Task } from "../../../../types/Task"
import KanbanItem from "../KanbanItem/KanbanItem"
import { useDroppable } from "@dnd-kit/core"
import SortableItem from "../SortableItem/SortableItem"

type KanbanContainerProps = {
  id: string
  items: Task[]
}

export default function KanbanContainer({ id, items }: KanbanContainerProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  })

  return (
    <div className="w-64">
      <h1>{id}</h1>
      <div ref={setNodeRef} className="flex flex-col gap-2 px-3.5 py-2.5 rounded shadow bg-gray-50">
        <SortableContext
          key={items.map(i => i.id).join(",")}
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(item => (
            <SortableItem key={item.id} id={item.id}>
              <KanbanItem item={item} />
            </SortableItem>
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
