import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, isSaving, onClose, onUpdateAvatar}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const linkRef = React.useRef();

  React.useEffect(() => {
    linkRef.current.value = currentUser.avatar;
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: linkRef.current.value
    });
  } 
  
  return(
    <PopupWithForm
          title="Обновить аватар" 
          name="avatar"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          saveButtonText="Сохранить"
          isSaving={isSaving}>
          
          <input ref={linkRef} id="avatar-link" className="popup__item popup__item_input_avatar" type="url" name="link" 
                minLength="2" required placeholder="Ссылка на картинку"/>
          <span id="avatar-link-error" className="popup__item-normal"></span>
          
        </PopupWithForm>

  )
}

export default EditAvatarPopup;