import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";

function EditAvatarPopup(props) {
  const inputRef = useRef("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onChange(e) {
    if (e.target.validity.valid) {
      setErrorMessage("");
      setIsValidInput(true);
    } else {
      setErrorMessage(e.target.validationMessage);
      setIsValidInput(false);
    }
  }

  useEffect(() => {
    setIsValidInput(false);
    setErrorMessage("");
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar:
        inputRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      disabled={!isValidInput}
      name="avatar"
      title={"Обновить аватар"}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id="avatar-input"
        ref={inputRef}
        type="url"
        className="form__text form__text_type_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={onChange}
      />
      <span className={ isValidInput ? "form__text-error" : "form__text-error_active"}>{errorMessage}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
