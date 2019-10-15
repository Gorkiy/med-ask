import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { number: '' };
    this.policyNumber = React.createRef();
    this.buttonRef = React.createRef();
  }
  
  componentDidUpdate(prevProps) {
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.number);
  }
  
  onNumberChange = (e) => {
    this.setState({ number: e.target.value });
  }
  
  render() {
    return (
        <form className="form" onSubmit={this.onFormSubmit}>
          <input className="form__input" type="text" name="policy-number" ref={this.policyNumber} value={this.state.number} 
          onChange={this.onNumberChange} placeholder="Введите номер полиса" aria-label="Введите номер полиса" />
          
          {/* 
            <label for="username">Click me</label>
          <input type="text" id="username"> 
          */}
          
          
          <button className="form__button" type="submit" ref={this.buttonRef} aria-label="Проверить полис">Проверить</button>
        </form>
    );
  }
}

export default Form;