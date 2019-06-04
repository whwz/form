import React from 'react';

const Modal = ({classes, remove, changeClass}) => (
    <div className={classes}>
      <div className="modal__content">
          <span className="modal__message">Are you sure you want to remove all users?</span>
          <button className="button remove" onClick={remove}>Remove</button>
          <button className="button cancel" name="cancelAll" onClick={changeClass}>Cancel</button>
      </div>
    </div>
  )

  export default Modal;