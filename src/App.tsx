import { TaskContextProvider } from "../context/TaskContext"

function App() {
  return (
    <TaskContextProvider>
      <h1>Hello World</h1>
    </TaskContextProvider>
  )
}

export default App
