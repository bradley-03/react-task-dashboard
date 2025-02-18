import { renderHook, act } from "@testing-library/react"
import { it, expect, describe } from "vitest"
import useLocalStorage from "./useLocalStorage"

describe("useLocalStorage", () => {
  it("should initialize with value from localStorage", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"))

    const { result } = renderHook(() => useLocalStorage("testKey", "defaultValue"))

    expect(result.current.storedValue).toBe("storedValue")
  })

  it("should initialize with default value if no localStorage entry", () => {
    const { result } = renderHook(() => useLocalStorage("newKey", "defaultValue"))

    expect(result.current.storedValue).toBe("defaultValue")
  })

  it("should update localStorage when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "defaultValue"))

    act(() => {
      result.current.setValue("newValue")
    })

    expect(result.current.storedValue).toBe("newValue")
    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", JSON.stringify("newValue"))
  })

  it("should support functional updates", () => {
    localStorage.setItem("testKey", JSON.stringify(5))
    const { result } = renderHook(() => useLocalStorage("testKey", 0))

    act(() => {
      result.current.setValue((prev: number) => prev + 5)
    })

    expect(result.current.storedValue).toBe(10)
    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", JSON.stringify(10))
  })

  it("should handle JSON parse errors gracefully", () => {
    localStorage.setItem("testKey", "invalid JSON")

    const { result } = renderHook(() => useLocalStorage("testKey", "fallbackValue"))

    expect(console.error).toHaveBeenCalled()
    expect(result.current.storedValue).toBe("fallbackValue")
  })
})
