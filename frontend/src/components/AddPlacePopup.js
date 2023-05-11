import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useForm from '../hooks/useForm.js';

function AddPlacePopup({isOpen, isSaving, onClose, onAddPlace}) {
  
  const {values, handleChange, setValues} = useForm({place: '', link: ''});

  React.useEffect(
    () => setValues({place: '', link: ''}), 
    [isOpen]
  ); 
  
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      place: values.place,
      link:  values.link
    });
  }

  return(
    <PopupWithForm
          title="Новое место" 
          name="place"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          saveButtonText="Сохранить"
          isSaving={isSaving}>
        
          <input value={values.place} onChange={handleChange} id="place" 
                className="popup__item popup__item_input_place" type="text" name="place" 
                minLength="2" maxLength="30" required placeholder="Название"/>
          <span id="place-error" className="popup__item-normal"></span>

          <input value={values.link} onChange={handleChange} id="link" 
                className="popup__item popup__item_input_link" type="url" name="link" 
                minLength="2" required placeholder="Ссылка на картинку"/>
          <span id="link-error" className="popup__item-normal"></span>
          
    </PopupWithForm>
  )
}

export default AddPlacePopup;