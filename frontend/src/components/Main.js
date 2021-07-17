import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile page__profile">
        <button 
          className="profile__avatar" 
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" name="edit-button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button 
          type="button"
          name="add-button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="places page__places">
        <ul className="places__list">
        {props.cards.map((card) => (
          <Card card={card} key={card._id} 
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike}
            onCardDeleteClick={props.onCardDeleteClick} 
          />
        ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;