import { Task } from "../types/Task"

const priorityValues = {
  low: 0,
  medium: 1,
  high: 2,
}

export function priorityMethod(a: Task, b: Task) {
  if (priorityValues[a.priority] > priorityValues[b.priority]) {
    return -1
  }
  if (priorityValues[a.priority] < priorityValues[b.priority]) {
    return 1
  }
  return 0
}

export function dueMethod(a: Task, b: Task) {
  if (!a.due) return 1
  if (!b.due) return -1

  return new Date(a.due).getTime() - new Date(b.due).getTime()
}
