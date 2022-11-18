import React from "react";
import api from '../utils/Api';
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfile()
            .then(data => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch(err => console.log(err))
    }, [])

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
                    <img src={userAvatar} alt="аватар пользователя" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit" type="button" aria-label="edit_profile" onClick={onEditProfile}></button>
                    <p className="profile__about-name">{userDescription}</p>
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