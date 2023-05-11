import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import logo from '../images/header-logo.svg';

function Header({email, loggedIn, onSignOut}) {
  function handleClick() {
    if (currentLocation === '/sign-up') {
      navigate('/sign-in')
    } else {
      navigate('/sign-up')
    }

  }
  
  const currentLocation = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место"/>
      {!loggedIn && <div className="header__login" onClick={handleClick}>{ currentLocation === '/sign-up' ? 'Войти' : 'Регистрация' }</div>}
      {loggedIn && <div className="header__login"> 
        <p className="header__login_email">{email}</p>
        <p onClick={onSignOut}>Выйти</p>
      </div>}
    </header>
  )
}

export default Header;