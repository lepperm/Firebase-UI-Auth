import React, { Component } from 'react';
import './App.css';

import AuthHandler from './Components/AuthHandler';

class App extends Component {

  render(){
    return (
      <div className="App">
        <AuthHandler />
      </div>
    );
  }
}

export default App;