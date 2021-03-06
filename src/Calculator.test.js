import React from 'react';
import { mount, shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from './Display';
import Keypad from './Keypad';

describe('Calculator', () => {
    
  let wrapper;

  beforeEach(() => wrapper = shallow(<Calculator />));

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('should render an instance of the Display Component', () => {
    expect(wrapper.containsMatchingElement(<Display displayValue={wrapper.instance().state.displayValue} />)).toEqual(true);
  });

  it('should render the Display and Keypad Components', () => {
    expect(wrapper.containsAllMatchingElements([
      <Display displayValue={wrapper.instance().state.displayValue} />,
      <Keypad 
        callOperator={wrapper.instance().callOperator}
        setOperator={wrapper.instance().setOperator}
        handleKeyPress={wrapper.instance().handleKeyPress}
        numbers={wrapper.instance().state.numbers}
        operators={wrapper.instance().state.operators}
        updateDisplay={wrapper.instance().updateDisplay}
        />,
    ])).toEqual(true);
  });

  describe('mounted Calculator', () => {

    let wrapper;

    beforeEach(() => wrapper = mount(<Calculator />));

    it('calls the updateDisplay method when a number is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.number-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  
    it('calls the setOperator method when an operator key is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'setOperator');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.operator-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  
    it('calls the callOperator method when the submit key is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'callOperator');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.submit-key').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

  });

  describe('updateDisplay', () => {

    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('the method updates the displayValue when it is called', () => {
      wrapper.instance().updateDisplay('8');
      expect(wrapper.state('displayValue')).toEqual('8');
    });

    it('concatenates the latest displayValue with the last state value', () => {
      wrapper.instance().updateDisplay('2');
      wrapper.instance().updateDisplay('3');
      expect(wrapper.state('displayValue')).toEqual('23');
    });

    it('sets the displayValue to 0 if the displayValue is not entered', () => {
      wrapper.instance().updateDisplay('0');
      expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('removes the initial 0 from displayValue when values are entered', () => {
      wrapper.instance().updateDisplay('0');
      expect(wrapper.state('displayValue')).toEqual('0');
      wrapper.instance().updateDisplay('4');
      expect(wrapper.state('displayValue')).toEqual('4');
    });

    it('will always display a single 0 even if 0 is pressed multiple times', () => {
      wrapper.instance().updateDisplay('0');
      wrapper.instance().updateDisplay('0');
      wrapper.instance().updateDisplay('0');
      expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('pressing ce removes the most recently added value of displayValue', () => {
      wrapper.instance().updateDisplay('6');
      wrapper.instance().updateDisplay('5');
      wrapper.instance().updateDisplay('ce');
      expect(wrapper.state('displayValue')).toEqual('6')
    });

    it('no matter how many times "." is entered, it only appears once', () => {
      wrapper.instance().updateDisplay('4')
      wrapper.instance().updateDisplay('.');
      wrapper.instance().updateDisplay('.');
      wrapper.instance().updateDisplay('5');
      wrapper.instance().updateDisplay('.');
      wrapper.instance().updateDisplay('.');
      expect(wrapper.state('displayValue')).toEqual('4.5');
    });
  });

  describe('setOperator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('knows which operator has been selected', () => {
      wrapper.instance().setOperator('+');
      expect(wrapper.state('selectedOperator')).toEqual('+');
      wrapper.instance().setOperator('/');
      expect(wrapper.state('selectedOperator')).toEqual('/')
    });

    it('updates the value of storedValue to the value of displayValue', () => {
      wrapper.setState({ displayValue: '5' });
      wrapper.instance().setOperator('+');
      expect(wrapper.state('storedValue')).toEqual('5');
    });

    it('updates the value of displayValue to 0', () => {
      wrapper.setState({ displayValue: '4' });
      wrapper.instance().setOperator('*');
      expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('if the selectedOperator is not an empty string, it does not update storedValue', () => {
      wrapper.setState({ displayValue: '6' });
      wrapper.instance().setOperator('-');
      expect(wrapper.state('storedValue')).toEqual('6');
      wrapper.instance().setOperator('+');
      expect(wrapper.state('storedValue')).toEqual('6');
    });
  });

  describe('callOperator', () => {

    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('selecting the multiplication operator updates the displayValue to be the product of the storedValue and displayValue combined', () => {
      wrapper.setState({ storedValue: '4' });
      wrapper.setState({ displayValue: '3'});
      wrapper.setState({ selectedOperator: '*' })
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('12');
    });

    it('selecting the addition operator updates the displayValue to be the sum of the storedValue and the displayValue', () => {
      wrapper.setState({ storedValue: '3' });
      wrapper.setState({ displayValue: '5' });
      wrapper.setState({ selectedOperator: '+' })
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('8');
    });

    it('selecting the subtraction operator updates the displayValue so that it is the difference of the storedValue and the displayValue', () => {
      wrapper.setState({ storedValue: '9' });
      wrapper.setState({ displayValue: '4' });
      wrapper.setState({ selectedOperator: '-' })
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('selecting the division operator updates the displayValue so that it is the quotient of the storedValue and the displayValue', () => {
      wrapper.setState({ storedValue: '8' });
      wrapper.setState({ displayValue: '2' });
      wrapper.setState({ selectedOperator: '/' });
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('4');
    });

    it('updates the displayValue to 0 if the calculation results in something that is not a number', () => {
      wrapper.setState({ storedValue: '4' });
      wrapper.setState({ displayValue: 'string' });
      wrapper.setState({ selectedOperator: '/' });
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('0');
    }); 

    it('updates the displayValue to be 0 if the result of the calculation results in an undefined number', () => {
      wrapper.setState({ storedValue: '3' });
      wrapper.setState({ displayValue: '0' });
      wrapper.setState({ selectedOperator: '*' });
      wrapper.instance().callOperator();
      expect(wrapper.state('displayValue')).toEqual('0');

    })
  });



});