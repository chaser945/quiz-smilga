import SetupForm from "./components/SetupForm"
import { useGlobalContext } from "./context"
import Loading from "./components/Loading"
import Modal from "./components/Modal"

const App = () => {
  const {
    waiting,
    loading,
    fetchedData: questions,
    correctAnsNum,
    questionIndex,
    nextQuestion,
    checkAns,
  } = useGlobalContext()
  // console.log(questions[questionIndex])

  if (waiting) {
    return <SetupForm />
  }

  if (loading) {
    return <Loading />
  }

  const { question, correct_answer, incorrect_answers } =
    questions[questionIndex]

  // const answersArr = [...incorrect_answers, correct_answer]

  const answersArr = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answersArr.push(correct_answer)
  } else {
    answersArr.push(answersArr[tempIndex])
    answersArr[tempIndex] = correct_answer
  }

  return (
    <section className="app">
      <article className="question-article">
        <p className="correct-ans">
          Correct Answers: {correctAnsNum}/{questionIndex + 1}
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
                onClick={() => checkAns(ans === correct_answer)}
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            )
          })}
        </div>
        <button className=" btn next-question" onClick={nextQuestion}>
          Next Question
        </button>
      </article>
      <Modal />
    </section>
  )
}
export default App
