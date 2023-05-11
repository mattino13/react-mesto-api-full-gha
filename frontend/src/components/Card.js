import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({card, onClick, onLike, onDelete}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => {return item._id === currentUser._id});
  const likeClassName = isLiked ? 'element__heart element__heart_liked' : 'element__heart';

  function handleClick() {
    onClick(card);
  } 

  function handleLike() {
    onLike(card);
  } 

  function handleDeleteClick() {
    onDelete(card);
  }

  return (
    <div className="element">
      {isOwn && <button type="button" aria-label="Удалить" className="element__trash" onClick={handleDeleteClick} />} 

      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__tittle">{card.name}</h2>
        <div>
          <button type="button" aria-label="Оценить" className={likeClassName} onClick={handleLike} />
          <p className="element__counter">{(card.likes.length > 0) && card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;