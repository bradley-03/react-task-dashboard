import { EditTaskFormData, Task } from "../../../types/Task"
import { useContext } from "react"
import { TaskContext } from "../../../context/TaskContext"
import Button from "../Button/Button"

type EditTaskFormProps = {
  initialData: Task
  onEdit: () => void
}

export default function EditTaskForm({ initialData, onEdit }: EditTaskFormProps) {
  const { editTask } = useContext(TaskContext)

  if (!initialData) return null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const newTaskData: EditTaskFormData = {
      title: formData.get("title") as string,
      priority: formData.get("priority") as "low" | "medium" | "high",
      description: formData.get("description") as string,
      due: formData.get("due") as unknown as Date,
      status: formData.get("status") as "pending" | "in progress" | "completed",
    }

    editTask(initialData.id, newTaskData)
    if (onEdit) {
      onEdit()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          className="border rounded focus:outline-0"
          type="text"
          name="title"
          id="title"
          defaultValue={initialData.title}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          className="border-1 rounded"
          name="description"
          id="description"
          defaultValue={initialData.description}
        />
        <br />
        <label htmlFor="priority">Priority</label>
        <br />
        <select defaultValue={initialData.priority} className="border-1 rounded" name="priority" id="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br />
        <label htmlFor="due">Due</label>
        <br />
        <input
          defaultValue={initialData.due ? new Date(initialData.due).toISOString().split("T")[0] : ""}
          type="date"
          name="due"
          id="due"
        />
        <br />
        <label htmlFor="status">Status</label>
        <br />
        <select defaultValue={initialData.status} className="border-1 rounded" name="status" id="status" required>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <br />
        <Button>Update Task</Button>
      </form>
    </div>
  )
}
