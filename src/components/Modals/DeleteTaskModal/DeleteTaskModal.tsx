import Modal from "../../Modal/Modal"
import { Task } from "../../../../types/Task"

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
      <button className="bg-red-500 text-white cursor-pointer rounded p-2" onClick={() => task && onDelete(task.id)}>
        Delete
      </button>
    </Modal>
  )
}
