import React, { createContext, useState } from "react"
import { EditTaskFormData, Task, TaskFormData } from "../types/Task"

type TaskContextProviderProps = {
  children: React.ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext<{
  tasks: Task[]
  createTask: (taskData: TaskFormData) => void
  editTask: (taskId: string, updatedTaskData: EditTaskFormData) => void
}>({
  tasks: [],
  createTask: () => {
    throw new Error("createTask must be used within a TaskContextProvider")
  },
  editTask: () => {
    throw new Error("editTask must be used within a TaskContextProvider")
  },
})

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

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

  const contextValue = {
    tasks,
    createTask,
    editTask,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
