export type Status = "Pending" | "In Progress" | "Completed" | (string & {})

export type Task = {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  createdAt: Date
  due?: Date
  status: Status
}

export type TaskBoard = Record<string, Task[]>

export type TaskFormData = Omit<Task, "id" | "status" | "createdAt">
export type EditTaskFormData = Omit<Task, "id" | "createdAt">
