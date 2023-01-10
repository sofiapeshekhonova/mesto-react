import PopupWithForm from "./PopupWithForm";
import {useEffect, useState, useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [isValidInputName, setIsValidInputName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isValidInputDescription, setIsInputDescriptionValid] = useState(true);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [buttonValid, setbuttonValid] = useState(false);

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

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.validity.valid) {
      setDescriptionErrorMessage("");
      setIsInputDescriptionValid(true);
    } else {
      setDescriptionErrorMessage(e.target.validationMessage);
      setIsInputDescriptionValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setNameErrorMessage("");
    setDescriptionErrorMessage("");
    setIsValidInputName(true);
    setIsInputDescriptionValid(true);
    setbuttonValid(true);
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm disabled={(nameErrorMessage === '' && descriptionErrorMessage === '') ? false : true} 
      buttonValid={buttonValid && !nameErrorMessage && !descriptionErrorMessage}
       name='profile' title={"Редактировать профиль"} buttonText={props.isLoading ? `Сохранение...` : `Сохранить`} isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
      <input id="name-input" value={name} onChange={handleNameChange} type="text" className="form__text form__text_type_name" name="name" 
        placeholder="введите имя" required minLength="2" maxLength="40" />
      <span className={isValidInputName ? "form__text-error" : "form__text-error_active"}>{nameErrorMessage}</span>
      <input id="job-input" value={description}  onChange={handleDescriptionChange} type="text" className="form__text form__text_type_job"  name="description" 
        placeholder="введите работу" required minLength="4" maxLength="200" />
      <span className={isValidInputDescription ? "form__text-error" : "form__text-error_active"}>{descriptionErrorMessage}</span>
  </PopupWithForm>
  );
}

export default EditProfilePopup