import { TaskContextProvider } from "../context/TaskContext"
import TaskForm from "./components/TaskForm/TaskForm"

function App() {
  return (
    <TaskContextProvider>
      <h1>Hello World</h1>
      <TaskForm />
    </TaskContextProvider>
  )
}

export default App
