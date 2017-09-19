import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from "./Auth";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React in firebase login</h2>
        </div>
          <Auth/>
      </div>
    );
  }
}

export default App;
