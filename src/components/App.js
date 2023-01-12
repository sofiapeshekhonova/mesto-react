import React, {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isOpenAvatarPopup, setIsEditAvatarPopup] = useState(false);
  const [isOpenProfilePopup, setIsEditProfilePopup] = useState(false);
  const [isOpenPlacePopup, setIsAddPlacePopup] = useState(false);
  const [isOpenConfimPopup, setIsAddConfimPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(value) {
    setIsLoading(true);
    api
      .saveNewUserInfo(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api
      .saveNewUserAvatar(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard(value) {
    setIsLoading(true);
    api
      .postNewCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .putLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardClick(card) {
    setIsOpenCardPopup(true);
    setSelectedCard(card);
  }

  function handleConfimCardDelete(card) {
    setIsAddConfimPopup(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        closeAllPopups();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handelEscape);

    return () => {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatarPopup(false);
    setIsOpenCardPopup(false);
    setIsAddConfimPopup(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onClickCardDelete={handleConfimCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isOpenProfilePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isOpenAvatarPopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isOpenPlacePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddCard={handleAddCard}
        />
        <ImagePopup
          isOpen={isOpenCardPopup}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isOpenConfimPopup}
          onClose={closeAllPopups}
          onConfirmDeleteClick={handleCardDelete}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
