import PopupWithForm from "./PopupWithForm"
import {useEffect, useRef} from "react";
function EditAvatarPopup (props) {

  const inputRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  } 
  useEffect(() => {
    inputRef.current.value='';
  }, [props.isOpen]);
  
  return (
    <PopupWithForm name='avatar' title={"Обновить аватар"} buttonText={props.isLoading ? `Сохранение...` : `Сохранить`} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
    <input id="avatar-input" ref={inputRef} type="url" className="form__text form__text_type_avatar" name="avatar" placeholder="Ссылка на картинку" required />
    <span className="form__text-error avatar-input-error"></span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup