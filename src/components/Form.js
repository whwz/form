import React from 'react';
import Popup from './Popup';

const Form = ({users, addUser, currentNickname, currentEmail, currentIpaddress, handleInputChange, changeClass, nicknameClass, emailClass, ipaddressClass}) => {

    const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRegex.test(currentEmail);
    const ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
    const validIp = ipRegex.test(currentIpaddress);
  
    const userExists = users.filter(item => item.nickname.toLowerCase() === currentNickname.toLowerCase());
    const emailExists = users.filter(item => item.email.toLowerCase() === currentEmail.toLowerCase());
  
    const enabled = currentNickname.length > 0 && validEmail && validIp && !(userExists.length || emailExists.length);
  
    let msgName = '';
    if(!currentNickname.length > 0) msgName = "Nickname is required";
    if(userExists.length) msgName = "Nickname already exists";
  
    let msgEmail = '';
    if(emailExists.length) msgEmail = "Email already exists";
    if(!validEmail) msgEmail = "Wrong email format";
    if(!currentEmail.length > 0) msgEmail = "Email is required";
  
    let msgIp = '';
    if(!validIp) msgIp = "Wrong IP address format";
    if(!currentIpaddress.length > 0) msgIp = "IP address is required";
  
    return (
      <form className="form" onSubmit={addUser}>
  
        <label htmlFor="nickname" className="form__label">Nickname</label>
        <input
          type="text"
          id="nickname"
          className="form__input"
          name="currentNickname"
          maxLength="30"
          value={currentNickname}
          onChange={handleInputChange}
          onFocus={changeClass}
        />
        {msgName === '' ? null : <Popup classes={nicknameClass} message={msgName} />}
  
        <label htmlFor="email" className="form__label">Email</label>
        <input
          type="text"
          id="email"
          className="form__input"
          name="currentEmail"
          maxLength="30"
          value={currentEmail}
          onChange={handleInputChange}
          onFocus={changeClass}
        />
        {msgEmail === '' ? null : <Popup classes={emailClass} message={msgEmail} />}
          
        <label htmlFor="ipaddress" className="form__label">IP address</label>
        <input
          type="text"
          id="ipaddress"
          className="form__input"
          name="currentIpaddress"
          maxLength="39" //ipv6
          value={currentIpaddress}
          onChange={handleInputChange}
          onFocus={changeClass}
        />
        {msgIp === '' ? null : <Popup classes={ipaddressClass} message={msgIp} />}
  
        <button type="submit" className="button add" disabled={!enabled}>Add user</button>
  
      </form>
    );
  }

  export default Form;