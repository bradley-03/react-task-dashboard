import { TaskContextProvider } from "../context/TaskContext"
import TaskForm from "./components/TaskForm/TaskForm"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"
import { useState } from "react"

function App() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [currentDisplay, setCurrentDisplay] = useState<"kanban" | "list">("list")

  function toggleDisplay() {
    setCurrentDisplay(prev => (prev === "kanban" ? "list" : "kanban"))
  }

  return (
    <TaskContextProvider>
      <button onClick={toggleDisplay}>{currentDisplay}</button>
      <br></br>
      <button onClick={() => setDarkMode(prev => !prev)}>Turn Dark Mode {darkMode ? "Off" : "On"}</button>
      <TaskForm />

      {currentDisplay === "kanban" ? <KanbanBoard /> : <TaskList />}
    </TaskContextProvider>
  )
}

export default App
