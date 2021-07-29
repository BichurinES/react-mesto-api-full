import EntryForm from './EntryForm';
import * as auth from './Auth';
import { Link } from 'react-router-dom';

function Register(props) {
  function handleSubmit({email, password}) {
    auth.register({email, password})
      .then((res) => {
        if (res.message) {
          props.handleUpdateInfoTooltip({title: res.message, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          props.handleUpdateInfoTooltip({title: 'Вы успешно зарегистрировались!', isSuccess: true});
          props.handleInfoTooltipShow();
          return auth.login({email, password})
            .then((res) => {
              if (res.message) {
                props.handleUpdateInfoTooltip({title: res.message, isSuccess: false});
                props.handleInfoTooltipShow();
              } else {
                props.handleLogged();
              }
            })
            .catch((err) => {
              throw err;
            })
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