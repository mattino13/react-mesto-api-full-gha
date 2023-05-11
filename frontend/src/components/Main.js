import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-icon">
            <img className="profile__avatar" alt="Фото" onClick={onEditAvatar} src={currentUser.avatar} />
          </div>
          <div className="profile__info">
            <h1 className="profile__tittle">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card 
            key={item._id} 
            card={{ ...item, myId: currentUser._id }} 
            onClick={onCardClick} 
            onLike={onCardLike} 
            onDelete={onCardDelete} 
          />
        ))}
      </section>
    </main>
  )
}

export default Main;