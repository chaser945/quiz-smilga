import { createContext, useContext, useReducer } from "react"
import { useFetch } from "./useFetch"
import { reducer } from "./reducer"

const AppContext = createContext()

let url = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`

const initialState = {
  waiting: true,
  setupForm: {
    num_of_questions: 1,
    category: "sports",
    difficulty: "easy",
  },
}

const AppProvider = ({ children }) => {
  const { loading, error, fetchedData } = useFetch(url)
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider
      value={{ ...state, dispatch, loading, error, fetchedData }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => useContext(AppContext)

export { AppProvider, useGlobalContext }
