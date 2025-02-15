import Modal from "./Modal"
import { useState } from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"

function TestComponent() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <Modal onClose={() => setModalOpen(false)} isOpen={modalOpen} title="Modal">
        <p>Rendered</p>
        <button data-testid="close-btn" onClick={() => setModalOpen(false)}>
          Close
        </button>
      </Modal>
      <button data-testid="open-btn" onClick={() => setModalOpen(true)}>
        Open
      </button>
    </div>
  )
}

describe("Modal Component", () => {
  it("checks that Modal opens and closes when isOpen is changed", async () => {
    render(<TestComponent />)

    const button = screen.getByTestId("open-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Modal")).toBeTruthy()
    })

    const closeButton = screen.getByTestId("close-btn")
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText("Modal")).toBeNull()
    })
  })

  it("checks that Modal children are rendered correctly", async () => {
    render(<TestComponent />)

    const button = screen.getByTestId("open-btn")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Rendered")).toBeTruthy()
    })
  })
})
