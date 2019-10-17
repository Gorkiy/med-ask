import React, { Component } from 'react';
import {checkPolicy} from '../../Utils/System';
import './App.css';
import Form from '../Form/Form';

class App extends Component {
  
  onFormSubmit(number) {
    console.log(number);
  }
  
  render() {
    return (
      <div className="app">
        <Form onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;