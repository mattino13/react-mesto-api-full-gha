import React from 'react';
import imgFail from '../images/popup-fail.svg';
import imgSuccess from '../images/popup-success.svg';
import Popup from './Popup.js';


function InfoTooltip({ isSuccess, isOpen, onClose }) {
  
  return (
    <Popup isOpen={isOpen} name="top" onClose={onClose}>
      <div className="popup__infotooltip">
        <img className="popup__infoimage" src={isSuccess ? imgSuccess : imgFail} alt={isSuccess ? 'Успешно' : 'Ошибка'} />
        <h3 className="popup__tittle popup__tittle_info">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
      </div>
    </Popup>
  )
}

export default InfoTooltip;