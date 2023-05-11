import React from 'react';

// создаем отдельный компонент `Popup` для обертки любых попапов
function Popup({ isOpen, name, onClose, children }) {
  
  function handleOutClick(evt) {
    if (!evt.target.closest('.popup__overlay')) { 
      onClose();
    }
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keyup', handleEscClose);
      
      return () => {
        document.removeEventListener('keyup', handleEscClose);
      }
    }
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""} popup_${name}`} onClick={handleOutClick} >

      <div className="popup__container popup__overlay">
        
        {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`, 
        хоть для `PopupWithForm` */}
        {children}
        {/* кнопка крестика есть у любого попапа */}
        
        <button
          aria-label="Закрыть"
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
