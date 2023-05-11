import React from 'react';
import Popup from './Popup.js';

function ImagePopup({card, onClose}) {

  return (
    <Popup isOpen={card === null ? false : true} name="image" onClose={onClose}>
      <div className="popup__block">
        <img className="popup__image" src={card?.link} alt={card?.name}/>
        <p className="popup__subtitle">{card?.name}</p>
      </div>
    </Popup>
  )
}

export default ImagePopup;