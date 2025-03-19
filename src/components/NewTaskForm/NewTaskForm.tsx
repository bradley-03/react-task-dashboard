import { useContext } from "react"
import { TaskContext } from "../../../context/TaskContext"
import { TaskFormData } from "../../../types/Task"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Label from "../Label/Label"
import Divider from "../Divider/Divider"
import TextArea from "../TextArea/TextArea"
import Select from "../Select/Select"

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
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-2.5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" id="title" placeholder="Title" required />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <TextArea className="border-1 rounded" name="description" id="description" placeholder="Description" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="priority">Priority</Label>

        {/* <Select defaultValue={"low"} className="border-1 rounded" name="priority" id="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select> */}
        <Select
          name="priority"
          required
          isSearchable={false}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="due">Due</Label>
        <Input type="date" name="due" id="due" />
      </div>

      <Divider />
      <div className="self-end">
        <Button>Create Task</Button>
      </div>
    </form>
  )
}
