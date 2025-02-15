import { useContext, useState } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskItem from "./TaskItem"
import Modal from "../Modal/Modal"
import EditTaskForm from "../EditTaskForm/EditTaskForm"
import { Task } from "../../../types/Task"

type ModalState = {
  open: boolean
  taskId: string | undefined
  action: "edit" | "delete" | undefined
}

export default function TaskList() {
  const [modalData, setModalData] = useState<ModalState>({ open: false, taskId: undefined, action: undefined })
  const { tasks, deleteTask } = useContext(TaskContext)

  function handleEdit(taskId: string) {
    setModalData({ open: true, taskId, action: "edit" })
  }

  function handleDeleteModal(taskId: string) {
    setModalData({ open: true, taskId, action: "delete" })
  }

  function handleDeletion(taskId: string) {
    deleteTask(taskId)
    setModalData({ open: false, taskId: undefined, action: undefined })
  }

  function handleModalClose() {
    setModalData({ taskId: undefined, open: false, action: undefined })
  }

  return (
    <div>
      <h1>All Tasks ({tasks.length})</h1>
      <Modal isOpen={modalData.open} onClose={handleModalClose} title="Edit Task">
        {modalData.action === "edit" && modalData.taskId && (
          <EditTaskForm
            onEdit={handleModalClose}
            initialData={tasks.find(task => task.id === modalData.taskId) as Task}
          />
        )}
        {modalData.action === "delete" && modalData.taskId && (
          <>
            <p>
              Are you sure you want to delete the task{" "}
              <span className="font-bold">{(tasks.find(task => task.id === modalData.taskId) as Task).title}?</span>
            </p>
            <button
              className="bg-red-500 text-white cursor-pointer rounded p-2"
              onClick={() => handleDeletion(modalData.taskId!)}
            >
              Delete
            </button>
          </>
        )}
      </Modal>
      {tasks.map(task => (
        <TaskItem key={task.id} itemData={task} onEdit={handleEdit} onDelete={handleDeleteModal} />
      ))}
    </div>
  )
}
