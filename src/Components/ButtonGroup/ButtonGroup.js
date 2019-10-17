import React, { Component } from 'react';
import ToggleButton from './ToggleButton';
import './ButtonGroup.css';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: ''};
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      console.log('type changed');
    }
  }
  
  onButtonClick = buttonName => {
    if (this.state.toggle !== buttonName) {
      this.setState({ toggle: buttonName})
      this.props.onTypeChange(buttonName);
    }
  }
  
  render() {
    return (
        <div className="form__toggle-buttons">
          {this.props.buttons.map((button, i) => 
            {
              let edge = i === 0 ? "left" : "mid";
              if (i + 1 === this.props.buttons.length) edge = "right";
              
              return <ToggleButton key={i} onClick={this.onButtonClick} buttonText={button} isActive={button === this.state.toggle} edge={edge} />
            }
          )}
        </div>
    );
  }
}

export default ButtonGroup;