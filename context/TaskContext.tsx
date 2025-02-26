import React, { createContext, useEffect, useState } from "react"
import { EditTaskFormData, Task, TaskBoard, TaskFormData } from "../types/Task"
import useLocalStorage from "../hooks/useLocalStorage"

type TaskContextProviderProps = {
  children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<{
  tasks: TaskBoard
  createTask: (taskData: TaskFormData) => void
  editTask: (taskId: string, updatedTaskData: EditTaskFormData) => void
  deleteTask: (taskId: string) => void
  findTaskById: (taskId: string) => Task | undefined
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
})

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const { storedValue, setValue } = useLocalStorage("tasks", {})
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
      status: "pending",
      createdAt: new Date(),
      due: taskData.due || undefined,
    }

    setTasks(prevTasks => ({ ...prevTasks, ["pending"]: [...(prevTasks.pending ? prevTasks.pending : []), newTask] }))
  }

  function editTask(taskId: string, updatedTaskData: EditTaskFormData) {
    const updatedState: TaskBoard = {}

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
    }

    updatedState[editedTask.status] = [
      ...(updatedState[editedTask.status] ? updatedState[editedTask.status] : []),
      editedTask,
    ]

    setTasks(updatedState)
  }

  function deleteTask(taskId: string) {
    const updatedState: TaskBoard = {}

    for (const status in tasks) {
      updatedState[status] = tasks[status].filter(task => task.id !== taskId)
    }

    setTasks(updatedState)
  }

  const contextValue = {
    tasks,
    createTask,
    editTask,
    deleteTask,
    findTaskById,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
