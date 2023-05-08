import React from 'react';

const PopupError = () => {
  return (
    <div className="popup">
      <div className="popup__overlay"></div>
      <div className="popup__content">
        <div className="popup__icon">
          <i className="fas fa-times-circle"></i>
        </div>
        <div className="popup__message">Во время выполнения запроса произошла ошибка, попробуйте позднее</div>
      </div>
    </div>
  );
};

export default PopupError;
