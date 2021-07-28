import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLike = card.likes.some(id => id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDeleteClick(card);
  }

  return (
    <li className="place">
      <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
      <div className="place__footer">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button type="button" name="like-button" className={`place__like-button ${isLike && 'place__like-button_active'}`} onClick={handleCardLike}></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" name="trash-button" className="place__trash-button" onClick={handleCardDelete}></button>}
    </li>
  )
}

export default Card;