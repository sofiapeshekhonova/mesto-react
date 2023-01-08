import PopupWithForm from "./PopupWithForm"
import {useState, useEffect} from "react";
function AddPlacePopup (props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('')

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('')
  }, [props.isOpen]);


   return (
    <PopupWithForm name='place' title={"Новое место"} buttonText={props.isLoading ? `Сохранение...` : `Сохранить`} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
    <input id="place-name-input" value={name} onChange={handleNameChange} type="text" className="form__text form__text_type_place-name" name="placeName" placeholder="Название"  required minLength="2" maxLength="30" />
    <span className="form__text-error place-name-input-error"></span>
    <input id="place-link-input" value={link} onChange={handleLinkChange} type="url" className="form__text form__text_type_place-link" name="placeLink" placeholder="Ссылка на картинку" required />
    <span className="form__text-error place-link-input-error"></span>
  </PopupWithForm>
   )
}
export default AddPlacePopup