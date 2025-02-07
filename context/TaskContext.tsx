import React, { createContext, useState } from "react"
import { Task, TaskFormData } from "../types/Task"

type TaskContextProviderProps = {
  children: React.ReactNode
}

export const TaskContext = createContext<{ tasks: Task[]; createTask: (taskData: TaskFormData) => void }>({
  tasks: [],
  createTask: () => {
    throw new Error("createTask must be used within a TaskContextProvider")
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
      },
    ])
  }

  const contextValue = {
    tasks,
    createTask,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
