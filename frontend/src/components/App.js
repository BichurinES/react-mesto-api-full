/* 
Прошу прощения за очень неструктуированный и повторяющийся код. 
Делал работу в спешке, не успел провести нормальный рефакторинг.
Заранее спасибо за проверку!
*/

import React from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import * as auth from './Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [infoTooltipContent, setInfoTooltipContent] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});  
  
  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    
    if(localStorage.getItem('token')) {
      auth.checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res.data) {
            handleUpdateEmail(res.data.email);
            handleLogged();
            history.push('/');
          }
        });
    }
    
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);
  

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }
  
  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.chahgeProfile(userData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarData, onSuccess) {
    setIsLoading(true);
    api.changeAvatar(avatarData)
      .then((newData) => {
        setCurrentUser(newData);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateEmail(email) {
    setEmail(email);
  }

  function handleAddPlaceSubmit(cardData, onSuccess) {
    setIsLoading(true);
    api.addNewCard(cardData)
      .then((card) => {
        setCards([card, ...cards]);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateInfoTooltip(data) {
    setInfoTooltipContent(data);
  }

  function handleLogged() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
  }

  function handleDeleteToken() {
    localStorage.removeItem('token');
    setEmail('');
    handleLogout();
    history.push('/sign-in');
  }

  const handleEscDown = React.useCallback((evt) => {
    evt.key === 'Escape' && closeAllPopups();
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    window.addEventListener('keydown', handleEscDown);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    window.addEventListener('keydown', handleEscDown);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    window.addEventListener('keydown', handleEscDown);
  }

  function handleCardDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
    window.addEventListener('keydown', handleEscDown);
  }

  function handleInfoTooltipShow() {
    setIsInfoTooltipPopupOpen(true);
    window.addEventListener('keydown', handleEscDown);
  }

  function handleCardClick({link, name}) {
    setSelectedCard({
      link: link,
      name: name
    });
    window.addEventListener('keydown', handleEscDown);
  }

  function handleClickMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsLoading(false);
    setIsInfoTooltipPopupOpen(false);
    window.removeEventListener('keydown', handleEscDown);
    setSelectedCard({});
    setCardToDelete({});
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={ currentUser }>
        
        <Switch>
          <Route path="/sign-in">
            <Header>
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Header>
            <Login handleInfoTooltipShow={handleInfoTooltipShow} handleUpdateInfoTooltip={handleUpdateInfoTooltip} handleUpdateEmail={handleUpdateEmail} handleLogged={handleLogged} />
          </Route>
          <Route path="/sign-up">
            <Header>
              <Link className="header__link" to="/sign-in">Войти</Link>
            </Header>
            <Register handleInfoTooltipShow={handleInfoTooltipShow} handleUpdateInfoTooltip={handleUpdateInfoTooltip} handleUpdateEmail={handleUpdateEmail} handleLogged={handleLogged} />
          </Route>
          <ProtectedRoute path="/" isLogged={isLogged}>
            <Header>
              <div className={`header__container ${isOpenMenu ? 'header__container_active' : ''}`}>
                <p className="header__login">{email}</p>
                <button className="header__logout-button" onClick={handleDeleteToken}>Выйти</button>
              </div>
              <button className={`header__menu-button ${isOpenMenu ? 'header__menu-button_active' : ''} `}onClick={handleClickMenu}></button>
            </Header>
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
            />
          </ProtectedRoute>
        </Switch>
        
        <Footer />

        <section className="popups">
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} isLoading={isLoading} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} isLoading={isLoading} onAddPlace={handleAddPlaceSubmit}/>
          <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} isLoading={isLoading} card={cardToDelete} onClose={closeAllPopups} onDeleteCard={handleCardDelete}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} infoTooltipContent={infoTooltipContent} />
        </section>
      </CurrentUserContext.Provider>
  </div>
  );
}

export default App;
