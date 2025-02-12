export type Task = {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  createdAt: Date
  due: Date
  status: "pending" | "in progress" | "completed" | "overdue"
}

export type TaskFormData = Omit<Task, "id" | "status" | "createdAt">
