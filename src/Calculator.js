import React, { Component } from 'react';
import Display from './Display';
import Keypad from './Keypad';

import './Calculator.css';

class Calculator extends Component {
  state = {
      displayValue: '0',
      numbers: [],
      operators: [],
      selectedOperator: '',
      storedValue: ''
  }

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