import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value
    }, () => avatar.current.value = '');
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" 
      isOpen={props.isOpen} 
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}   
    >
      <fieldset className="popup__field-wrap">
        <input type="url" id="avatar-field" className="popup__form-field"
        name="avatar" placeholder="Ссылка на картинку" required noValidate ref={avatar} />
        <span className="avatar-field-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;