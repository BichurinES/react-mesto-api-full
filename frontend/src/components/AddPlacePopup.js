import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isTitleValid, setIsTitleValid] = React.useState('');
  const [isLinkValid, setIsLinkValid] = React.useState('');
  const [titleValidationMsg, setTitleValidationMsg] = React.useState('');
  const [linkValidationMsg, setLinkValidationMsg] = React.useState('');

  React.useEffect(() => {
    if (title === '' && link === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(isTitleValid && isLinkValid);
    }
  }, [isTitleValid, isLinkValid, title, link]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name: title, link}, () => {
      setTitle('');
      setLink('');
    })
  }

  function handleChangeTitle(evt) {
    setIsTitleValid(evt.target.validity.valid);
    setTitleValidationMsg(evt.target.validationMessage);
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setIsLinkValid(evt.target.validity.valid);
    setLinkValidationMsg(evt.target.validationMessage);
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm name="add-place" title="Новое место" buttonText="Создать" 
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      isFormValid={isFormValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <input type="text" id="title-field" className={`popup__form-field ${(isTitleValid || isTitleValid === '') ? '' : 'popup__form-field_type_error'}`}
        name="title" placeholder="Название" minLength="2" maxLength="30" required noValidate value={title} onChange={handleChangeTitle} />
        <span className={`title-field-error popup__error ${isTitleValid ? '' : 'popup__error_visible'}`}>{titleValidationMsg}</span>
        <input type="url" id="link-field" className={`popup__form-field ${(isLinkValid || isLinkValid === '') ? '' : 'popup__form-field_type_error'}`}
        name="link" placeholder="Ссылка на картинку" required noValidate value={link} onChange={handleChangeLink} />
        <span className={`link-field-error popup__error ${isLinkValid ? '' : 'popup__error_visible'}`}>{linkValidationMsg}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;