import { createContext, useContext, useReducer, useEffect } from "react"
import { useFetch } from "./useFetch"
import { reducer } from "./reducer"

const AppContext = createContext()

let url = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`

const initialState = {
  waiting: false,
  setupForm: {
    num_of_questions: 1,
    category: "sports",
    difficulty: "easy",
  },
  correctAnsNum: 0,
  questionIndex: 0,
  loading: true,
  error: false,
  fetchedData: [],
}

const AppProvider = ({ children }) => {
  const { loading, error, fetchedData } = useFetch(url)
  const [state, dispatch] = useReducer(reducer, initialState)

  const nextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_DATA", payload: { loading, error, fetchedData } })
  }, [fetchedData])

  return (
    <AppContext.Provider value={{ ...state, dispatch, nextQuestion }}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => useContext(AppContext)

export { AppProvider, useGlobalContext }
