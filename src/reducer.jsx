const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE":
      //   console.log("handling change")
      const name = action.payload.name
      const value = action.payload.value
      return { ...state, setupForm: { ...state.setupForm, [name]: value } }
  }
}

export { reducer }
