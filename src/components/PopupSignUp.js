import React from "react";
import SingUserForm from "./SingUserForm";


function PopupSignUp(props) {
    return (
        <SingUserForm
        name={'signUp'}
        btnType={'Зарегистрироваться'}
        title='Регистрация'
        >
            <p>Уже зарегистрированы? Войти</p>
        </SingUserForm>
    )
}

export default PopupSignUp;