import React from "react";
import api from '../utils/Api';
import Card from "./Card";
import { TranslationContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const currentUser = React.useContext(TranslationContext);


    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getCards()
            .then(data => {
                setCards(data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <section className="profile">
                <button className="profile__btn-sbmt-photo" type="button" aria-label="avatar" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" aria-label="edit_profile" onClick={onEditProfile}></button>
                    <p className="profile__about-name">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="add_profile" onClick={onAddPlace}></button>
            </section>

            <section className="galary">
                <ul className="cards">
                    {cards.map(item => (
                        <Card card={item} key={item._id} onCardClick={onCardClick} />
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Main;