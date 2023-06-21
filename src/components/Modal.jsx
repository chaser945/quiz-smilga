import { useGlobalContext } from "../context"

const Modal = () => {
  const { modal, setModal, correctAnsNum, fetchedData, questionIndex } =
    useGlobalContext()
  const handleClick = () => {
    setModal("close_modal")
  }
  return (
    <section className={`modal-overlay ${modal && "active"}`}>
      <div className="modal-wrapper">
        <h1 className="modal-title">Congrats!</h1>
        <p className="modal-text">
          You answered {((correctAnsNum / fetchedData.length) * 100).toFixed(0)}
          % questions successfully.
        </p>
        <button className="btn-play-again" onClick={handleClick}>
          Play Again
        </button>
      </div>
    </section>
  )
}
export default Modal
