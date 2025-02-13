import { useContext, useState } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskItem from "./TaskItem"
import Modal from "../Modal/Modal"
import EditTaskForm from "../EditTaskForm/EditTaskForm"
import { Task } from "../../../types/Task"

type ModalDataState = {
  open: boolean
  taskId: string | undefined
}

export default function TaskList() {
  const [editModal, setEditModal] = useState<ModalDataState>({ open: false, taskId: undefined })
  const { tasks } = useContext(TaskContext)

  function handleEdit(taskId: string) {
    setEditModal({ open: true, taskId })
  }

  function handleModalClose() {
    setEditModal({ taskId: undefined, open: false })
  }

  return (
    <div>
      <h1>All Tasks ({tasks.length})</h1>
      <Modal isOpen={editModal.open} onClose={handleModalClose} title="Edit Task">
        {editModal.taskId && (
          <EditTaskForm
            onEdit={handleModalClose}
            initialData={tasks.find(task => task.id === editModal.taskId) as Task}
          />
        )}
      </Modal>
      {tasks.map(task => (
        <TaskItem key={task.id} itemData={task} onEdit={handleEdit} />
      ))}
    </div>
  )
}
