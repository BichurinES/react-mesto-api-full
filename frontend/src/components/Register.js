import { useHistory } from 'react-router-dom';
import EntryForm from './EntryForm';
import * as auth from './Auth';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Register(props) {
  const history = useHistory();

  function handleSubmit({email, password}) {
    auth.register({email, password})
      .then((res) => {
        if (res.error) {
          props.handleUpdateInfoTooltip({title: res.error, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          props.handleUpdateEmail(res.data.email);
          props.handleUpdateInfoTooltip({title: 'Вы успешно зарегистрировались!', isSuccess: true});
          props.handleInfoTooltipShow();
          auth.login({email, password}).then((res) => {
            localStorage.setItem('token', res.token);
          })
          props.handleLogged();
          history.push('/');
        }
      })
      .catch(() => {
        props.handleUpdateInfoTooltip({title: 'Что-то пошло не так! Попробуйте ещё раз.', isSuccess: false});
        props.handleInfoTooltipShow();
      })
  }

  return (
    <EntryForm name="register" title="Регистрация" buttonText="Зарегистрироваться" handleSubmit={handleSubmit}>
      <p className="entry__caption">Уже зарегистрированы? <Link className="entry__link" to="/sign-in">Войти</Link></p>
    </EntryForm>
  );
}
export default Register;