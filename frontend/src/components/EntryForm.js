import React from 'react';

function EntryForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function emailChangeHandle(evt) {
    setEmail(evt.target.value)
  }

  function passwordChangeHandle(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSubmit({email, password});
  } 

  return (
    <div className="entry">
      <form name={props.name} className="entry__form" onSubmit={handleSubmit}>
        <h2 className="entry__title">{props.title}</h2>
        <fieldset className="entry__field-wrap">
          <input type="email" id="email-field" className="entry__form-field" name="email"
          placeholder="Email" required noValidate value={email} onChange={emailChangeHandle} />
          <span className="email-field-error entry__error"></span>
          <input type="password" id="password-field" className="entry__form-field" name="password"
          placeholder="Пароль" required noValidate value={password} onChange={passwordChangeHandle} />
          <span className="about-field-error entry__error"></span>
        </fieldset>
        <input 
          type="submit" 
          className={"entry__submit-button"} 
          value={props.isLoading ? 'Вход...' : props.buttonText} />
      </form>
      {props.children}
    </div>
  );
}

export default EntryForm;