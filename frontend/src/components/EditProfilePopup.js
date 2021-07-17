import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function nameChangeHandle(evt) {
    setName(evt.target.value)
  }

  function descriptionChangeHandle(evt) {
    setDescription(evt.target.value)
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
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <input type="text" id="name-field" className="popup__form-field popup__form-field_type_name" name="name"
        placeholder="Имя" minLength="2" maxLength="40" required noValidate value={name} onChange={nameChangeHandle} />
        <span className="name-field-error popup__error"></span>
        <input type="text" id="about-field" className="popup__form-field popup__form-field_type_about" name="about"
        placeholder="О себе" minLength="2" maxLength="200" required noValidate value={description} onChange={descriptionChangeHandle} />
        <span className="about-field-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;