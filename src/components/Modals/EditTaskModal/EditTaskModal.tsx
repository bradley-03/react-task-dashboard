import Modal from "../../Modal/Modal"
import EditTaskForm from "../../EditTaskForm/EditTaskForm"
import { Task } from "../../../../types/Task"

type EditTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  task: Task
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  return (
    <Modal title="Edit Task" isOpen={isOpen} onClose={onClose}>
      <EditTaskForm onEdit={onClose} initialData={task} />
    </Modal>
  )
}
