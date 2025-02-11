import React, { createContext, useState } from "react"
import { Task, TaskFormData } from "../types/Task"

type TaskContextProviderProps = {
  children: React.ReactNode
}

export const TaskContext = createContext<{
  tasks: Task[]
  createTask: (taskData: TaskFormData) => void
  toggleTaskComplete: (taskId: string) => void
}>({
  tasks: [],
  createTask: () => {
    throw new Error("createTask must be used within a TaskContextProvider")
  },
  toggleTaskComplete: () => {
    throw new Error("toggleTaskComplete must be used within a TaskContextProvider")
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
        description: taskData.description,
        priority: taskData.priority,
        completed: false,
        createdAt: new Date(),
      },
    ])
  }

  function toggleTaskComplete(taskId: string) {
    setTasks(prevTasks => prevTasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const contextValue = {
    tasks,
    createTask,
    toggleTaskComplete,
  }

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
