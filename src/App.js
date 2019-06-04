import React, { Component } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import UsersList from './components/UsersList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [
        {
          nickname: "Cat",
          email: "cat@gmail.com",
          ipaddress: "127.255.255.255",
          date: "2.06.2019",
          time: "19:05:33",
          isClicked: false
        },
        {
          nickname: "Dog",
          email: "dog@gmail.com",
          ipaddress: "127.255.255.255",
          date: "2.06.2019",
          time: "19:08:33",
          isClicked: false
        },
        {
          nickname: "Wolf",
          email: "wolf@gmail.com",
          ipaddress: "127.255.255.255",
          date: "3.06.2019",
          time: "19:10:33",
          isClicked: false
        }
      ],
        currentNickname: '',
        currentEmail: '',
        currentIpaddress: '',
        nicknameClass: 'hide',
        emailClass: 'hide',
        ipaddressClass: 'hide',
        removeAllClass: 'hide',
        removeUserClass: 'hide'
    }
  }
  
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addUser = (event) => {
    event.preventDefault();
    const d = new Date();
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString();
    const newUser = {
      nickname: this.state.currentNickname,
      email: this.state.currentEmail,
      ipaddress: this.state.currentIpaddress,
      date: date,
      time: time,
      isClicked: false
    };
    this.setState({
      users: [...this.state.users, newUser],
      currentNickname: '',
      currentEmail: '',
      currentIpaddress: '',
      nicknameClass: 'hide',
      emailClass: 'hide',
      ipaddressClass: 'hide',
    });
  }
  
  changeClass = (event) => {
    if(typeof event === "string") 
    switch(event){
      case "removeUser": this.setState({removeUserClass: 'popup'}); break;
      case "cancelUser":
        const filteredUsers = this.state.users;
        for(let i = 0; i < filteredUsers.length; i++)
        filteredUsers[i].isClicked = false;
        this.setState({users: filteredUsers, removeUserClass: 'hide'}); break;
        default: break;
    }
    else
    switch(event.target.name){
      case "currentNickname": this.setState({nicknameClass: 'show'}); break;
      case "currentEmail": this.setState({emailClass: 'show'}); break;
      case "currentIpaddress": this.setState({ipaddressClass: 'show'}); break;
      case "removeAll": this.setState({removeAllClass: 'modal'}); break;
      case "cancelAll": this.setState({removeAllClass: 'hide'}); break;
      default: break;
    }
  }

  toggleItem = (nickname) => {
    const filteredUsers = this.state.users.map(item => item.nickname === nickname ? {...item, isClicked: !item.isClicked} : item);
    filteredUsers.map(item => item.nickname === nickname ? item.isClicked === true ? {...item, removeUserClass: 'popup'} : null : null )
    this.setState({
      users: filteredUsers
    });
  }
  
  removeAllUsers = () => this.setState({users: []});

  removeUser = (nickname) => {
    const filteredUsers = this.state.users.filter(item => item.nickname !== nickname);
    this.setState({
      users: filteredUsers
    });
  }

  sort = (type) => {
    const sorted = this.state.users;
    const sortByDateAndTime = (a, b) => {
      return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
    }

    switch(type){
      case "nickname/asc": sorted.sort((a, b) => a.nickname.localeCompare(b.nickname)); break;
      case "nickname/des": sorted.sort((b, a) => a.nickname.localeCompare(b.nickname)); break;
      case "email/asc": sorted.sort((a, b) => a.email.localeCompare(b.email)); break;
      case "email/des": sorted.sort((b, a) => a.email.localeCompare(b.email)); break;
      case "date/asc": sorted.sort(sortByDateAndTime); break;
      case "date/des": sorted.sort(sortByDateAndTime).reverse(); break;
      default: break;
    }
    
    this.setState({
      users: sorted
    });
  }


  render(){
    return (
      <div className="page">
        <div className="App">
          <Title />

          <Form 
            users={this.state.users}
            addUser={this.addUser}
            currentNickname={this.state.currentNickname} currentEmail={this.state.currentEmail} currentIpaddress={this.state.currentIpaddress}
            handleInputChange={this.handleInputChange}
            nicknameClass={this.state.nicknameClass} emailClass={this.state.emailClass} ipaddressClass={this.state.ipaddressClass}
            changeClass={this.changeClass}
          />
          
          {this.state.users.length > 0 ? 
            <UsersList 
              users={this.state.users}
              removeAllUsers={this.removeAllUsers}
              removeUser={this.removeUser}
              sort={this.sort}
              removeAllClass={this.state.removeAllClass}
              removeUserClass={this.state.removeUserClass}
              toggleItem={this.toggleItem}
              changeClass={this.changeClass}
            />
          : null}
        </div>
        </div>
    );
  }
}

export default App;