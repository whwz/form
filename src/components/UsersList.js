import React from 'react';
import Modal from './Modal';
import RemoveUserPopup from './RemoveUserPopup';

const UsersList = ({users, removeAllUsers, removeUser, sort, removeAllClass, removeUserClass, toggleItem, changeClass}) => (
    <>
    <button name="removeAll" className="button remove" onClick={changeClass}>Remove all users</button>
  
    <Modal classes={removeAllClass} remove={removeAllUsers} changeClass={changeClass} />
    <div className="container">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head__row">
            <th className="table__head__cell">Nickname
              <span className="sort" onClick={() => sort("nickname/asc")}>&#9650;</span>
              <span className="sort" onClick={() => sort("nickname/des")}>&#9660;</span>
            </th>
            <th className="table__head__cell">Email
              <span className="sort" onClick={() => sort("email/asc")}>&#9650;</span>
              <span className="sort" onClick={() => sort("email/des")}>&#9660;</span>
            </th>
            <th className="table__head__cell">IP address</th>
            <th className="table__head__cell">Registration date
              <span className="sort" onClick={() => sort("date/asc")}>&#9650;</span>
              <span className="sort" onClick={() => sort("date/des")}>&#9660;</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {users.map((item, index) => 
        <>
          <tr className="table__row" key={index}>
            <td className="table__cell">{item.nickname}</td>
            <td className="table__cell">{item.email}</td>
            <td className="table__cell">{item.ipaddress}</td>
            <td className="table__cell">{item.date}, {item.time} <span className="delete" onClick={() => {toggleItem(item.nickname); changeClass("removeUser");}}>&times;</span></td>
          </tr>
          {item.isClicked ? <RemoveUserPopup classes={removeUserClass} changeClass={changeClass} remove={() => removeUser(item.nickname)} nickname={item.nickname} toggleItem={toggleItem} /> : null }
        </>)}
        </tbody>
      </table>
    </div>
    </>
  )

  export default UsersList;