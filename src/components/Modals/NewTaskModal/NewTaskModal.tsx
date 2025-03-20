import Modal from "../../Modal/Modal"
import NewTaskForm from "../../NewTaskForm/NewTaskForm"

type NewTaskModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
  return (
    <Modal title="Create Task" isOpen={isOpen} onClose={onClose}>
      <NewTaskForm closeModal={onClose} />
    </Modal>
  )
}
