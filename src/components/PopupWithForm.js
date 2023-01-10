function PopupWithForm({ disabled,isValid, buttonValid, name, isOpen, title, onClose, buttonText, onSubmit, children}) {

  return (
    <section className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}` }>
      <div className="popup__container">
        <button className="popup__close-icon popup__close-icon_type_profile links" aria-label="закрыть" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className={`form form_type_${name}`} name={name} noValidate>
          {children}
          <button disabled={disabled} className={buttonValid ? "form__save" : "form__save form__save_inactive"}
          // <button className={isValid ? "form__save" : "form__save form__save_inactive"
            type="submit" aria-label="сохранить">{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;