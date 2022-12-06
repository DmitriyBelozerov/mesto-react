import React from "react";
import SingUserForm from "./SingUserForm";


function Register(props) {


    return (
        <SingUserForm
        name={'signUp'}
        btnType={'Зарегистрироваться'}
        title='Регистрация'
        >
      
            <p className="form__question">Уже зарегистрированы? Войти</p>
        </SingUserForm>
    )
}

export default Register;