import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function Card({card, onCardClick, onClickCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onClickCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-card__description-like ${
    isLiked && "photo-card__description-like_active"
  }`;

  return (
    <li className="photo-card">
      <img
        className="photo-card__picture"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-card__description">
        <h2 className="photo-card__description-text">{card.name}</h2>
        <div className="photo-card__description-likes">
          <button
            className={cardLikeButtonClassName}
            aria-label="поставить лайк карточке"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="photo-card__description-like-counter"> {card.likes.length} </p>
        </div>
      </div>
      {isOwn && (
        <button
          className="photo-card__wastebasket links"
          aria-label="удалить карточку"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
