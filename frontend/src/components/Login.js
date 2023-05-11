import React from 'react';
import useForm from '../hooks/useForm.js';

function Login({onLogin}) {
  const {values, handleChange, setValues} = useForm({email: '', password: ''});

  function handleSubmit(e) {
    e.preventDefault();
  
    if (values.email && values.password) {
      onLogin({
        email: values.email,
        password: values.password
      });
    }
  }
  
  return (
    <div className="popup popup_auth">
      
        <form className="popup__form popup__form_auth" onSubmit={handleSubmit}>
          <h3 className="popup__tittle popup__tittle_auth">Вход</h3>

          <input name= "email" value={values.email} onChange={handleChange}
                className="popup__item popup__item_auth" placeholder="Email" />
          
          <input name="password" value={values.password} type="password" onChange={handleChange}
                className="popup__item popup__item_auth" placeholder="Пароль" />

          <button type="submit" className="popup__button-save popup__button-save_auth">Войти</button>
          
        </form>
      
    </div>
  )
}

export default Login;