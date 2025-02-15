import { useContext } from "react"
import { TaskContext } from "../../../context/TaskContext"
import { TaskFormData } from "../../../types/Task"

export default function TaskForm() {
  const { createTask } = useContext(TaskContext)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const newTaskData: TaskFormData = {
      title: formData.get("title") as string,
      priority: formData.get("priority") as "low" | "medium" | "high",
      description: formData.get("description") as string,
      due: formData.get("due") as unknown as Date,
    }

    createTask(newTaskData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <br />
      <input className="border rounded focus:outline-0" type="text" name="title" id="title" required />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <textarea className="border-1 rounded" name="description" id="description" />
      <br />
      <label htmlFor="priority">Priority</label>
      <br />
      <select defaultValue={"low"} className="border-1 rounded" name="priority" id="priority" required>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <br />
      <label htmlFor="due">Due</label>
      <br />
      <input type="date" name="due" id="due" />
      <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition cursor-pointer">
        Create Task
      </button>
    </form>
  )
}
