const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, waiting: false }

    case "HANDLE_CHANGE":
      //   console.log("handling change")
      const name = action.payload.name
      const value = action.payload.value
      return { ...state, setupForm: { ...state.setupForm, [name]: value } }
    case "NEXT_QUESTION":
      // console.log(state.questionIndex)
      // console.log(state.fetchedData.length - 1)
      // console.log(state.fetchedData)
      if (state.questionIndex >= state.fetchedData.length - 1) {
        return { ...state, modal: true }
      } else {
        return { ...state, questionIndex: state.questionIndex + 1 }
      }
    case "FETCH_DATA":
      if (action.payload.fetchedData.length < 1) {
        return {
          ...state,
          waiting: true,
          error: true,
          loading: false,
        }
      } else {
        return {
          ...state,
          waiting: false,
          fetchedData: action.payload.fetchedData,
          loading: false,
          error: false,
        }
      }
    case "CHECK_ANS":
      return {
        ...state,
        correctAnsNum: action.payload.value
          ? state.correctAnsNum + 1
          : state.correctAnsNum,
      }
    case "SET_MODAL":
      if (action.payload.param === "close_modal")
        return {
          ...state,
          modal: false,
          waiting: true,
          questionIndex: 0,
          correctAnsNum: 0,
        }
    default:
      throw new Error(`${action.type} is not defined in the reducer`)
  }
}

export { reducer }
