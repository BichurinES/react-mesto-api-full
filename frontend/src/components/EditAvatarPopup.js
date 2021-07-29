import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isAvatarValid, setIsAvatarValid] = React.useState('');
  const [avatarValidationMsg, setAvatarValidationMsg] = React.useState('');

  React.useEffect(() => {
    if (avatar === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(isAvatarValid);
    }
  }, [isAvatarValid, avatar]);

  function avatarChangeHandle(evt) {
    setIsAvatarValid(evt.target.validity.valid);
    setAvatarValidationMsg(evt.target.validationMessage);
    setAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar }, () => {
      setAvatar('');
    });
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" 
      isOpen={props.isOpen} 
      isLoading={props.isLoading}
      onClose={props.onClose}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <input 
          type="url" 
          id="avatar-field" 
          className={`popup__form-field ${(isAvatarValid || isAvatarValid === '') ? '' : 'popup__form-field_type_error'}`}
          name="avatar" 
          placeholder="Ссылка на картинку" 
          required
          noValidate 
          value={avatar} 
          onChange={avatarChangeHandle} 
        />
        <span className={`avatar-field-error popup__error ${isAvatarValid ? '' : 'popup__error_visible'}`}>
          {avatarValidationMsg}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;