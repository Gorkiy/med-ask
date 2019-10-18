import React, { Component } from 'react';
import './Autocomplete.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      isShown: false,
      selectedServices: [],
      unselectedServices: []
     };
     this.services = [];
     this.serviceInput = React.createRef();
  }
  
  componentDidMount() {
    document.addEventListener('click', this.blurServiceInput);
    this.services = require('../../Utils/data/services.json');
    const unselectedServices = this.services.map(item => item.service);
    this.setState({unselectedServices});
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.blurServiceInput);
  }

  getSuggestions(term) {
    const reg = new RegExp(`^${term}`, 'i');
    const services = [...this.state.unselectedServices].sort();
    const suggestions = services.filter(item => reg.test(item));
    this.setState({ suggestions });
    if (suggestions.length) {
      this.setState({ isShown: true });
    } else {
      this.setState({ isShown: false });
    }
  }
  
  renderSuggestions() {
    const {suggestions} = this.state;
    if (!suggestions.length) {
      return null;
    } else {
      return (
        <ul className="autocomplete__suggestions" onClick={this.onSuggestionClick}>
          {this.state.suggestions.map((el, i) => <li key={i} className="autocomplete__suggestions--item">{el}</li>)}
        </ul>
      )
    }
  }
  
  onTextChange = (e) => {
    const term = e.target.value;
    this.setState({ value: term });
    this.getSuggestions(term);
  }
  
  onSuggestionClick = e => {
    const clicked = e.target.innerText;
    const {selectedServices} = this.state;
    let {unselectedServices} = this.state;
    let {suggestions} = this.state;
    // Удаляем из списка услуг и автокомплита
    unselectedServices = unselectedServices.filter(item => (item !== clicked) );
    suggestions = suggestions.filter(item => (item !== clicked) );
    if (selectedServices.indexOf(clicked) === -1 ) selectedServices.push(clicked);
    if (!suggestions.length) this.setState({ isShown: false });
    this.setState({ suggestions });
    this.setState({ selectedServices });
    this.setState({ unselectedServices });
  }
  
  addServiceHandler = e => {
    const value = e.target.value;
    if (e.keyCode === 13 && this.state.value) {
      const {selectedServices} = this.state;
      if (selectedServices.indexOf(value) === -1 ) selectedServices.push(value);
      this.setState({ selectedServices });
    }
    if (e.keyCode === 27) {
      this.setState({isShown: false});
      this.serviceInput.current.blur();
    }
  }
  
  onDeleteClick = e => {
    const serviceName = e.target.closest('li').firstChild.innerText;
    
    let match = null;
    for (let item of this.services) {
      if (item.service === serviceName) match = true;
    }
    
    if (match) {
      const {unselectedServices} = this.state;
      unselectedServices.push(serviceName);
      this.setState({unselectedServices})
    }

    let {selectedServices} = this.state;
    selectedServices = selectedServices.filter(item => (item !== serviceName) );
    this.setState({ selectedServices });
  }
  
  onServicesFocus = e => {
    this.getSuggestions(this.state.value);
    if (this.state.suggestions.length) {
      this.setState({isShown: true});
    }
  }
  
  blurServiceInput = e => {
    if (!e.target.closest('.autocomplete-wrap')) {
      this.serviceInput.current.blur();
      this.setState({isShown: false});
    }
  }
    
  render() {
    return (
      <React.Fragment>
        <div className="autocomplete-wrap">
          <input 
            className={`form__input form__input--autocomplete ${this.state.isShown ? "form__input--active" : ""}`} 
            ref={this.serviceInput}
            value={this.state.value} 
            type="text" 
            name="services" 
            placeholder="Введите запрашиваемую услугу для пациента" 
            aria-label="Введите запрашиваемую услугу для пациента" 
            autoComplete="off" 
            onChange={this.onTextChange} 
            onKeyDown={this.addServiceHandler} 
            onFocus={this.onServicesFocus}
          />
          <div className={`autocomplete ${this.state.isShown ? "autocomplete--show" : ""}`}>
            {this.renderSuggestions()}
          </div>
        </div>
        <ul className="autocomplete__selected" onClick={this.onSelectedClick} onKeyDown={this.addServiceHandler}>
          {this.state.selectedServices.map((el, i) => 
            <li key={i} className="autocomplete__selected--item">
              <span className="autocomplete__selected--option">
                {el}
              </span>
              <button className="autocomplete__selected--delete" type="button" aria-label="Удалить услугу" onClick={this.onDeleteClick}></button>
            </li>)}
        </ul>
      </React.Fragment>
    );
  }
}

export default Autocomplete;