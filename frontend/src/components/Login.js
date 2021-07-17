import { useHistory } from 'react-router-dom';
import EntryForm from './EntryForm';
import * as auth from './Auth';

function Login(props) {
  const history = useHistory();

  function handleSubmit({email, password}) {
    auth.login({email, password})
      .then((res) => {
        if (res.error) {
          props.handleUpdateInfoTooltip({title: res.error, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          localStorage.setItem('token', res.token);
          auth.checkToken(res.token)
            .then((res) => {
              if (res.data) {
                props.handleUpdateEmail(res.data.email);
                props.handleLogged();
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