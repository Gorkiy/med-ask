import React, { Component } from 'react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Autocomplete from '../Autocomplete/Autocomplete';
import Dropdown from '../Dropdown/Dropdown';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      number: '',
      buttonGroup: ['ДМС', 'ОМС'],
      selectedType: ''
     };
    this.policyNumber = React.createRef();
    this.buttonRef = React.createRef();
  }
  
  componentDidUpdate() {
    // console.log(this.state);
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.number);
  }
  
  onNumberChange = (e) => {
    this.setState({ number: e.target.value });
  }
  
  onTypeChange = type => this.setState({ selectedType: type});
  
  render() {
    return (
      <div className="form-container">
        <h2 className="form-heading">Проверка услуг медицинского страхования</h2>
        <form className="form" onSubmit={this.onFormSubmit}>
          <ButtonGroup buttons={this.state.buttonGroup} onTypeChange={this.onTypeChange} type={this.state.selectedType} />
          <div className="form__fields--group form__fields--group--policy">
            <div className="form__two-col">            
              <input className="form__input form__input--number" type="text" name="policy-number" ref={this.policyNumber} value={this.state.number} 
              onChange={this.onNumberChange} placeholder="Введите номер полиса" aria-label="Введите номер полиса" />
              {/*<input className="form__input" type="text" name="sk-name"  
               placeholder="Выберите страховую компанию" aria-label="Выберите страховую компанию" />*/}
               <Dropdown />
             </div>
           </div>
           <div className="form__fields--group">
            <legend className="form__legend">
              <h3 className="form-subheading">Выберите медицинские услуги</h3>
            </legend>
            <div className="form__autocomplete">
              <Autocomplete />
            </div>            
          </div>
          <button className="form__button" type="submit" ref={this.buttonRef} aria-label="Проверить полис">Проверить</button>
        </form>
      </div>
    );
  }
}

export default Form;