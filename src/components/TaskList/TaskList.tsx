import { useContext, useState } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskItem from "./TaskItem"
import Modal from "../Modal/Modal"
import EditTaskForm from "../EditTaskForm/EditTaskForm"
import { Task } from "../../../types/Task"

type ModalState = {
  open: boolean
  task?: Task
  action: "edit" | "delete" | undefined
}

export default function TaskList() {
  const [modalData, setModalData] = useState<ModalState>({ open: false, task: undefined, action: undefined })
  const { tasks, deleteTask, findTaskById } = useContext(TaskContext)

  function handleEdit(taskId: string) {
    const foundTask = findTaskById(taskId)
    setModalData({ open: true, task: foundTask, action: "edit" })
  }

  function handleDeleteModal(taskId: string) {
    const foundTask = findTaskById(taskId)
    setModalData({ open: true, task: foundTask, action: "delete" })
  }

  function handleDeletion(taskId: string) {
    deleteTask(taskId)
    setModalData({ open: false, task: undefined, action: undefined })
  }

  function handleModalClose() {
    setModalData({ task: undefined, open: false, action: undefined })
  }

  const totalTaskCount = Object.values(tasks).reduce((count, taskList) => count + taskList.length, 0)

  return (
    <div>
      <h1>All Tasks ({totalTaskCount})</h1>
      <Modal isOpen={modalData.open} onClose={handleModalClose} title="Edit Task">
        {modalData.action === "edit" && modalData.task && (
          <EditTaskForm onEdit={handleModalClose} initialData={modalData.task} />
        )}
        {modalData.action === "delete" && modalData.task && (
          <>
            <p>
              Are you sure you want to delete the task <span className="font-bold">{modalData.task.title}?</span>
            </p>
            <button
              className="bg-red-500 text-white cursor-pointer rounded p-2"
              onClick={() => modalData.task && handleDeletion(modalData.task.id)}
            >
              Delete
            </button>
          </>
        )}
      </Modal>
      {Object.keys(tasks).flatMap(status =>
        tasks[status].map(task => (
          <TaskItem key={task.id} itemData={task} onEdit={handleEdit} onDelete={handleDeleteModal} />
        ))
      )}
    </div>
  )
}
