import { renderHook, act } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import useDarkMode from "./useDarkMode"

describe("useDarkMode", () => {
  beforeEach(() => {
    vi.spyOn(document.body.classList, "toggle")
  })

  it("initially sets dark mode from localStorage", () => {
    const { result } = renderHook(() => useDarkMode())

    expect(result.current.darkMode).toBe(true)
    expect(localStorage.getItem).toHaveBeenCalledWith("dark-mode")
    expect(document.body.classList.toggle).toHaveBeenCalledWith("dark", true)
  })

  it("toggles dark mode and updates localStorage", () => {
    const { result } = renderHook(() => useDarkMode())

    act(() => {
      result.current.setDarkMode(false)
    })

    expect(result.current.darkMode).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith("dark-mode", JSON.stringify(false))
    expect(document.body.classList.toggle).toHaveBeenCalledWith("dark", false)
  })
})
