import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from './Calculator';

describe('App', () => {

  let  wrapper;

  beforeEach(() => wrapper = shallow(<App />));


  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders an instance of the Calculator component', () => {
    expect(wrapper.containsMatchingElement(<Calculator />)).toEqual(true);
  });
});
