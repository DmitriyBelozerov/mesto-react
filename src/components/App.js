import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import api from '../utils/Api';
import { TranslationContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopup, setIsConfirmDeletePopup] = React.useState(false);
  const [itemDelete, setItemDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [btnConfirm, isButtonConfirm] = React.useState('Да');

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

  return (
    <TranslationContext.Provider value={currentUser}>
      <div onKeyDown={handleEscPopupClose}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDeletePopup}
        />
        <Footer />
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

      </div >
    </TranslationContext.Provider>
  );
}

export default App;
