import React from "react";

function SingUserForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className={`popup popup_opened`}>
            <div className={`form form_type_sign`}>
                <h3 className="form__title">{props.title}</h3>
                <form className="form__sending" action="#" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>

                    <input id="name" className="form__input form__input_type_sign" type="text" value={email || ''} onChange={handleChangeEmail}
                        name="inputName" placeholder="Email" minLength="2" maxLength="40" required />
                    <input id="profession" className="form__input form__input_type_sign" type="text" value={password || ''} onChange={handleChangePassword}
                        name="inputAbout" placeholder="Password" minLength="2" maxLength="200" required />

                    <button className="form__submit " type="submit">
                        {props.btnType}
                    </button>
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export default SingUserForm;