function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_infoTooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_infoTooltip">
        <div className={`popup__status-icon ${props.infoTooltipContent.isSuccess ? '' : 'popup__status-icon_error'}`}></div>
        <h2 className="popup__title popup__title_type_infoTooltip">{props.infoTooltipContent.title}</h2>
        <button 
          type="button" 
          name="close-button" 
          className="popup__close-button popup__close-button_type_infoTooltip"
          onClick={props.onClose}>
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;