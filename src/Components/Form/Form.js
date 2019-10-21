import React, { Component } from 'react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Autocomplete from '../Autocomplete/Autocomplete';
import Dropdown from '../Dropdown/Dropdown';
import './Form.css';
import {checkPolicy} from '../../Utils/System';
const policies = require('../../Utils/data/policies.json');

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      number: '',
      buttonGroup: ['ДМС', 'ОМС'],
      selectedType: '',
      company: '',
      selectedServices: [],
      ready: false,
      isSubmitted: false,
      policy: null
     };
    this.buttonRef = React.createRef();
  }
  
  componentDidMount() {
    this.buttonRef.current.disabled = true;
  }
  
  checkIfReady() {
    if (this.state.number && this.state.selectedType && this.state.company && this.state.selectedServices.length) {
      this.setState({ready: true});
      this.buttonRef.current.disabled = false;
    } else {
      this.setState({ready: false});
      this.buttonRef.current.disabled = true;
    }
  }
  
  renderButton() {
    if (!this.state.isSubmitted) {
      return (
        <button className="form__button" type="submit" ref={this.buttonRef} aria-label="Проверить полис">Проверить</button>
      )
    } else {
      return (
        <button className="form__button form__button--new" type="submit" ref={this.buttonRef} aria-label="Новый запрос">Новый запрос</button>
      )
    }
  }
  
  onFormSubmit = e => {
    e.preventDefault();

    if (!this.state.isSubmitted) {
      this.setState({isSubmitted: true});
      const policy = policies[this.state.number];
      if (policy) {
        this.setState({ policy });
      } else {
        this.setState({ policy: null });
      }
      this.props.onSubmit(policy);
      
    } else {
      this.setState({ number: '' });
      this.setState({ selectedType: '' });
      this.setState({ company: '' });
      this.setState({ selectedServices: [] });
      this.setState({ ready: false });
      this.setState({ isSubmitted: false });
      this.setState({ policy: null });
      this.buttonRef.current.disabled = true;
    }
  }
  
  onNumberChange = async e => {
    await this.setState({ number: e.target.value });
    const policy = checkPolicy(this.state.number);
    if (policy) {
      await this.setState({selectedType: policy[0]});
      await this.setState({company: policy[1]});
    }
    this.checkIfReady();
  }
  
  onTypeChange = async type => {
    await this.setState({ selectedType: type});
    this.checkIfReady();
  } 
  
  onCompanyChange = async company => {
    await this.setState({ company});
    this.checkIfReady();
  }
  
  onServicesChange = async services => {
    await this.setState({ selectedServices: services });
    this.checkIfReady();
  }
  
  render() {
    const date = this.state.isSubmitted && this.state.policy ? this.state.policy.date : null;
    
    return (
      <div className="form-container">
        <h2 className="form-heading">Проверка услуг медицинского страхования</h2>
        <form className="form" onSubmit={this.onFormSubmit}>
          <ButtonGroup buttons={this.state.buttonGroup} onTypeChange={this.onTypeChange} type={this.state.selectedType} />
          <div className="form__fields--group form__fields--group--policy">
            <div className="form__two-col">            
              <input className="form__input form__input--number" type="text" name="policy-number" ref={this.policyNumber} value={this.state.number} 
              onChange={this.onNumberChange} placeholder="Введите номер полиса" aria-label="Введите номер полиса" disabled={this.state.isSubmitted}/>
              <span className="form__policy-date">
                { date }
              </span>
             <Dropdown isSubmitted={this.state.isSubmitted} company={this.state.company} onCompanyChange={this.onCompanyChange} />
             </div>
           </div>
           <div className="form__fields--group">
            <legend className="form__legend">
              <h3 className="form-subheading">Выберите медицинские услуги</h3>
            </legend>
            <div className="form__autocomplete">
              <Autocomplete isSubmitted={this.state.isSubmitted} selected={this.state.selectedServices} onServicesChange={this.onServicesChange}/>
            </div>            
          </div>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default Form;