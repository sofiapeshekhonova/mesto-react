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

// import PopupWithForm from "./PopupWithForm"
// import {useState, useEffect} from "react";

// function AddPlacePopup (props) {
//   const [name, setName] = useState('');
//   const [link, setLink] = useState('')

//   const [nameDirty, setNameDirty] = useState(false)
//   const [nameError, setNameError] = useState('поле обязательно к заполнению')

//   const [linkDirty, setLinkDirty] = useState(false)
//   const [linkError, setLinkError] = useState('поле обязательно к заполнению')
//   const [formValid, setFormValid] = useState(false)

//   function handleNameChange(e) {
//     setName(e.target.value);
//     if(e.target.value.length < 3 || e.target.value.length > 30) {
//       setNameError('длинна должна быть больше 3 и меньше 30 символов')
//       if(!e.target.value) {
//         setNameError('поле обязательно к заполнению')
//       }
//     } else {
//       setNameError('')
//     }
//   }

//   function handleLinkChange(e) {
//     setLink(e.target.value);
//     var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
//     if(!objRE.test(String(e.target.value).toLowerCase())) {
//       setLinkError('некорректное значение ссылки')
//       if(!e.target.value) {
//         setLinkError('поле обязательно к заполнению')
//       }
//     } else {
//       setLinkError('')
//     }
//   }

//   function handleFormSubmit(evt) {
//     evt.preventDefault();
//     props.onAddCard({
//       name,
//       link,
//     });
//   }

//   function blurHandler(e) {
//     switch (e.target.name) {
//       case 'placeName' :
//       setNameDirty(true)
//       break
//       case 'placeLink' :
//       setLinkDirty(true)
//       break
//     }
//   }

//   useEffect(() => {
//     setName('');
//     setLink('');
//     setNameDirty(false)
//     setLinkDirty(false)

//   }, [props.isOpen]);

//    return (
//     <PopupWithForm  name='place' title={"Новое место"} buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
//     onSubmit={handleFormSubmit} isOpen={props.isOpen} onClose={props.onClose}>
//     <input onBlur={blurHandler} id="place-name-input" value={name} onChange={handleNameChange} type="text" className="form__text form__text_type_place-name" name="placeName" placeholder="Название" />
//     {(nameDirty && nameError) && <span className="form__text-error place-name-input-error">{nameError}</span>}

//     <input onBlur={blurHandler} id="place-link-input" value={link} onChange={handleLinkChange} type="url" className="form__text form__text_type_place-link" name="placeLink" placeholder="Ссылка на картинку"/>
//     {(linkDirty && linkError) && <span className="form__text-error place-link-input-error">{linkError}</span>}
//   </PopupWithForm>
//    )
// }
// export default AddPlacePopup
