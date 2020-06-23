import React, { Component } from 'react';
import './App.css';

import { auth, firebaseUIlauncher } from './Firebase/FirebaseInit';
import AuthHandler from './Components/AuthHandler';

class App extends Component {
  componentDidMount() {
    firebaseUIlauncher ('#firebaseui-auth-container');
  }

  render(){
    return (
      <div className="App">
        <AuthHandler />
        <div>------------</div>
        <div id="firebaseui-auth-container"></div>
        {
          auth.onAuthStateChanged((user) => {
            // if user isn't null then we logged in
            console.log("In the auth state change")
            console.log(user.displayName)
            if (user) {
              return <div>Hello user.displayName!</div>
            } else {
              return <div>Please log in above</div>
            }
          })
        }
        <div>------------</div>
      </div>
    );
  }
}

export default App;