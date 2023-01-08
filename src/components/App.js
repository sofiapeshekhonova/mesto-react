import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isOpenAvatarPopup, isEditAvatarPopupOpen] = useState(false);
  const [isOpenProfilePopup, isEditProfilePopupOpen] = useState(false);
  const [isOpenPlacePopup, isAddPlacePopupOpen] = useState(false);
  const [isOpenConfimPopup, isAddConfimPopupOpen] = useState(false)
  const [selectedCard, fixSelectedCard] = useState({});
  const [isOpenCardPopup, isOpenCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => { 
        console.log(err);
      })
  }, [])

  function handleUpdateUser(value) {
    setLoading(true)
    api.saveNewUserInfo(value)
    .then((user) => {
      setCurrentUser(user);
    })
    .then(closeAllPopups())
    .catch((err) => { 
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  function handleUpdateAvatar(value) {
    setLoading(true)
    api.saveNewUserAvatar(value)
    .then((user) => {
      setCurrentUser(user);
    })
    .then(closeAllPopups())
    .catch((err) => { 
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  function handleAddCard(value) {
    setLoading(true)
    api.postNewCard(value)
    .then((newCard)=> {
      setCards([newCard, ...cards]);
    })
    .then(closeAllPopups())
    .catch((err) => { 
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.putLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
      .catch((err) => {console.log(err)})
    } else {
      api.deleteLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
      .catch((err) => {console.log(err)})
    }
  }

  function handleCardClick(card) {
    isOpenCardPopupOpen(true)
    fixSelectedCard(card)
  }

  function handleConfimCardDelete(card) {
    isAddConfimPopupOpen(true);
    fixSelectedCard(card);
  }
  
  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then((newCard) => {
      const newCards = cards.filter((c) =>
      c._id === card._id ? "" : newCard
    )
    setCards(newCards);
    })
    .then(closeAllPopups())
    .catch((err) => {console.log(err)})
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
  
  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
        }}
    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        closeAllPopups()
        }}
    
    document.addEventListener("mousedown", handleClosePopups)
    document.addEventListener("keydown", handelEscape);

    return () =>  {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups)
    }
  },[]) 

  function closeAllPopups() {
    isEditProfilePopupOpen(false);
    isAddPlacePopupOpen(false);
    isEditAvatarPopupOpen(false);
    isOpenCardPopupOpen(false);
    isAddConfimPopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} 
        onClickCardDelete={handleConfimCardDelete} onCardLike={handleCardLike}/>
        <Footer />

        <EditProfilePopup isOpen={isOpenProfilePopup} onClose={closeAllPopups} isLoading={isLoading} onUpdateUser={handleUpdateUser}/> 
        <EditAvatarPopup isOpen={isOpenAvatarPopup} onClose={closeAllPopups} isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isOpenPlacePopup} onClose={closeAllPopups} isLoading={isLoading} onAddCard={handleAddCard}/>
        <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>
        <ConfirmPopup isOpen={isOpenConfimPopup} onClose={closeAllPopups} onConfirmDeleteClick={handleCardDelete} card={selectedCard}/>
      
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
