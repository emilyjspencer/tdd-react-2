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
        numbers={wrapper.instance().state.numbers}
        operators={wrapper.instance().operators}
        updateDisplay={wrapper.instance().updateDisplay}
        />
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

});