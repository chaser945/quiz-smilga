const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE":
      //   console.log("handling change")
      const name = action.payload.name
      const value = action.payload.value
      return { ...state, setupForm: { ...state.setupForm, [name]: value } }
    case "NEXT_QUESTION":
      const checkIndex = (index) => {
        if (index > state.fetchedData.length - 1) {
          return 0
        }
        return index
      }
      return { ...state, questionIndex: checkIndex(state.questionIndex + 1) }
    case "FETCH_DATA":
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        fetchedData: action.payload.fetchedData,
      }
    default:
      throw new Error(`${action.type} is not defined in the reducer`)
  }
}

export { reducer }
