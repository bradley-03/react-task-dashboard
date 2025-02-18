import { useEffect, useState } from "react"
import useLocalStorage from "./useLocalStorage"

export default function useDarkMode() {
  const { storedValue, setValue } = useLocalStorage("dark-mode", true)
  const [darkMode, setDarkMode] = useState<boolean>(storedValue as boolean)

  useEffect(() => {
    setValue(darkMode)
    document.body.classList.toggle("dark", darkMode)
  }, [darkMode, setValue])

  return { darkMode, setDarkMode }
}
