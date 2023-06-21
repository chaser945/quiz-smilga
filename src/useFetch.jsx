import axios from "axios"
import { useEffect, useReducer } from "react"

const initialState = {
  loading: true,
  error: false,
  fetchedData: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        loading: false,
        fetchedData: action.payload.response.data.results,
      }
    case "SET_ERROR":
      return { ...state, loading: false, error: true }
    default:
      throw new Error(`${action.type} is not handled in the reducer`)
  }
}

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async (url) => {
    try {
      const response = await axios(url)
      // console.log(response.data)
      dispatch({ type: "SET_DATA", payload: { response } })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: "SET_ERROR" })
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  return { ...state }
}

export { useFetch }
