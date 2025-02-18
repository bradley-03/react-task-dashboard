import "@testing-library/jest-dom"
import { vi, beforeEach, afterEach } from "vitest"

beforeEach(() => {
  vi.spyOn(global.Storage.prototype, "getItem")
  vi.spyOn(global.Storage.prototype, "setItem")
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  localStorage.clear()
})
