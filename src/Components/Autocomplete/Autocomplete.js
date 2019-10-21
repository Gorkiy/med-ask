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
  
  componentDidUpdate(prevProps) {
    if (prevProps.isSubmitted !== this.props.isSubmitted && this.props.isSubmitted) {
      this.serviceInput.current.disabled = true;
    } else {
      this.serviceInput.current.disabled = false;
    }
    
    if (prevProps.selected.length !== this.props.selected.length && !this.props.selected.length) {
      this.setState({ selectedServices: []});
      const unselectedServices = this.services.map(item => item.service);
      this.setState({unselectedServices});
    }
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
        <ul className="suggestions-list" onClick={this.onSuggestionClick}>
          {this.state.suggestions.map((el, i) => <li key={i} className="suggestions-list__item">{el}</li>)}
        </ul>
      )
    }
  }
  
  renderServices() {
    if (!this.props.isSubmitted) {
      return this.state.selectedServices.map((el, i) => 
        <li key={i} className="services-list__item">
          <span className="services-list__option">
            {el}
          </span>
          <button className="services-list__delete" type="button" aria-label="Удалить услугу" onClick={this.onDeleteClick}></button>
        </li>)
    } else {
      // Сортировка сервисов по статусу перед рендером
      const selected = [...this.state.selectedServices];
      selected.sort((a, b) => {
        const serviceA = this.services.filter(item => item.service === a)[0];
        const serviceB = this.services.filter(item => item.service === b)[0];
        if (!serviceA && !serviceB) return 1;
        if (serviceA && serviceB) return serviceB.included - serviceA.included;
        return 1;
      });
      
      return selected.map((el, i) => {
        let modifier ='undefined';
        const service = this.services.filter(item => item.service === el)[0];
        if (service) modifier = service.included ? 'true' : 'false';
        return <li key={i} className="services-list__item">
          <span className={`services-list__option services-list__option--${modifier}`}>
            {el}
          </span>
        </li>
      })  
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
    this.props.onServicesChange(selectedServices);
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
    this.props.onServicesChange(selectedServices);
  }
  
  onServicesFocus = e => {
    this.getSuggestions(this.state.value);
    if (this.state.suggestions.length) {
      this.setState({isShown: true});
    }
  }
  
  blurServiceInput = e => {
    if (!e.target.closest('.autocomplete-wrap') && !this.props.isSubmitted) {
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
        <ul className="services-list" onClick={this.onSelectedClick} onKeyDown={this.addServiceHandler}>
          {this.renderServices()}
        </ul>
      </React.Fragment>
    );
  }
}

export default Autocomplete;