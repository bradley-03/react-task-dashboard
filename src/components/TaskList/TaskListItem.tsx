import { Task } from "../../../types/Task"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"
import Button from "../Button/Button"

type TaskItemProps = {
  itemData: Task
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export default function TaskItem({ itemData, onEdit, onDelete }: TaskItemProps) {
  const priorityClass =
    itemData.priority === "low"
      ? "text-slate-500"
      : itemData.priority === "medium"
      ? "text-sky-500"
      : itemData.priority === "high"
      ? "text-red-500"
      : undefined

  return (
    <tr className="border-1 p-2 border-collapse">
      <td className="border-1 border-collapse">{itemData.title}</td>
      <td className="border-1 border-black">{itemData.description}</td>
      <td className={`border-1 border-black border-collapse ${priorityClass}`}>{itemData.priority}</td>
      <td className={`border-black-1 bborder-collapse ${!itemData.due && "text-gray-400"}`}>
        {itemData.due?.toLocaleString() || "N/A"}
      </td>
      <td className="border-1 border-collapse">{itemData.status}</td>
      <td>
        <Button onClick={() => onEdit(itemData.id)} variant="ghost" size="icon">
          <FaRegEdit />
        </Button>

        <Button onClick={() => onDelete(itemData.id)} variant="ghost" size="icon">
          <MdOutlineDelete />
        </Button>
      </td>
    </tr>
  )
}
