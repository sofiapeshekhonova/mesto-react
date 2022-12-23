import React from "react";
import Card from "./Card";
// import profilePhoto from "../images/photo.jpg";

function Main(props) {

  return (
    <>
    <main className="content">
      <section className="intro">
        <div className="profile">
          <div className="profile__picture">
            <button onClick={props.onEditAvatar} className="profile__picture-button" type="button"></button>
            <img className="profile__picture-avatar" src={props.userAvatar} alt="фото профиля" />
          </div>
          <div className="profile__information">
            <h1 className="profile__information-name">{props.userName}</h1>
            <button onClick={props.onEditProfile} className="profile__information-button links" type="button" aria-label="редактировать профиль" ></button>
            <p className="profile__information-job">{props.userDescription}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} className="intro__button links" type="button" aria-label="добавить карточку с картикой" ></button>
      </section>
      <section className="photo-cards-container" aria-label="карточки с фотографиями" >
        <div className="photo-cards">
        {props.cards.map((card) => (<Card key={card.cardId} card = {card} onCardClick={props.onCardClick}/>))}
        </div>
      </section>
    </main>
    </>
  );
}

export default Main;
