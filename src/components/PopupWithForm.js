function PopupWithForm(props) {
    return (
        <div className={`popup  ${props.isOpen && 'popup_opened'}`}>

            <div className={`form form_type_${props.name}`}>
                <button className="popup__close" type="button" aria-label="close" onClick={props.onClose}></button>
                <h3 className="form__title">{props.title}</h3>
                <form className="form__sending" action="#" name={`${props.name}`} noValidate>
                    {props.children}
                    <button className="form__submit form__submit_type_disabled" type="submit">
                        {props.btnType}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;