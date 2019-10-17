import React, { Component } from 'react';
import './ToggleButton.css';

class ToggleButton extends Component {
  onButtonClick = e => {
    e.preventDefault();
    this.props.onClick(this.props.buttonText);
  }
  
  render() {
    return (
      <button className={`toggle toggle--${this.props.edge} ${this.props.isActive ? "toggle--active" : ""}`} type="button" onClick={this.onButtonClick}>
        {this.props.buttonText}
      </button>
    );
  }
}

export default ToggleButton;