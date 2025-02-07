import React, { createContext, useState } from "react"
import { Task } from "../types/Task"

type TaskContextProviderProps = {
  children: React.ReactNode
}

export const TaskContext = createContext<{ tasks: Task[]; createTask: () => void }>({ tasks: [], createTask: () => {} })

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  function createTask() {}

  const contextValue = {
    tasks,
    createTask,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
