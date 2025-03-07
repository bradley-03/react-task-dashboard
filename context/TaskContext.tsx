import React, { createContext, useEffect, useState } from "react"
import { EditTaskFormData, Task, TaskBoard, TaskFormData } from "../types/Task"
import useLocalStorage from "../hooks/useLocalStorage"
import { moveBetween, reorder } from "../util/reorder"
import { priorityMethod } from "../util/sorting"

type TaskContextProviderProps = {
  children: React.ReactNode
}

type SortMethod = "priority" | "due"

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<{
  tasks: TaskBoard
  createTask: (taskData: TaskFormData) => void
  editTask: (taskId: string, updatedTaskData: EditTaskFormData) => void
  deleteTask: (taskId: string) => void
  findTaskById: (taskId: string) => Task | undefined
  reorderTask: (taskId: string, currentIndex: number, toIndex: number) => void
  moveTaskToStatus: (fromStatus: string, toStatus: string, fromIndex: number, toIndex: number) => void
  sortTasks: (sortMethod: SortMethod) => void
}>({
  tasks: {},
  createTask: () => {
    throw new Error("createTask must be used within a TaskContextProvider")
  },
  editTask: () => {
    throw new Error("editTask must be used within a TaskContextProvider")
  },
  deleteTask: () => {
    throw new Error("deleteTask must be used within a TaskContextProvider")
  },
  findTaskById: () => {
    throw new Error("findTaskById must be used within a TaskContextProvider")
  },
  reorderTask: () => {
    throw new Error("reorderTask must be used within a TaskContextProvider")
  },
  moveTaskToStatus: () => {
    throw new Error("moveTaskToStatus must be used within a TaskContextProvider")
  },
  sortTasks: () => {
    throw new Error("sortTasks must be used within a TaskContextProvider")
  },
})

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const { storedValue, setValue } = useLocalStorage("tasks", { Pending: [], "In Progress": [], Completed: [] })
  const [tasks, setTasks] = useState<TaskBoard>(storedValue as TaskBoard)

  // keep localStorage in sync with state
  useEffect(() => {
    setValue(tasks)
  }, [tasks, setValue])

  function findTaskById(taskId: string): Task | undefined {
    for (const status in tasks) {
      const task = tasks[status].find(task => task.id === taskId)
      if (task) return task
    }
    return undefined
  }

  function createTask(taskData: TaskFormData) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description || undefined,
      priority: taskData.priority,
      status: "Pending",
      createdAt: new Date(),
      due: taskData.due || undefined,
    }

    setTasks(prevTasks => ({ ...prevTasks, ["Pending"]: [...(prevTasks.Pending ? prevTasks.Pending : []), newTask] }))
  }

  function editTask(taskId: string, updatedTaskData: EditTaskFormData) {
    const updatedState: TaskBoard = { ...tasks }

    const foundTask = findTaskById(taskId)
    if (!foundTask) return

    const editedTask = {
      ...foundTask,
      title: updatedTaskData.title,
      description: updatedTaskData.description || undefined,
      status: updatedTaskData.status,
      priority: updatedTaskData.priority,
      due: updatedTaskData.due || undefined,
    }

    // remove task from old array if status is changed
    if (foundTask.status != editedTask.status) {
      for (const status in tasks) {
        updatedState[status] = tasks[status].filter(task => task.id !== taskId)
      }

      updatedState[editedTask.status] = [
        ...(updatedState[editedTask.status] ? updatedState[editedTask.status] : []),
        editedTask,
      ]
    } else {
      updatedState[editedTask.status] = updatedState[editedTask.status].map(task =>
        task.id === taskId ? editedTask : task
      )
    }

    setTasks(updatedState)
  }

  function deleteTask(taskId: string) {
    const updatedState: TaskBoard = {}

    for (const status in tasks) {
      updatedState[status] = tasks[status].filter(task => task.id !== taskId)
    }

    setTasks(updatedState)
  }

  function reorderTask(taskId: string, currentIndex: number, toIndex: number) {
    const foundTask = findTaskById(taskId)
    if (!foundTask) return

    const toReorder = tasks[foundTask.status]

    const reorderedTasks = reorder(toReorder, currentIndex, toIndex) as Task[]

    setTasks(prevItems => ({ ...prevItems, [foundTask.status]: reorderedTasks }))
  }

  function moveTaskToStatus(fromStatus: string, toStatus: string, fromIndex: number, toIndex: number) {
    const fromTasks = tasks[fromStatus] || []
    const toTasks = tasks[toStatus] || []

    const { updatedFrom, updatedTo } = moveBetween(fromTasks, toTasks, fromIndex, toIndex) as {
      updatedFrom: Task[]
      updatedTo: Task[]
    }

    updatedTo[toIndex].status = toStatus

    setTasks(prevItems => ({
      ...prevItems,
      [fromStatus]: updatedFrom,
      [toStatus]: updatedTo,
    }))
  }

  function sortTasks(sortMethod: SortMethod) {
    const updatedState: TaskBoard = {}

    if (sortMethod === "priority") {
      for (const status in tasks) {
        updatedState[status] = tasks[status].sort(priorityMethod)
      }
    }

    setTasks(updatedState)
  }

  const contextValue = {
    tasks,
    createTask,
    editTask,
    deleteTask,
    findTaskById,
    reorderTask,
    moveTaskToStatus,
    sortTasks,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
