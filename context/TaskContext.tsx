import React, { createContext, useEffect, useState } from "react"
import { EditTaskFormData, Task, TaskFormData } from "../types/Task"
import useLocalStorage from "../hooks/useLocalStorage"

type TaskContextProviderProps = {
  children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<{
  tasks: Task[]
  createTask: (taskData: TaskFormData) => void
  editTask: (taskId: string, updatedTaskData: EditTaskFormData) => void
  deleteTask: (taskId: string) => void
}>({
  tasks: [],
  createTask: () => {
    throw new Error("createTask must be used within a TaskContextProvider")
  },
  editTask: () => {
    throw new Error("editTask must be used within a TaskContextProvider")
  },
  deleteTask: () => {
    throw new Error("deleteTask must be used within a TaskContextProvider")
  },
})

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const { storedValue, setValue } = useLocalStorage("tasks", [])
  const [tasks, setTasks] = useState<Task[]>(storedValue as Task[])

  // keep localStorage in sync with state
  useEffect(() => {
    setValue(tasks)
  }, [tasks, setValue])

  function createTask(taskData: TaskFormData) {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        title: taskData.title,
        description: taskData.description || undefined,
        priority: taskData.priority,
        status: "pending",
        createdAt: new Date(),
        due: taskData.due || undefined,
      },
    ])
  }

  function editTask(taskId: string, updatedTaskData: EditTaskFormData) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              title: updatedTaskData.title,
              description: updatedTaskData.description || undefined,
              status: updatedTaskData.status,
              priority: updatedTaskData.priority,
              due: updatedTaskData.due || undefined,
            }
          : task
      )
    )
  }

  function deleteTask(taskId: string) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const contextValue = {
    tasks,
    createTask,
    editTask,
    deleteTask,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
