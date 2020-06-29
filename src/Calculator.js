import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

import './Calculator.css';

class Calculator extends Component {
  state = {
      displayValue: '0',
      numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
      operators: ['/', '*', '-', '+', '='],
      selectedOperator: '',
      storedValue: ''
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = () => {
   document.removeEventListener('keydown', this.handleKeyPress);
  }

  callOperator = () => {

    let { displayValue, selectedOperator, storedValue } = this.state;

    const updateStoredValue = displayValue;

    displayValue = parseInt(displayValue, 10);
    storedValue = parseInt(storedValue, 10);

    if(selectedOperator === '*') {
      displayValue = storedValue * displayValue;
    } else if(selectedOperator === '+') {
      displayValue = storedValue + displayValue;
    } else if(selectedOperator === '-' ) {
      displayValue = storedValue - displayValue;
    } else if(selectedOperator === '/') {
      displayValue = storedValue / displayValue;
    } else {
      displayValue = '0';
    }
       

    displayValue = displayValue.toString();

    selectedOperator = '';

    if(displayValue === 'NaN') {
      displayValue = '0';
    } else if( displayValue === 'Undefined') {
      displayValue = '0';
    }

    this.setState({ displayValue, selectedOperator, storedValue: updateStoredValue });
  };

  setOperator = (value) => {
    let { displayValue, selectedOperator, storedValue } = this.state;

    if(selectedOperator === '') {
      storedValue = displayValue;
      displayValue = '0';
      selectedOperator = value;
    } else {
      selectedOperator = value;
    }

    this.setState({ displayValue, selectedOperator, storedValue });
    
  };

  updateDisplay = (value) => {
    let { displayValue } = this.state;

    if(value === '.' && displayValue.includes('.')) value = '';

    if(value === 'ce') {
      displayValue = displayValue.substr(0, displayValue.length - 1);
      if (displayValue === '') displayValue = '0';
    } else {
    displayValue === '0' ? displayValue = value : displayValue += value;
    }
    this.setState({ displayValue });
  };

  handleKeyPress = (event) => {
    const { numbers, operators } = this.state;

    if(event.key === 'Backspace') this.updateDisplay('ce');
    if(event.key === 'Enter' || event.key === '=') this.callOperator();

    numbers.forEach(number => {
      if(event.key === number) this.updateDisplay(number);
    });

    operators.forEach(operator => {
      if(event.key === operator) this.setOperator(operator);
    });
  }

  render() {

    const { displayValue, numbers, operators } = this.state;


      return(
          <div className="calculator-container">
           <Display displayValue={displayValue} />
           <Keypad  
             handleKeyPress={this.handleKeyPress}
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