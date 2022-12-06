import React from "react";
import PopupWithForm from "./PopupWithForm";
import logoOk from "../images/logoAuthOk.svg";

function InfoTooltip(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <PopupWithForm
            isOpen={true}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title={'Вы успешно зарегистрировались!'}
            btnType={props.btnConfirm}
            logo={<img src={logoOk} className='form__logo'/>}
            name={'InfoTooltip'}>
        </PopupWithForm>
    )
}

export default InfoTooltip;