import PopupWithForm from "./PopupWithForm";
import {useEffect, useState, useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
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
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm name='profile' title={"Редактировать профиль"} buttonText={props.isLoading ? `Сохранение...` : `Сохранить`} isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
      <input id="name-input" value={name} onChange={handleNameChange} type="text" className="form__text form__text_type_name" name="name" 
      placeholder="введите имя" required minLength="2" maxLength="40" />
      <span className="form__text-error name-input-error"></span>
      <input id="job-input" value={description}  onChange={handleDescriptionChange} type="text" className="form__text form__text_type_job"  name="description" 
      placeholder="введите работу" required minLength="2" maxLength="200" />
      <span className="form__text-error job-input-error"></span>
  </PopupWithForm>
  );
}

export default EditProfilePopup