import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import firebase from 'firebase'
// var admin = require('./config/fbConfig'); 
import firebase from './config/fbConfig'

class App extends Component {

  render() {
    var database = firebase.database().ref("news").once("value", function(snapshot) {
      let keys = Object.keys(snapshot.val()); 
      console.log("snapshot", keys);
    }); 
    firebase.database().ref('news/').update(
      { 
        "0": {
        title: "Article One",
        }
      }, function(error) {
          if (error) {
            // The write failed...
            console.log('error saving data', error)
          } else {
            // Data saved successfully!
            console.log('Data Saved.')
          }
        } 
      );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
