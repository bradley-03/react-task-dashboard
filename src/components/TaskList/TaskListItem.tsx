import { Task } from "../../../types/Task"
import { FaRegEdit } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"
import Button from "../Button/Button"
import Table from "../Table/Table"

type TaskItemProps = {
  itemData: Task
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export default function TaskItem({ itemData, onEdit, onDelete }: TaskItemProps) {
  return (
    <Table.tr>
      <Table.td>{itemData.title}</Table.td>
      <Table.td>{itemData.priority}</Table.td>
      <Table.td>{itemData.due?.toLocaleString() || "N/A"}</Table.td>
      <Table.td>{itemData.status}</Table.td>
      <Table.td>
        <Button onClick={() => onEdit(itemData.id)} variant="ghost" size="icon">
          <FaRegEdit />
        </Button>

        <Button onClick={() => onDelete(itemData.id)} variant="ghost" size="icon">
          <MdOutlineDelete />
        </Button>
      </Table.td>
    </Table.tr>
  )
}
