import { TaskContextProvider } from "../context/TaskContext"
import TaskForm from "./components/TaskForm/TaskForm"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"

function App() {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <TaskContextProvider>
      <button onClick={() => setDarkMode(prev => !prev)}>Turn Dark Mode {darkMode ? "Off" : "On"}</button>
      <TaskForm />
      <TaskList />
    </TaskContextProvider>
  )
}

export default App
