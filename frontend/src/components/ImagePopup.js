function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_fullscreen-image ${card.link && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_fullscreen-image">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
        <button
          type="button" 
          name="close-button" 
          className="popup__close-button popup__close-button_type_fullscreen-image"
          onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;