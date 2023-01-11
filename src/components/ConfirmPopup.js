import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onClose, onConfirmDeleteClick}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteClick(card);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonValid={true}
      title={"Вы уверенны?"}
      buttonText={"Да"}
      name="confirm"
    />
  );
}

export default ConfirmPopup;
