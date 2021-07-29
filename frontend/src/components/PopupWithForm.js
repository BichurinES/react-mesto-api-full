import React from 'react';
function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <input 
            type="submit" 
            className={`popup__submit-button popup__submit-button_type_${props.name} ${props.isFormValid ? '' : 'popup__submit-button_type_disabled'}`}
            disabled={props.isFormValid ? false : true}
            value={props.isLoading ? 'Сохранение...' : props.buttonText} />
        </form>
        <button 
          type="button" 
          name="close-button" 
          className="popup__close-button"
          onClick={props.onClose}>
        </button>
      </div>
    </div>
  );
}

// Оставил модификатор класса для кнопки отправки, так как есть отличия в стилях 
// попапов с полями и с подтверждением удаления карточки

export default PopupWithForm;