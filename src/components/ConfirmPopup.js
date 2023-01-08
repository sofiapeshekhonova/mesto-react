
import PopupWithForm from "./PopupWithForm"

function ConfirmPopup ({card, isOpen, onClose, onConfirmDeleteClick}) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteClick(card)
  }

    return (
      <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose}
      title={"Вы уверенны?"} buttonText={"Да"} name='confirm'/>
    )
}

export default ConfirmPopup