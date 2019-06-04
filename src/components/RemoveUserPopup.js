import React from 'react';

const RemoveUserPopup = ({classes, remove, changeClass, nickname, toggleItem}) => (
    <tr className={classes}>
      <td colSpan="4" className="popup__content">
        <span className="popup__message">Are you sure you want to remove this user? &#9650;</span>
        <button className="button remove" onClick={remove}>Remove</button>
        <button className="button cancel" name="cancelUser" onClick={() => {toggleItem(nickname); changeClass("cancelUser");}}>Cancel</button>
      </td>
    </tr>
  )

  export default RemoveUserPopup;