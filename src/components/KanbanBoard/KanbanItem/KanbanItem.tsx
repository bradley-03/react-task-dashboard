import { Task } from "../../../../types/Task"

type KanbanItemProps = {
  item: Task
}

export default function KanbanItem({ item }: KanbanItemProps) {
  const priorityClass =
    item.priority === "low"
      ? "bg-slate-500 text-white"
      : item.priority === "medium"
      ? "bg-sky-500 text-white"
      : item.priority === "high"
      ? "bg-red-500 text-white"
      : undefined

  return (
    <div className="dark:bg-neutral-600 dark:text-white text-black select-none cursor-grab touch-none shadow bg-white p-3 rounded-2xl">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{item.due && item.due.toLocaleString()}</p>
      <h2 className={`rounded-full px-2 ${priorityClass}`}>{item.priority} priority</h2>
    </div>
  )
}
