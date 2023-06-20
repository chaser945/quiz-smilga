import SetupForm from "./components/SetupForm"
import { useGlobalContext } from "./context"
import Loading from "./components/Loading"

const App = () => {
  const {
    waiting,
    loading,
    fetchedData: questions,
    correctAnsNum,
    questionIndex,
    nextQuestion,
  } = useGlobalContext()
  console.log(questions[questionIndex])

  if (waiting) {
    return <SetupForm />
  }

  if (loading) {
    return <Loading />
  }

  const { question, correct_answer, incorrect_answers } =
    questions[questionIndex]

  const answersArr = [...incorrect_answers, correct_answer]

  return (
    <section className="app">
      <article className="question-article">
        <p className="correct-ans">
          Correct Answers: {correctAnsNum}/{questionIndex}
        </p>
        <h2
          className="question-title"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <div className="btn-ans-wrapper">
          {answersArr.map((ans, index) => {
            return (
              <button
                key={index}
                className="btn btn-ans"
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            )
          })}
        </div>
        <button className=" btn next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </article>
    </section>
  )
}
export default App
