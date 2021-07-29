import EntryForm from './EntryForm';
import * as auth from './Auth';
import React from 'react';

function Login(props) {
  function handleSubmit({email, password}) {
    auth.login({email, password})
      .then((res) => {
        if (res.message) {
          props.handleUpdateInfoTooltip({title: res.message, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          props.handleLogged();
        }
      })
      .catch(() => {
        props.handleUpdateInfoTooltip({title: 'Что-то пошло не так! Попробуйте ещё раз.', isSuccess: false});
        props.handleInfoTooltipShow();
      })
  }

  return (
    <EntryForm name="login" title="Вход" buttonText="Войти" handleSubmit={handleSubmit} />
  );
}

export default Login;