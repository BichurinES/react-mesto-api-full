import { useHistory } from 'react-router-dom';
import EntryForm from './EntryForm';
import * as auth from './Auth';
import api from '../utils/api';
import { Link } from 'react-router-dom';

function Register(props) {
  const history = useHistory();

  function handleSubmit({email, password}) {
    auth.register({email, password})
      .then((res) => {
        if (res.error) {
          props.handleUpdateInfoTooltip({title: res.message, isSuccess: false});
          props.handleInfoTooltipShow();
        } else {
          props.handleUpdateEmail(email);
          props.handleUpdateInfoTooltip({title: 'Вы успешно зарегистрировались!', isSuccess: true});
          props.handleInfoTooltipShow();
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