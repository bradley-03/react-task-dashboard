import { TaskContextProvider } from "../context/TaskContext"
import TaskForm from "./components/TaskForm/TaskForm"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"

function App() {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <TaskContextProvider>
      <button onClick={() => setDarkMode(prev => !prev)}>Turn Dark Mode {darkMode ? "Off" : "On"}</button>
      <TaskForm />
      {/* <TaskList /> */}
      <KanbanBoard />
    </TaskContextProvider>
  )
}

export default App
