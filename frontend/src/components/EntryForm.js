import React from 'react';

function EntryForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [emailValidationMsg, setEmailValidationMsg] = React.useState('');
  const [passwordValidationMsg, setPasswordValidationMsg] = React.useState('');

  function emailChangeHandle(evt) {
    setIsEmailValid(evt.target.validity.valid);
    setEmailValidationMsg(evt.target.validationMessage);
    setEmail(evt.target.value);
  }

  function passwordChangeHandle(evt) {
    setIsPasswordValid(evt.target.validity.valid);
    setPasswordValidationMsg(evt.target.validationMessage);
    setPassword(evt.target.value);
  }

  React.useEffect(() => {
    if (email === '' && password === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(isEmailValid && isPasswordValid);
    }
  }, [isPasswordValid, isEmailValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSubmit({email, password});
  } 

  return (
    <div className="entry">
      <form name={props.name} className="entry__form" onSubmit={handleSubmit}>
        <h2 className="entry__title">{props.title}</h2>
        <fieldset className="entry__field-wrap">
          <input type="email" id="email-field" className={`entry__form-field ${isEmailValid ? '' : 'entry__form-field_type_error'}`} 
          name="email" placeholder="Email" required noValidate value={email} onChange={emailChangeHandle} />
          <span className={`email-field-error entry__error ${isEmailValid ? '' : 'entry__error_visible'}`}>{emailValidationMsg}</span>
          <input type="password" id="password-field" className={`entry__form-field ${isPasswordValid ? '' : 'entry__form-field_type_error'}`} 
          name="password" placeholder="Пароль" minLength="8" required noValidate value={password} onChange={passwordChangeHandle} />
          <span className={`email-field-error entry__error ${isPasswordValid ? '' : 'entry__error_visible'}`}>{passwordValidationMsg}</span>
        </fieldset>
        <input 
          type="submit" 
          className={`entry__submit-button ${isFormValid ? '' : 'entry__submit-button_type_disabled'}`} 
          disabled={isFormValid ? false : true}
          value={props.isLoading ? 'Вход...' : props.buttonText} />
      </form>
      {props.children}
    </div>
  );
}

export default EntryForm;