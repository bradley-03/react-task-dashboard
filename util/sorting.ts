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
