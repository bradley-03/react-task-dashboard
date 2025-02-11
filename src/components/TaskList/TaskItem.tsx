import { useContext } from "react"
import { Task } from "../../../types/Task"
import { TaskContext } from "../../../context/TaskContext"

type TaskItemProps = {
  itemData: Task
}

export default function TaskItem({ itemData }: TaskItemProps) {
  const { toggleTaskComplete } = useContext(TaskContext)

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
      <p className="cursor-pointer" onClick={() => toggleTaskComplete(itemData.id)}>
        completed: {itemData.completed.toString()}
      </p>
      <p>{itemData.createdAt.toLocaleString()}</p>
      <h2>{itemData.title}</h2>
      <p>{itemData.description}</p>
      <h2 className={`rounded-full px-2 ${priorityClass}`}>{itemData.priority}</h2>
    </div>
  )
}
