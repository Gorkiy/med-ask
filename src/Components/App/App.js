import React, { Component } from 'react';
import {checkPolicy} from '../../Utils/System';
import './App.css';
import Form from '../Form/Form';

class App extends Component {
  // const policy = checkPolicy('1234 12345678');
  // console.log(policy);
  onFormSubmit(number) {
    console.log(number);
  }
  
  render() {
    return (
      <div className="App">
        <Form onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;