import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import api from '../utils/Api';
import { TranslationContext, TranslationLogIn } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import logoOk from "../images/logoAuthOk.svg";
import logoErr from "../images/logoAuthErr.svg";




function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopup, setIsConfirmDeletePopup] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [isInfoTooltipTitle, setIsInfoTooltipTitle] = React.useState(null);
  const [isInfoTooltipLogo, setIsInfoTooltipLogo] = React.useState(null);
  const [itemDelete, setItemDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [btnConfirm, isButtonConfirm] = React.useState('Да');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);
  const history = useHistory();


  React.useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {

    api.getProfileInfo()
      .then((data) => {
        setLoggedIn(true);
        setUserEmail(data.data.email);
        history.push('/');
      })
      .catch(err => console.log(err));

  }, [history])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete() {
    isButtonConfirm('Удаляем...');
    api.deleteCard(itemDelete._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== itemDelete._id))
      }
      )
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        isButtonConfirm('Да');
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleConfirmDeletePopup(card) {
    setItemDelete(card);
    setIsConfirmDeletePopup(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopup(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  }

  function handleEscPopupClose(evt) {
    const keyNmbrEsc = Number(27);
    if (evt.keyCode === keyNmbrEsc) {
      closeAllPopups()
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about)
      .then(data => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(link) {
    api.submitAvatar(link)
      .then(data => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({ title, link }) {
    api.createNewCard(title, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }


  function handleLogIn(email, password) {
    api.logIn(email, password)
      .then((data) => {
        setLoggedIn(true);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      })
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        setIsInfoTooltip(true);
        setIsInfoTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipLogo(logoErr);
      })
  }

  function register(email, password) {
    api.register(email, password)
      .then(() => {
        history.push('/sign-in');
        setIsInfoTooltip(true);
        setIsInfoTooltipTitle('Вы успешно зарегистрировались!');
        setIsInfoTooltipLogo(logoOk);
      })
      .catch(err => console.log(err))
  }


  function handleOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  return (
    <TranslationContext.Provider value={currentUser}>
      <TranslationLogIn.Provider value={loggedIn}>
        <div onKeyDown={handleEscPopupClose}>
          <Header
            onOut={handleOut}
            email={userEmail}
          >
          </Header>

          <Switch>

            <Route path='/sign-up'>
              <Register
                onSubmit={register}
              ></Register>
            </Route>

            <Route path='/sign-in'>
              <Login onSubmit={handleLogIn}></Login>
            </Route>

            <ProtectedRoute exact path='/'
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeletePopup}
              component={Main}
            />

            <Route exact path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>

          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPhotoCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            isOpen={selectedCard}
            onClose={closeAllPopups}
            name={'view-image'}>
          </ImagePopup>

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopup}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            btnConfirm={btnConfirm}
          >
          </ConfirmDeletePopup>

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            title={isInfoTooltipTitle}
            logo={isInfoTooltipLogo}
          />

          <Footer />
        </div >
      </TranslationLogIn.Provider>
    </TranslationContext.Provider>
  );
}

export default App;
