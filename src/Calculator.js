import React, { Component } from 'react';

class Calculator extends Component {
  state = {
      displayValue: '0',
      numbers: [],
      operators: [],
      selectedOperator: '',
      storedValue: ''
  }

  render() {
      return(
          <div className="calculator-container">
           <h1>Hi - I am a Calculator</h1>
          </div>
      );
  }
}


export default Calculator;