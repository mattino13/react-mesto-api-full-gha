import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import auth from '../utils/auth.js';

import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import ProtectedContent from './ProtectedContent.js';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const location = useLocation();

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setcurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  
  const [isSaving, setIsSaving] = React.useState(false);

  const navigate = useNavigate();
  
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(
        ([userResponse, cardsResponse]) =>
          {
            setcurrentUser(userResponse);
            setCards(cardsResponse);
          })
      .catch((err) => console.log(err)); 

    checkToken();
  }, []); 

  function checkToken() {
    const token = localStorage.getItem('token');
    
    if (token) {
      auth.checkToken(token)
        .then((result) => {
          setEmail(result.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      )
      .catch((err) => console.log(err));
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    
    setSelectedCard(null);
  }

  function closeInfoTooltip() {
    closeAllPopups();
    
    if (isInfoTooltipSuccess) {
      if (location.pathname === '/sign-in') {
        navigate('/', {replace: true});
      }

      if (location.pathname === '/sign-up') {
        navigate('/sign-in', {replace: true});
      }
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map((item) => {return item._id === card._id ? newCard : item}));
      })
      .catch((err) => console.log(err));
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => {return item._id !== card._id}));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({name, about}) {
    setIsSaving(true);

    api.setUserInfo(name, about)
      .then((result) => {
        setcurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleUpdateAvatar({avatar}) {
    setIsSaving(true);

    api.setUserAvatar(avatar)
      .then((result) => {
          setcurrentUser(result);
          closeAllPopups();
        }
      )
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleAddPlace(newCard) {
    setIsSaving(true);

    api.createCard(newCard.place, newCard.link)
      .then((result) => {
          setCards([result, ...cards]);
          closeAllPopups();
        }
      )
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleRegister({ email, password }) {
    auth.signup(email, password)
      .then(() => setIsInfoTooltipSuccess(true))
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipSuccess(false)})
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin({ email, password }) {
    auth.signin(email, password)
      .then((result) => {
          localStorage.setItem('token', result.token);
          setLoggedIn(true);
          setEmail(email);
          setIsInfoTooltipSuccess(true);
        }
      )
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipSuccess(false)})
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', {replace: true});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} loggedIn={loggedIn} onSignOut={handleLogout}/>

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              onEditAvatar={() => {setIsEditAvatarPopupOpen(true)}}
              onEditProfile={() => {setIsEditProfilePopupOpen(true)}}
              onAddPlace={() => {setIsAddPlacePopupOpen(true)}}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              element={ProtectedContent}
            />
                
            } 
          />
          
          <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
          <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
        </Routes>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} isSaving={isSaving} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isSaving={isSaving} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isSaving={isSaving} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isInfoTooltipSuccess} onClose={closeInfoTooltip} />

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
