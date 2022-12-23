import React from 'react';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";
import { api } from './utils/Api';

function App() {
  const [isOpenAvatarPopup, isEditAvatarPopupOpen] = React.useState(false);
  const [isOpenProfilePopup, isEditProfilePopupOpen] = React.useState(false);
  const [isOpenPlacePopup, isAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, fixSelectedCard] = React.useState({});
  const [isOpenCardPopup, isOpenCardPopupOpen] = React.useState(false);

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfos(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about)
        setUserAvatar(user.avatar);
        setCards(cards.map((card) => ({
          cardId: card._id,
          cardName: card.name,
          cardImg: card.link,
          cardLikes: card.likes
        })));
      })
      .catch((err) => { 
        console.log(err);
      })
  }, [])

  // React.useEffect(() => {
  //   function handleClosePopup (evt) {
  //     if (evt.button === 0) {
  //       if (
  //         evt.target.classList.contains("popup_opened") ||
  //         evt.target.classList.contains("popup__close-icon")
  //       ) {
  //         closeAllPopups();
  //       }
  //     }
  //   }
  //     document.addEventListener("mousedown", handleClosePopup)
  //     return () => {
  //       document.removeEventListener('keydown', handleClosePopup);
  //     }
  //   })

     // _handleEscClose = (evt) => {
    //   if (evt.key === "Escape") {
    //     this.close();
    //   }
    // };

  function handleCardClick(card) {
    isOpenCardPopupOpen(true)
    fixSelectedCard(card)
  }

  function handleEditAvatarClick () {
    isEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick () {
    isEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick () {
    isAddPlacePopupOpen(true)
  }

  function closeAllPopups (evt) {
    if (evt.button === 0 ) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        isEditProfilePopupOpen(false);
        isAddPlacePopupOpen(false);
        isEditAvatarPopupOpen(false);
        isOpenCardPopupOpen(false)
      }
    }
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} userAvatar={userAvatar}
              userName={userName} userDescription={userDescription} cards={cards} />
        <Footer />

        <PopupWithForm name='profile' title={"Редактировать профиль"} buttonText={"Сохранить"} isOpen={isOpenProfilePopup} onClose={closeAllPopups}>
          <input id="name-input" type="text" className="form__text form__text_type_name" defaultValue="Введите имя" name="Name" placeholder="введите имя" required minLength="2" maxLength="40" />
          <span className="form__text-error name-input-error"></span>
          <input id="job-input" type="text" className="form__text form__text_type_job" defaultValue="Работа" name="Job" placeholder="введите работу" required minLength="2" maxLength="200" />
          <span className="form__text-error job-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"} isOpen={isOpenAvatarPopup} onClose={closeAllPopups}>
          <input id="avatar-input" type="url" className="form__text form__text_type_avatar" name="avatar" placeholder="Ссылка на картинку" required />
          <span className="form__text-error avatar-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name='place' title={"Новое место"} buttonText={"Сохранить"} isOpen={isOpenPlacePopup} onClose={closeAllPopups}>
          <input id="place-name-input" type="text" className="form__text form__text_type_place-name" name="placeName" placeholder="Название"  required minLength="2" maxLength="30" />
          <span className="form__text-error place-name-input-error"></span>
          <input id="place-link-input" type="url" className="form__text form__text_type_place-link" name="placeLink" placeholder="Ссылка на картинку" required />
          <span className="form__text-error place-link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name='confirm' title={"Вы уверенны?"} buttonText={"Да"}></PopupWithForm>
        <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </>
  );
}

export default App;
