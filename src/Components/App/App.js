import React, { Component } from 'react';
import './App.css';
import Form from '../Form/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShown: true
     };
  }
  
  onFormSubmit = policy => {
    if (policy) {
      this.setState({ isShown: true});
    } else {
      this.setState({ isShown: false});
    }
  }
  
  onButtonClick = () => this.setState({ isShown: true });
  
  renderForm() {
    if (this.state.isShown) {
      return <Form onSubmit={this.onFormSubmit}/>
    } else {
      return (
      <div className="modal">
        <h3 className="modal__title">Полис с таким номером не обнаружен</h3>
        <p className="modal__description">Попробуйте изменить данные</p>
        <button className="button modal__button" type="submit" onClick={this.onButtonClick} aria-label="Новый запрос">Ок</button>
      </div>
      )
    }
  }
  
  render() {
    return (
      <div className="app">
        {this.renderForm()}
      </div>
    );
  }
}

export default App;