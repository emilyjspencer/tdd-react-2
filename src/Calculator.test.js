import React from 'react';
import { shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from './Display';

describe('Calculator', () => {
    
  let wrapper;

  beforeEach(() => wrapper = shallow(<Calculator />));

  it('it should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('should render an instance of the Display Component', () => {
    expect(wrapper.containsMatchingElement(<Display />)).toEqual(true);
  });
});