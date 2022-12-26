function PopupWithForm(props) {

  return (
    <section onClick={props.onClose} className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}` }>
      <div className="popup__container">
        <button className="popup__close-icon popup__close-icon_type_profile links" aria-label="закрыть" type="button" onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form form_type_${props.name}`} name={props.name} noValidate>
          {props.children}
          <button className="form__save" type="submit" aria-label="сохранить">{props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;