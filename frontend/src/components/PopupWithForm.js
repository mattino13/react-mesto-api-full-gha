import React from 'react';
import Popup from './Popup.js';

function PopupWithForm({ title, name, children, isOpen, isSaving, saveButtonText, onClose, onSubmit}) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit} >
        <h3 className="popup__tittle">{title}</h3>

        {children}

        <button type="submit" className={`popup__button-save popup__button-save_${name}`}>{isSaving ? 'Сохранение...' : saveButtonText}</button>
        
      </form>
    </Popup>
  )
}

export default PopupWithForm;