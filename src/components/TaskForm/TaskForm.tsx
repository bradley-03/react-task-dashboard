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
    }

    createTask(newTaskData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <br />
      <input className="border rounded focus:outline-0" type="text" name="title" id="title" required />
      <br />
      <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition cursor-pointer">
        Create Task
      </button>
    </form>
  )
}
