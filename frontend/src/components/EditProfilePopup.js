import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
  const [nameValidationMsg, setNameValidationMsg] = React.useState('');
  const [descriptionValidationMsg, setDescriptionValidationMsg] = React.useState('');
  
  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
      setIsFormValid(isNameValid && isDescriptionValid);
  }, [isNameValid, isDescriptionValid]);

  function nameChangeHandle(evt) {
    setIsNameValid(evt.target.validity.valid);
    setNameValidationMsg(evt.target.validationMessage);
    setName(evt.target.value);
  }

  function descriptionChangeHandle(evt) {
    setIsDescriptionValid(evt.target.validity.valid);
    setDescriptionValidationMsg(evt.target.validationMessage);
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" 
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      isFormValid={isFormValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <input type="text" id="name-field" className={`popup__form-field popup__form-field_type_name ${isNameValid ? '' : 'popup__form-field_type_error'}`} name="name"
        placeholder="Имя" minLength="2" maxLength="40" required noValidate value={name} onChange={nameChangeHandle} />
        <span className={`name-field-error popup__error ${isNameValid ? '' : 'popup__error_visible'}`}>{nameValidationMsg}</span>
        <input type="text" id="about-field" className={`popup__form-field popup__form-field_type_about ${isDescriptionValid ? '' : 'popup__form-field_type_error'}`} name="about"
        placeholder="О себе" minLength="2" maxLength="200" required noValidate value={description} onChange={descriptionChangeHandle} />
        <span className={`about-field-error popup__error ${isDescriptionValid ? '' : 'popup__error_visible'}`}>{descriptionValidationMsg}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;