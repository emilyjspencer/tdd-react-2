import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

import './Calculator.css';

class Calculator extends Component {
  state = {
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operators: ['/', 'x', '-', '+'],
      selectedOperator: '',
      storedValue: ''
  }

  callOperator = () => {

  };

  setOperator = () => {
    
  };

  updateDisplay = (value) => {
    let { displayValue } = this.state;

    displayValue === '0' ? displayValue = value : displayValue += value;
    this.setState({ displayValue });
  };

  render() {

    const { displayValue, numbers, operators } = this.state;


      return(
          <div className="calculator-container">
           <Display displayValue={displayValue} />
           <Keypad  
             callOperator={this.callOperator}
             numbers={numbers}
             operators={operators}
             setOperator={this.setOperator}
             updateDisplay={this.updateDisplay}
             />
          </div>
      );
  }
}


export default Calculator;