import { TaskContextProvider } from "../context/TaskContext"
import TaskList from "./components/TaskList/TaskList"
import useDarkMode from "../hooks/useDarkMode"
import KanbanBoard from "./components/KanbanBoard/KanbanBoard"
import { useState } from "react"
import NewTaskModal from "./components/Modals/NewTaskModal/NewTaskModal"
import Button from "./components/Button/Button"
import ButtonGroup from "./components/ButtonGroup/ButtonGroup"

import { IoListOutline } from "react-icons/io5"
import { BsPinAngle } from "react-icons/bs"
import { FaRegMoon } from "react-icons/fa"
import { IoSunnyOutline } from "react-icons/io5"

function App() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [currentDisplay, setCurrentDisplay] = useState<"kanban" | "list">("list")
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)

  function toggleDisplay(displayType: "kanban" | "list") {
    setCurrentDisplay(displayType)
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
      <div className="flex gap-2 items-center justify-center mt-3">
        <Button variant="primary" onClick={openCreateModal}>
          Create Task
        </Button>

        <ButtonGroup>
          <Button disabled={currentDisplay === "list"} onClick={() => toggleDisplay("list")}>
            <IoListOutline />
          </Button>
          <Button disabled={currentDisplay === "kanban"} onClick={() => toggleDisplay("kanban")}>
            <BsPinAngle />
          </Button>
        </ButtonGroup>

        <Button onClick={() => setDarkMode(prev => !prev)} variant="ghost" size="icon">
          {darkMode ? <IoSunnyOutline /> : <FaRegMoon />}
        </Button>
      </div>

      {currentDisplay === "kanban" ? <KanbanBoard /> : <TaskList />}
    </TaskContextProvider>
  )
}

export default App
