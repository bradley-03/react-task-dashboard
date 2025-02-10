import { TaskContext, TaskContextProvider } from "./TaskContext"
import React, { useContext } from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { randomUUID } from "node:crypto"

window.crypto.randomUUID = jest.fn(randomUUID)

function TestComponent() {
  const { tasks, createTask } = useContext(TaskContext)

  return (
    <>
      <p data-testid="tasks-count">Tasks: {tasks.length}</p>
      <button data-testid="create-btn" onClick={() => createTask({ title: "New Task" })}>
        Add Task
      </button>
    </>
  )
}

describe("TaskContext", () => {
  test("renders children correctly", () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 0")
  })

  test("adds a task when createTask is called", async () => {
    render(
      <TaskContextProvider>
        <TestComponent />
      </TaskContextProvider>
    )

    const button = screen.getByTestId("create-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("tasks-count")).toHaveTextContent("Tasks: 1")
    })
  })
})
