import { useHistory } from 'react-router-dom';
import EntryForm from './EntryForm';
import * as auth from './Auth';
import api from '../utils/api';
import React from 'react';

function Login(props) {
  const history = useHistory();

  function handleSubmit({email, password}) {
    auth.login({email, password})
      .then((res) => {
        if (res.message) {
          props.handleUpdateInfoTooltip({title: res.message, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          api.getProfile()
            .then((user) => {
              if (user.name) {
                props.handleUpdateEmail(email);
                props.handleLogged(user);
                history.push('/');
              } else {
                props.handleUpdateInfoTooltip({title: 'Что-то пошло не так! Попробуйте ещё раз.', isSuccess: false});
                props.handleInfoTooltipShow();
              }
            });
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