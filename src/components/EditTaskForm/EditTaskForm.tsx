import { EditTaskFormData, Task } from "../../../types/Task"
import { useContext } from "react"
import { TaskContext } from "../../../context/TaskContext"
import Button from "../Button/Button"
import Select from "../Select/Select"
import Input from "../Input/Input"
import TextArea from "../TextArea/TextArea"
import Label from "../Label/Label"
import Divider from "../Divider/Divider"
import DatePicker from "../DatePicker/DatePicker"

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

  const prioritySelectOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

  const statusSelectOptions = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-2.5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" id="title" defaultValue={initialData.title} required />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <TextArea name="description" id="description" defaultValue={initialData.description} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="priority">Priority</Label>
        <Select
          isSearchable={false}
          defaultValue={prioritySelectOptions.filter(opt => opt.value === initialData.priority)}
          options={prioritySelectOptions}
          name="priority"
          id="priority"
          required
        />
      </div>

      <div className="grid w-full max-w-sm items-center">
        <Label htmlFor="due" className="mb-1.5">
          Due
        </Label>
        <DatePicker initialDate={initialData.due} dateFormat="dd/MM/yyyy" name="due" id="due" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select
          isSearchable={false}
          options={statusSelectOptions}
          defaultValue={statusSelectOptions.filter(opt => opt.value === initialData.status)}
          name="status"
          id="status"
          required
        />
      </div>
      <Divider />
      <div className="self-end">
        <Button type="submit">Update Task</Button>
      </div>
    </form>
  )
}
