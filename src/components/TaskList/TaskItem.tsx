import { Task } from "../../../types/Task"

type TaskItemProps = {
  itemData: Task
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export default function TaskItem({ itemData, onEdit, onDelete }: TaskItemProps) {
  const priorityClass =
    itemData.priority === "low"
      ? "bg-slate-500 text-white"
      : itemData.priority === "medium"
      ? "bg-sky-500 text-white"
      : itemData.priority === "high"
      ? "bg-red-500 text-white"
      : undefined

  return (
    <div className="border-1 m-2 flex flex-col justify-center items-center gap-1 p-2">
      <p>Due: {itemData.due?.toLocaleString()}</p>
      <p>status: {itemData.status}</p>
      <p>{itemData.createdAt.toLocaleString()}</p>
      <h2>{itemData.title}</h2>
      <p>{itemData.description}</p>
      <h2 className={`rounded-full px-2 ${priorityClass}`}>{itemData.priority}</h2>
      <button onClick={() => onEdit(itemData.id)} className="bg-sky-500 text-white cursor-pointer rounded p-2">
        Edit
      </button>
      <button className="bg-red-500 text-white cursor-pointer rounded p-2" onClick={() => onDelete(itemData.id)}>
        Delete
      </button>
    </div>
  )
}
