import React, { Component } from 'react';
import Display from './Display';

class Calculator extends Component {
  state = {
      displayValue: '0',
      numbers: [],
      operators: [],
      selectedOperator: '',
      storedValue: ''
  }

  render() {

    const { displayValue } = this.state;

      return(
          <div className="calculator-container">
           <h1>Hi - I am a Calculator</h1>
           <Display displayValue={displayValue} />
          </div>
      );
  }
}


export default Calculator;