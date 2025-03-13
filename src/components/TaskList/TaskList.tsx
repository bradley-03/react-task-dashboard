import { BaseSyntheticEvent, useContext, useState } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskListItem from "./TaskListItem"
import Modal from "../Modal/Modal"
import EditTaskForm from "../EditTaskForm/EditTaskForm"
import { Task } from "../../../types/Task"
import { dueMethod, dueMethodAscending, nameMethod, priorityMethod } from "../../../util/sorting"

type ModalState = {
  open: boolean
  task?: Task
  action: "edit" | "delete" | undefined
}

type SortState = { direction: "up" | "down"; by: "unsorted" | "name" | "priority" | "due" }

function getSortedTasks(tasks: Task[], instructions: SortState) {
  switch (instructions.by) {
    case "unsorted":
      return tasks
    case "due":
      return instructions.direction === "down" ? tasks.sort(dueMethod) : tasks.sort(dueMethodAscending)
    case "name":
      return instructions.direction === "down" ? tasks.sort(nameMethod) : tasks.sort(nameMethod).reverse()
    case "priority":
      return instructions.direction === "down" ? tasks.sort(priorityMethod) : tasks.sort(priorityMethod).reverse()
    default:
      return tasks
  }
}

export default function TaskList() {
  const [modalData, setModalData] = useState<ModalState>({ open: false, task: undefined, action: undefined })
  const { tasks, deleteTask, findTaskById } = useContext(TaskContext)
  const [sortBy, setSortBy] = useState<SortState>({ by: "unsorted", direction: "down" })

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

  function handleSortDirectionChange() {
    setSortBy(old => ({ ...old, direction: old.direction === "up" ? "down" : "up" }))
  }

  function handleSortByChange(event: BaseSyntheticEvent) {
    setSortBy(old => ({ ...old, by: event.target.value }))
  }

  const sortedTasks = getSortedTasks(
    Object.keys(tasks).flatMap(status => tasks[status]),
    sortBy
  )

  const totalTaskCount = Object.values(tasks).reduce((count, taskList) => count + taskList.length, 0)

  return (
    <div className="flex flex-col justify-center items-center">
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

      <div>
        <label htmlFor="sort-direction">Sort by</label>
        <select name="sort-direction" id="sort-direction" value={sortBy.by} onChange={handleSortByChange}>
          <option value="unsorted">Unsorted</option>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
          <option value="due">Due</option>
        </select>
        <button onClick={handleSortDirectionChange}>{sortBy.direction}</button>
      </div>

      <table>
        <thead>
          <tr className="bg-gray-200 border-1 border-collapse">
            <th className="border-1 border-collapse">Title</th>
            <th className="border-1 border-collapse">Description</th>
            <th className="border-1 border-collapse">Priority</th>
            <th className="border-1 border-collapse">Due</th>
            <th className="border-1 border-collapse">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks &&
            sortedTasks.map(task => (
              <TaskListItem key={task.id} itemData={task} onEdit={handleEdit} onDelete={handleDeleteModal} />
            ))}
        </tbody>
      </table>
      {/* <ul>
        {Object.keys(tasks).flatMap(status =>
          tasks[status].map(task => (
            <li key={task.id}>
              <TaskListItem itemData={task} onEdit={handleEdit} onDelete={handleDeleteModal} />
            </li>
          ))
        )}
      </ul> */}
    </div>
  )
}
