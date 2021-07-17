import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
  function handleDeleteCard(evt) {
    evt.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm name="confirm-delete" title="Вы уверены?" buttonText="Да"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleDeleteCard}
    />
  );
}

export default ConfirmDeletePopup;