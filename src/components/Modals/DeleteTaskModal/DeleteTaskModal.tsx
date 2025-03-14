import Modal from "../../Modal/Modal"
import { Task } from "../../../../types/Task"
import Button from "../../Button/Button"

type DeleteTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => void
  task: Task
}

export default function DeleteTaskModal({ isOpen, onClose, onDelete, task }: DeleteTaskModalProps) {
  return (
    <Modal title="Edit Task" isOpen={isOpen} onClose={onClose}>
      <p>
        Are you sure you want to delete the task <span className="font-bold">{task.title}?</span>
      </p>
      <Button variant="danger" onClick={() => task && onDelete(task.id)}>
        Delete
      </Button>
    </Modal>
  )
}
