import React, { Component } from 'react';
import ToggleButton from './ToggleButton';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { type: ''};
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({type: this.props.type});
    }
  }
  
  onButtonClick = buttonName => {
    if (!this.props.isSubmitted && this.state.type !== buttonName) {
      this.setState({ type: buttonName})
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
              
              return <ToggleButton key={i} onClick={this.onButtonClick} buttonText={button} isActive={button === this.state.type} edge={edge} />
            }
          )}
        </div>
    );
  }
}

export default ButtonGroup;