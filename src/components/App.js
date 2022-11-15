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
      />

      <ImagePopup
        isOpen={selectedCard}
        onClose={closeAllPopups}
      />

      {/* <div className="popup popup_edit_profile">
        <div className="form form_edit_profile">
          <button className="popup__close form__close form__close_profile" type="button" aria-label="close"></button>
          <h3 className="form__title">Редактировать профиль</h3>
          <form className="form__sending form__sending_profile" action="#" noValidate>
            <input id="name" className="form__input form__input_type_name" type="text" name="inputName"
              placeholder="Имя" minLength="2" maxLength="40" required />
            <span id="error-name" className="form__error-message form__error-message_hiden"></span>
            <input id="profession" className="form__input form__input_type_about" type="text" name="inputAbout"
              placeholder="Профессия" minLength="2" maxLength="200" required />
            <span id="error-profession" className="form__error-message form__error-message_hiden"></span>
            <button className="form__submit form__submit_profile form__submit_type_disabled" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_add_photo">
        <div className="form form_add_photo">
          <button className="popup__close form__close form__close_add-photo" type="button" aria-label="close"></button>
          <h3 className="form__title">Новое место</h3>
          <form className="form__sending form__sending_foto_add" action="#" noValidate>
            <input id="photo-name" className="form__input form__input_add_photo" type="text" name="inputPhotoName"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span id="error-photo-name" className="form__error-message form__error-message_hiden"></span>
            <input id="photo-url" className="form__input form__input_add_url" type="url" name="inputPhotoUrl"
              placeholder="Ссылка" required />
            <span id="error-photo-url" className="form__error-message form__error-message_hiden"></span>
            <button className="form__submit form__submit_foto form__submit_type_disabled" type="submit">
              Создать
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_submit-avatar">
        <div className="form form_submit-avatar">
          <button className="popup__close form__close form__close_submit-avatar" type="button" aria-label="close"></button>
          <h3 className="form__title">Обновить аватар</h3>
          <form className="form__sending form__sending_submit-avatar" action="#" noValidate>
            <input id="avatar-url" className="form__input form__input_submit-avatar" type="url" name="avatar"
              placeholder="Ссылка" required />
            <span id="error-avatar-url" className="form__error-message form__error-message_hiden"></span>
            <button className="form__submit form__submit_avatar form__submit_type_disabled" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_confirmation-delete">
        <div className="form form_confirmation-delete">
          <button className="popup__close form__close form__close_confirmation-delete" type="button" aria-label="close"></button>
          <h3 className="form__title form__title_confirmation-delete">Вы уверенны?</h3>
          <form className="form__sending form__sending_confirmation-delete" action="#" noValidate>
            <button className="form__submit form__submit_confirmation-delete" type="submit">
              да
            </button>
          </form>
        </div>
      </div> */}

      {/* 
      <div className="popup  popup_view_photo">
        <div className="container-view-photo">
          <button className="popup__close  container-view-photo__button-close" type="button" aria-label="close"></button>
          <img src="#" alt="полноэкранное фото" className="container-view-photo__photo" />
          <h3 className="container-view-photo__title">Место</h3>
        </div>
      </div> */}

      {/* <div className="popup popup_confirmation-delete">
        <div className="form form_confirmation-delete">
          <button className="popup__close form__close form__close_confirmation-delete" type="button" aria-label="close"></button>
          <h3 className="form__title form__title_confirmation-delete">Вы уверенны?</h3>
          <form className="form__sending form__sending_confirmation-delete" action="#" noValidate>
            <button className="form__submit form__submit_confirmation-delete" type="submit">
              да
            </button>
          </form>
        </div>
      </div> */}


      {/* 
      <template id="card">
        <li className="card ">
          <img alt="фото" className="card__photo" src="#" />
          <h2 className="card__title ">Место</h2>
          <div className="card__like-section">
            <button className="card__like " type="button" aria-label="like"></button>
            <span className="card__like-users"></span>
          </div>
          <button className="card__delete " type="button" aria-label="delete"></button>
        </li>
      </template> 
      */}

    </div >
  );
}

export default App;
