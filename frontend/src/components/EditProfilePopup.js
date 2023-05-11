import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';
import useForm from '../hooks/useForm.js';

function EditProfilePopup({ isOpen, isSaving, onClose, onUpdateUser }) {
  
  const {values, handleChange, setValues} = useForm({name: '', job: ''});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(
    () => setValues({name: currentUser.name ?? '', job: currentUser.about ?? ''}), 
    [currentUser, isOpen]
  ); 

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name:  values.name,
      about: values.job,
    });
  }

  return(
    <PopupWithForm
      title="Редактировать профиль" 
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      saveButtonText="Сохранить"
      isSaving={isSaving}>
      
      <input 
        value={values.name} onChange={handleChange}
        id='name' className='popup__item popup__item_input_name' type='text' name='name' 
        minLength='2' maxLength='40' required placeholder='Имя'/>
      <span id='name-error' className='popup__item-normal'></span>

      <input 
        value={values.job} onChange={handleChange}
        id='job' className='popup__item popup__item_input_job' type='text' name='job' 
        minLength='2' maxLength='200' required placeholder='О себе'/>
      <span id='job-error' className='popup__item-normal'></span>
          
    </PopupWithForm>
  )
}

export default EditProfilePopup;