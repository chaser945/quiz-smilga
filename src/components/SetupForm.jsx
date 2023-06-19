import { useGlobalContext } from "../context"

const SetupForm = () => {
  const { setupForm, dispatch } = useGlobalContext()
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } })
  }
  return (
    <section className="setup-form-wrapper">
      <h1 className="form-title">Setup Quiz</h1>
      <form className="setup-form">
        <label htmlFor="num_of_questions">Number Of Questions</label>
        <input
          id="num_of_questions"
          type="number"
          name="num_of_questions"
          min="1"
          value={setupForm.num_of_questions}
          onChange={handleChange}
        />
        <label htmlFor="category">Category</label>
        <select id="category" name="category" onChange={handleChange}>
          <option value="sports">sports</option>
          <option value="history">history</option>
          <option value="politics">politics</option>
        </select>
        <label htmlFor="difficulty">Select Difficulty</label>
        <select id="difficulty" name="difficulty" onChange={handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button className="btn-start" type="submit">
          Start
        </button>
      </form>
    </section>
  )
}
export default SetupForm
