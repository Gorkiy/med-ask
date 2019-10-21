import React, { Component } from 'react';
import './Dropdown.css';
const companies = require('../../Utils/data/companies.json');

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      phone: '',
      isShown: false,
     };
  }
  
  componentDidMount() {
    document.addEventListener('click', this.blurSelect);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.blurSelect);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.company !== this.props.company) {
      this.setState({company: this.props.company});

      const company = companies.filter(item => item.sk === this.props.company)[0];
      if (company) this.setState({ phone: company.phone });
    }
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
              <img alt={el.sk} className="companies-list__logo" src={require(`../../images/logos/${el.logo}`)} width="25" height="25" />
              <span className="companies-list__name">{el.sk}</span>
            </li>)}
        </ul>
      )
    }
  }
  
  onSelectClick = e => {
    if (!this.props.isSubmitted) {
      if (this.state.isShown) {
        this.setState({company: ''});
        this.props.onCompanyChange('');
      }
      
      if (e.target.closest('.companies-select')) {
        this.setState({isShown: !this.state.isShown});
      }
    }
  }
  
  onCompanyClick = e => {
    const company = e.target.closest('li').lastChild.innerText;
    this.props.onCompanyChange(company);
    this.setState({company});
    this.setState({isShown: !this.state.isShown});
  }
  
  blurSelect = e => {
    if (!e.target.closest('.companies-list') && !e.target.closest('.companies-wrap') && !e.target.closest('.companies-select__selected')) {
      this.setState({isShown: false});
    }
  }
    
  render() {
    const isShown = this.state.isShown;
    const phone = this.props.isSubmitted ? this.state.phone : null;
    
    return (
      <div className="companies-wrap">
        <div className={`companies-select ${isShown ? 'companies-select--open' : ''}`} onClick={this.onSelectClick}>{this.renderSelect()}
        </div>
        <span className="companies-select__phone">
          { phone }
        </span>
        {this.renderCompanies()}    
      </div>
    );
  }
}

export default Dropdown;