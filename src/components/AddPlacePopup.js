import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [isValidInputName, setIsValidInputName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isValidInputLink, setIsInputLinkValid] = useState(true);
  const [linkErrorMessage, setLinkErrorMessage] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameErrorMessage("");
      setIsValidInputName(true);
    } else {
      setNameErrorMessage(e.target.validationMessage);
      setIsValidInputName(false);
    }
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    if (e.target.validity.valid) {
      setLinkErrorMessage("");
      setIsInputLinkValid(true);
    } else {
      setLinkErrorMessage(e.target.validationMessage);
      setIsInputLinkValid(false);
    }
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
    setNameErrorMessage("");
    setLinkErrorMessage("");
    setIsValidInputName(false);
    setIsInputLinkValid(false);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      disabled={!isValidInputLink || !isValidInputName}
      name="place"
      title={"Новое место"}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleFormSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id="place-name-input"
        value={name}
        onChange={handleNameChange}
        type="text"
        className="form__text form__text_type_place-name"
        name="placeName"
        placeholder="Название"
        required
        minLength="2"
        maxLength="40"
      />
      <span className={isValidInputName ? "form__text-error" : "form__text-error_active"}>{nameErrorMessage}</span>
      <input
        id="place-link-input"
        value={link}
        onChange={handleLinkChange}
        type="url"
        className="form__text form__text_type_place-link"
        name="placeLink"
        placeholder="Ссылка на картинку"
        required
        minLength="2"
      />
      <span className={ isValidInputLink ? "form__text-error" : "form__text-error_active"}> {linkErrorMessage} </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;