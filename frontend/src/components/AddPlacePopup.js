import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name: title, link}, () => {
      setTitle('');
      setLink('');
    })
  }

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm name="add-place" title="Новое место" buttonText="Создать" 
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <input type="text" id="title-field" className="popup__form-field popup__form-field_type_add-place popup__form-field_type_title"
        name="title" placeholder="Название" minLength="1" maxLength="30" required noValidate value={title} onChange={handleChangeTitle} />
        <span className="title-field-error popup__error"></span>
        <input type="url" id="link-field" className="popup__form-field popup__form-field_type_add-place popup__form-field_type_link"
        name="link" placeholder="Ссылка на картинку" required noValidate value={link} onChange={handleChangeLink} />
        <span className="link-field-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;