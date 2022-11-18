import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title={'Редактировать профиль'}
        children={<>
          <input id="name" className="form__input form__input_type_name" type="text" name="inputName"
            placeholder="Имя" minLength="2" maxLength="40" required />
          <span id="error-name" className="form__error-message form__error-message_hiden"></span>
          <input id="profession" className="form__input form__input_type_about" type="text" name="inputAbout"
            placeholder="Профессия" minLength="2" maxLength="200" required />
          <span id="error-profession" className="form__error-message form__error-message_hiden"></span>
        </>}
        btnType={'Сохранить'}
        name={'change-profile'}
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title={'Новое место'}
        children={<>
          <input id="photo-name" className="form__input form__input_add_photo" type="text" name="inputPhotoName"
            placeholder="Название" minLength="2" maxLength="30" required />
          <span id="error-photo-name" className="form__error-message form__error-message_hiden"></span>
          <input id="photo-url" className="form__input form__input_add_url" type="url" name="inputPhotoUrl"
            placeholder="Ссылка" required />
          <span id="error-photo-url" className="form__error-message form__error-message_hiden"></span>
        </>}
        btnType={'Создать'}
        name={'add-place'}
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title={'Обновить аватар'}
        children={<>
          <input id="avatar-url" className="form__input form__input_submit-avatar" type="url" name="avatar"
            placeholder="Ссылка" required />
          <span id="error-avatar-url" className="form__error-message form__error-message_hiden"></span>
        </>}
        btnType={'Сохранить'}
        name={'submit-avatar'}
      />

      <ImagePopup
        isOpen={selectedCard}
        onClose={closeAllPopups}
        name={'view-image'}
      />

    </div >
  );
}

export default App;
