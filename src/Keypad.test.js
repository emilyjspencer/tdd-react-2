import React from 'react';
import { shallow } from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Keypad
          callOperator={jest.fn()}
          numbers={[]}
          operators={[]}
          setOperator={jest.fn()}
          updateDisplay={jest.fn()}
        />
        );
    });

  it ('it should render 2 <div />\'s', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });

  it('renders the value of the numbers prop', () => {
    wrapper.setProps({numbers: ['4', '5', '6']});
    expect(wrapper.find('.numbers-container').text()).toEqual('456');
  });

});