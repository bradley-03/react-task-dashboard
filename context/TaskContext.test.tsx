import { TaskContext, TaskContextProvider } from "./TaskContext"
import React, { useContext } from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"

function TestComponent() {
  const { tasks, createTask, deleteTask, editTask } = useContext(TaskContext)

  const totalTaskCount = Object.values(tasks).reduce((count, taskList) => count + taskList.length, 0)

  return (
    <>
      <p data-testid="tasks-count">Tasks: {totalTaskCount}</p>
      <button
        data-testid="create-btn"
        onClick={() =>
          createTask({
            title: "New Task",
            priority: "low",
            due: new Date("2025-02-16"),
            description: "Task Description",
          })
        }
      >
        Add Task
      </button>
      <button
        data-testid="delete-btn"
        onClick={() => (tasks.Pending[0] ? deleteTask(tasks.Pending[0].id) : deleteTask(tasks.Completed[0].id))}
      >
        Delete Task
      </button>

      <button
        data-testid="edit-btn"
        onClick={() =>
          tasks.Pending[0] &&
          editTask(tasks.Pending[0].id, {
            status: "Completed",
            title: "Edited Task",
            priority: "high",
            due: new Date("2025-02-17"),
            description: "Edited Description",
          })
        }
      >
        Edit Task
      </button>

      {tasks.Pending && tasks.Pending[0] && (
        <div data-testid="task-div">
          <p data-testid="task-div-title">{tasks.Pending[0].title}</p>
          <p data-testid="task-div-description">{tasks.Pending[0].description}</p>
          <p data-testid="task-div-priority">{tasks.Pending[0].priority}</p>
          <p data-testid="task-div-due">{tasks.Pending[0].due && tasks.Pending[0].due.toDateString()}</p>
          <p data-testid="task-div-status">{tasks.Pending[0].status}</p>
        </div>
      )}
      {tasks.Completed && tasks.Completed[0] && (
        <div data-testid="task-div-2">
          <p data-testid="task-div-2-title">{tasks.Completed[0].title}</p>
          <p data-testid="task-div-2-description">{tasks.Completed[0].description}</p>
          <p data-testid="task-div-2-priority">{tasks.Completed[0].priority}</p>
          <p data-testid="task-div-2-due">{tasks.Completed[0].due && tasks.Completed[0].due.toDateString()}</p>
          <p data-testid="task-div-2-status">{tasks.Completed[0].status}</p>
        </div>
      )}
    </>
  )
}

describe("TaskContext", () => {
  it("renders children correctly", () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 0")
  })

  it("adds a task when createTask is called", async () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    const button = screen.getByTestId("create-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 1")
      expect(screen.getByTestId("task-div")).toBeInTheDocument()
      expect(screen.getByTestId("task-div-title")).toHaveTextContent("New Task")
      expect(screen.getByTestId("task-div-description")).toHaveTextContent("Task Description")
      expect(screen.getByTestId("task-div-priority")).toHaveTextContent("low")
      expect(screen.getByTestId("task-div-due")).toHaveTextContent("Sun Feb 16 2025")
    })
  })

  it("deletes a task when deleteTask is called", async () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    const button = screen.getByTestId("create-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 1")
      expect(screen.getByTestId("task-div")).toBeInTheDocument()
    })

    const deleteBtn = screen.getByTestId("delete-btn")
    fireEvent.click(deleteBtn)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 0")
      expect(screen.queryByTestId("task-div")).not.toBeInTheDocument()
    })
  })

  it("edits a task when editTask is called", async () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    const button = screen.getByTestId("create-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 1")
      expect(screen.getByTestId("task-div")).toBeInTheDocument()
      expect(screen.getByTestId("task-div-title")).toHaveTextContent("New Task")
    })

    const editBtn = screen.getByTestId("edit-btn")
    fireEvent.click(editBtn)

    await waitFor(() => {
      expect(screen.getByTestId("task-div-2")).toBeInTheDocument()
      expect(screen.getByTestId("task-div-2-title")).toHaveTextContent("Edited Task")
      expect(screen.getByTestId("task-div-2-description")).toHaveTextContent("Edited Description")
      expect(screen.getByTestId("task-div-2-priority")).toHaveTextContent("high")
      expect(screen.getByTestId("task-div-2-due")).toHaveTextContent("Mon Feb 17 2025")
      expect(screen.getByTestId("task-div-2-status")).toHaveTextContent("Completed")
      expect(screen.queryByTestId("tasks-div")).not.toBeInTheDocument()
    })
  })

  it("ensures state updates are reflected in localStorage", async () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    const createBtn = screen.getByTestId("create-btn")
    fireEvent.click(createBtn)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 1")
    })

    let storedTasks = JSON.parse(localStorage.getItem("tasks") as string)
    expect(storedTasks.Pending).toHaveLength(1)
    expect(storedTasks.Pending[0].title).toBe("New Task")

    const editBtn = screen.getByTestId("edit-btn")
    fireEvent.click(editBtn)

    await waitFor(() => {
      expect(screen.getByTestId("task-div-2-title")).toHaveTextContent("Edited Task")
    })

    storedTasks = JSON.parse(localStorage.getItem("tasks") as string)
    expect(storedTasks.Completed[0].title).toBe("Edited Task")
    expect(storedTasks.Completed[0].priority).toBe("high")

    const deleteBtn = screen.getByTestId("delete-btn")
    fireEvent.click(deleteBtn)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 0")
    })

    storedTasks = JSON.parse(localStorage.getItem("tasks") as string)
    expect(storedTasks.Completed).toHaveLength(0)
  })
})
