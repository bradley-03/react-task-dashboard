import { TaskContextProvider } from "../context/TaskContext"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"
import { useState } from "react"
import NewTaskModal from "./components/Modals/NewTaskModal/NewTaskModal"

function App() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [currentDisplay, setCurrentDisplay] = useState<"kanban" | "list">("list")
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)

  function toggleDisplay() {
    setCurrentDisplay(prev => (prev === "kanban" ? "list" : "kanban"))
  }

  function openCreateModal() {
    setCreateModalOpen(true)
  }

  function closeDeleteModal() {
    setCreateModalOpen(false)
  }

  return (
    <TaskContextProvider>
      <NewTaskModal isOpen={createModalOpen} onClose={closeDeleteModal} />

      <button onClick={toggleDisplay}>{currentDisplay}</button>
      <br></br>
      <button onClick={() => setDarkMode(prev => !prev)}>Turn Dark Mode {darkMode ? "Off" : "On"}</button>
      <br />
      <button onClick={openCreateModal}>Create Task</button>

      {currentDisplay === "kanban" ? <KanbanBoard /> : <TaskList />}
    </TaskContextProvider>
  )
}

export default App
