import { useContext } from "react"
import { TaskContext } from "../../../context/TaskContext"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const { tasks } = useContext(TaskContext)

  return (
    <div>
      <h1>All Tasks ({tasks.length})</h1>
      {tasks.map(task => (
        <TaskItem key={task.id} itemData={task} />
      ))}
    </div>
  )
}
