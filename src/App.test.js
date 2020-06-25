import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from './Calculator';

describe('App', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders an instance of the Calculator component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Calculator />)).toEqual(true);
  });
});
