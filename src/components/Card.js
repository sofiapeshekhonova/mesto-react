function Card ({card, onCardClick}) {
  
  function handleCardClick() {
    onCardClick(card)
  }  

  return (
    <li className="photo-card" key={card.cardId}>
      <img className="photo-card__picture" src={card.cardImg} alt={card.cardName} onClick={handleCardClick} />
      <div className="photo-card__description">
        <h2 className="photo-card__description-text">{card.cardName}</h2>
        <div className="photo-card__description-likes">
          <button className="photo-card__description-like" aria-label="поставить лайк карточке" type="button" />
          <p className="photo-card__description-like-counter">{card.cardLikes.length}</p>
        </div>
      </div>
      <button className="photo-card__wastebasket links" aria-label="удалить карточку" type="button" />
    </li>
  );
}

export default Card;