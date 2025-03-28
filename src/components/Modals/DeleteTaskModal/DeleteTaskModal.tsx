import Modal from "../../Modal/Modal"
import { Task } from "../../../../types/Task"
import Button from "../../Button/Button"
import Divider from "../../Divider/Divider"

type DeleteTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => void
  task: Task
}

export default function DeleteTaskModal({ isOpen, onClose, onDelete, task }: DeleteTaskModalProps) {
  return (
    <Modal title="Edit Task" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <p>
          Are you sure you want to delete the task <span className="font-bold">{task.title}?</span>
        </p>
        <Divider />
        <div className="self-end flex gap-4">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button variant="danger" onClick={() => task && onDelete(task.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
