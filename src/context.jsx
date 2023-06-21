import { createContext, useContext, useReducer, useEffect } from "react"
import { useFetch } from "./useFetch"
import { reducer } from "./reducer"
import axios from "axios"

const AppContext = createContext()

// let url = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`

const initialState = {
  waiting: true,
  modal: false,
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

const questionCategory = {
  sports: 21,
  history: 23,
  politics: 24,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    // const { loading, error, fetchedData } = useFetch(url)
    dispatch({ type: "LOADING" })
    const url = `https://opentdb.com/api.php?amount=${
      state.setupForm.num_of_questions
    }&category=${questionCategory[state.setupForm.category]}&difficulty=${
      state.setupForm.difficulty
    }&type=multiple`
    try {
      const response = await axios(url)
      console.log(response)
      dispatch({
        type: "FETCH_DATA",
        payload: { fetchedData: response.data.results },
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const nextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" })
  }

  const checkAns = (value) => {
    dispatch({ type: "CHECK_ANS", payload: { value } })
    nextQuestion()
  }

  const setModal = (param) => {
    dispatch({ type: "SET_MODAL", payload: { param } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        nextQuestion,
        checkAns,
        setModal,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => useContext(AppContext)

export { AppProvider, useGlobalContext }
