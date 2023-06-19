import SetupForm from "./components/SetupForm"
import { useGlobalContext } from "./context"

const App = () => {
  const { waiting } = useGlobalContext()

  if (waiting) {
    return <SetupForm />
  }

  return <section className="app"></section>
}
export default App
