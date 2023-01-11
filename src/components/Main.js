import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="intro">
        <div className="profile">
          <div className="profile__picture">
            <button
              onClick={props.onEditAvatar}
              className="profile__picture-button"
              type="button"
            />
            <img
              className="profile__picture-avatar"
              src={currentUser.avatar}
              alt="фото профиля"
            />
          </div>
          <div className="profile__information">
            <h1 className="profile__information-name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__information-button links"
              type="button"
              aria-label="редактировать профиль"
            />
            <p className="profile__information-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="intro__button links"
          type="button"
          aria-label="добавить карточку с картикой"
        />
      </section>
      <section className="photo-cards-container" aria-label="карточки с фотографиями">
        <div className="photo-cards">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onClickCardDelete={props.onClickCardDelete}
              onConfirmClick={props.onConfirmClick}
              onCardLike={props.onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
