import { TaskContextProvider } from "../context/TaskContext"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"
import { useState } from "react"
import NewTaskModal from "./components/Modals/NewTaskModal/NewTaskModal"
import Button from "./components/Button/Button"

import { FaRegMoon } from "react-icons/fa"
import { IoSunnyOutline } from "react-icons/io5"

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
      <div className="flex gap-2 items-center justify-center">
        <Button onClick={toggleDisplay}>{currentDisplay}</Button>

        <Button variant="primary" onClick={openCreateModal}>
          Create Task
        </Button>

        <Button onClick={() => setDarkMode(prev => !prev)} variant="ghost" size="icon">
          {darkMode ? <IoSunnyOutline /> : <FaRegMoon />}
        </Button>
      </div>

      {currentDisplay === "kanban" ? <KanbanBoard /> : <TaskList />}
    </TaskContextProvider>
  )
}

export default App
