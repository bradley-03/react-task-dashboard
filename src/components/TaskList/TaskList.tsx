import { useContext, useState } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskListItem from "./TaskListItem"
import Button from "../Button/Button"
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal"
import DeleteTaskModal from "../Modals/DeleteTaskModal/DeleteTaskModal"
import { Task } from "../../../types/Task"
import { dueMethod, dueMethodAscending, nameMethod, priorityMethod } from "../../../util/sorting"
import Select from "../Select/Select"
import { SingleValue } from "react-select"
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa"
import Label from "../Label/Label"
import { TbFilter } from "react-icons/tb"
import { FaPlus } from "react-icons/fa"
import Table from "../Table/Table"

type TaskListProps = {
  onCreateTask: () => void
}

type ModalState = {
  open: boolean
  task?: Task
  action: "edit" | "delete" | undefined
}

type SortByTypes = "unsorted" | "name" | "priority" | "due"
type SortState = { direction: "up" | "down"; by: SortByTypes }

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

export default function TaskList({ onCreateTask }: TaskListProps) {
  const [modalData, setModalData] = useState<ModalState>({ open: false, task: undefined, action: undefined })
  const { tasks, deleteTask, findTaskById } = useContext(TaskContext)
  const [sortBy, setSortBy] = useState<SortState>({ by: "unsorted", direction: "down" })
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const [showFiltersBar, setShowFiltersBar] = useState<boolean>(false)

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

  function handleSortByChange(newValue: SingleValue<{ value: string; label: string }>) {
    setSortBy(old => ({ ...old, by: newValue ? newValue.value : "down" } as SortState))
  }

  function handleShowCompletedCheck() {
    setShowCompleted(old => !old)
  }

  function toggleFiltersBar() {
    setShowFiltersBar(old => !old)
  }

  let sortedTasks = getSortedTasks(
    Object.keys(tasks).flatMap(status => tasks[status]),
    sortBy
  )

  if (showCompleted === false) {
    sortedTasks = sortedTasks.filter(task => task.status !== "Completed")
  }

  const totalTaskCount = Object.values(tasks).reduce((count, taskList) => count + taskList.length, 0)

  const sortOptions = [
    { value: "unsorted", label: "Unsorted" },
    { value: "name", label: "Name" },
    { value: "priority", label: "Priority" },
    { value: "due", label: "Due" },
  ]

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>All Tasks ({totalTaskCount})</h1>

      {modalData.action && modalData.task && modalData.action === "edit" && (
        <EditTaskModal isOpen={modalData.open} onClose={handleModalClose} task={modalData.task} />
      )}
      {modalData.action && modalData.task && modalData.action === "delete" && (
        <DeleteTaskModal
          isOpen={modalData.open}
          onClose={handleModalClose}
          task={modalData.task}
          onDelete={handleDeletion}
        />
      )}

      <div className="flex self-end gap-2 mb-2">
        <Button onClick={onCreateTask} variant="outline">
          <FaPlus />
          New Task
        </Button>
        <Button onClick={toggleFiltersBar} size="icon" variant="outline">
          <TbFilter />
        </Button>
      </div>

      {showFiltersBar && (
        <div className="flex flex-row gap-2 self-end justify-end items-center shadow mb-2 border-1 border-neutral-600 rounded p-2 w-full">
          <input
            type="checkbox"
            name="show-completed"
            id="show-completed"
            checked={showCompleted}
            onChange={handleShowCompletedCheck}
          />
          <label htmlFor="show-completed">Show Completed</label>

          <Label htmlFor="sort-direction">Sort by</Label>
          <Select
            className="w-40"
            isSearchable={false}
            id="sort-direction"
            onChange={handleSortByChange}
            value={sortOptions.filter(opt => opt.value === sortBy.by)}
            options={sortOptions}
          />

          <Button variant="ghost" size="icon" onClick={handleSortDirectionChange}>
            {sortBy.direction === "up" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </Button>
        </div>
      )}

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Task</Table.Header>
            <Table.Header>Priority</Table.Header>
            <Table.Header>Due</Table.Header>
            <Table.Header>Status</Table.Header>
            <Table.Header>Actions</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedTasks &&
            sortedTasks.map(task => (
              <TaskListItem key={task.id} itemData={task} onEdit={handleEdit} onDelete={handleDeleteModal} />
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}
