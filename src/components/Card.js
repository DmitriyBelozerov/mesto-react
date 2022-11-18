function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="card">
            <img alt="фото" className="card__photo" src={card.link} onClick={handleClick} />
            <h2 className="card__title">{card.name}</h2>
            <div className="card__like-section">
                <button className="card__like " type="button" aria-label="like"></button>
                <span className="card__like-users">{card.likes.length}</span>
            </div>
            <button className="card__delete " type="button" aria-label="delete"></button>
        </li>
    )
}

export default Card;