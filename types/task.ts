export type Task = {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  completed: boolean
  createdAt: Date
}

export type TaskFormData = Omit<Task, "id" | "completed" | "createdAt">
