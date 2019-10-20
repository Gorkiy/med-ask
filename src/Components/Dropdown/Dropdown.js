import React, { Component } from 'react';
import './Dropdown.css';
const companies = require('../../Utils/data/companies.json');

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      isShown: false,
     };
     this.container = React.createRef();
     this.select = React.createRef();
  }
  
  componentDidMount() {
    document.addEventListener('click', this.blurSelect);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.blurSelect);
  }
  
  renderSelect() {
    if (!this.state.isShown) {
      if (!this.state.company) {
        return 'Выберите страховую компанию';
      } else {
        const companyObj = companies.filter(item => item.sk === this.state.company)[0];
        
        return (
          <div className="companies-select__selected">
            <img alt={companyObj.sk} className="companies-list__logo" src={require(`../../images/logos/${companyObj.logo}`)}/>
            <span className="companies-list__name">{companyObj.sk}</span>
          </div>
        )
      }
    }
  }
  
  renderCompanies() {
    if (!companies.length || !this.state.isShown) {
      return null;
    } else {
      return (
        <ul className="companies-list">
          {companies.map((el, i) => 
            <li key={i} className="companies-list__item" onClick={this.onCompanyClick}>
              <img alt={el.sk} className="companies-list__logo" src={require(`../../images/logos/${el.logo}`)}/>
              <span className="companies-list__name">{el.sk}</span>
            </li>)}
        </ul>
      )
    }
  }
  
  onSelectClick = e => {
    if (this.state.isShown) {
      this.setState({company: ''});
    }
    
    if (e.target.closest('.companies-select')) {
      this.setState({isShown: !this.state.isShown});
    }
  }
  
  onCompanyClick = e => {
    const company = e.target.closest('li').lastChild.innerText;
    this.setState({company});
    this.setState({isShown: !this.state.isShown});
  }
  
  blurSelect = e => {
    if (!e.target.closest('.companies-list') && !e.target.closest('.companies-wrap') && !e.target.closest('.companies-select__selected')) {
      this.setState({isShown: false});
    }
    // if (!this.container.current.contains(e.target) && this.state.isShown) {
    //   setTimeout(function() {
    //     console.log('close');
    //   }, 1000);
    // }
  }
    
  render() {
    const isShown = this.state.isShown;
    
    return (
      <div className="companies-wrap" ref={this.container}>
        <div className={`companies-select ${isShown ? 'companies-select--open' : ''}`} onClick={this.onSelectClick} ref={this.select}>{this.renderSelect()}
        </div>
        {this.renderCompanies()}
        
      </div>
    );
  }
}

export default Dropdown;