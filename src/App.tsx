import { TaskContextProvider } from "../context/TaskContext"
import TaskForm from "./components/TaskForm/TaskForm"
import TaskList from "./components/TaskList/TaskList"

function App() {
  return (
    <TaskContextProvider>
      <TaskForm />
      <TaskList />
    </TaskContextProvider>
  )
}

export default App
