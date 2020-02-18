import React, { Component } from 'react'
import firebase from './config/firebase'
import Home from './components/Home'
import Auth from './components/Auth'
import { uuid } from 'uuidv4';
import './css/main.css';
import { Route } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading : true,
      user : {},
      activeUser : null,
      activeUserSessions : []
    }
  }


  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
        this.getUserData(user.email)
      } else {
        this.setState({ user: null });
      }
    })
  }

  async registerNewUser(id, email, displayName){

    let newUser = {
      id: id,
      displayName: displayName,
      email: email
    }

    let ref = firebase.database().ref(`usersData/${id}`);
    ref.set(newUser);
    
    this.getUserData(email)
    // console.log(email)

  }

  async getUserData(email){

    let ref = firebase.database().ref("usersData").orderByChild("email").equalTo(email);

    let activeUser;
    await ref.once('child_added').then((snapshot) => {
    activeUser = snapshot.val();
    }, (error) => {
        console.log(error);
    });    

    this.setState((state, props) => { return { 
      activeUser : activeUser,
    }});

    this.getUserSessions()

  }



  handleAddNewSession(sessionTitle){

    let {activeUser} = this.state;

    let newSession = {
      id: uuid(),
      title: sessionTitle,
      dateCreated: Date.now(),
      owner: activeUser.email
    }

    let ref = firebase.database().ref("sessionsData");
    ref.push(newSession);

    this.getUserSessions()
    
  }

  async handleAddNewBoard(sessionId, boardName){
    let {activeUser} = this.state;
    let userId = activeUser.id;

    console.log()

    let newBoard= {
      id: uuid(),
      title: boardName,
      dateCreated: Date.now(),
      owner: activeUser.email
    }

    let ref = firebase.database().ref("sessionsData").orderByChild("id").equalTo(sessionId);

    let sessionKey;
    await ref.once('child_added', function(snapshot) {
        sessionKey = snapshot.key;
    });

    console.log(userId)
    console.log(sessionId)
    console.log(sessionKey)

    let sessionRef = firebase.database().ref(`sessionsData/${sessionKey}/boards`);
    await sessionRef.push(newBoard);

    this.getUserSessions()

  }


  async getUserSessions(){

    let { activeUser } = this.state;

    let ref = firebase.database().ref("sessionsData").orderByKey();
   
    let userSessions;

    await ref.once('value').then((snapshot) => {
      userSessions = this.snapshotToArray(snapshot)
    }, (error) => {
        console.log(error);
    });    

    this.setState((state, props) => { return { 
      activeUserSessions : userSessions.reverse(),
      loading : false
    }}, () => {
      console.log(this.state.activeUserSessions)
    });
    

  }


  logout(){
    firebase.auth().signOut();

    this.setState((state, props) => { return { 
      activeUserSessions : []
     }});
    
  }


  snapshotToArray(snapshot) {
    let returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        // item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};


  render() {


    let {loading, user} = this.state

    return (
      <>
        {
          !user &&
          <Auth
            registerNewUser = {this.registerNewUser.bind(this)}
            getUserData = {this.getUserData.bind(this)}
          />
        }

        { loading ?  <h1>LOADDDDDDDDDDDDDDDDDDIIIIIIIIIIIIIIIIIINNNNNNNNNNNGGGGGGGGGGG</h1> :
            
        <Home 
        activeUser = {this.state.activeUser}
        activeUserSessions = {this.state.activeUserSessions}
        handleAddNewSession = {this.handleAddNewSession.bind(this)}
        handleAddNewBoard = {this.handleAddNewBoard.bind(this)}
        logout = {this.logout.bind(this)}              
        /> 


        }

      </>
    );
  }

}

export default App;