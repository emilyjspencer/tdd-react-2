import React from 'react';
import { shallow } from 'enzyme';
import Key from './Key';

describe('Key', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
       <Key
          keyAction={jest.fn()}
          keyType={''}
          keyValue={''}
        />   
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });


  it('renders the value of keyValue', () => {
    wrapper.setProps({ keyValue: 'hi'})
    expect(wrapper.text()).toEqual('hi');
  });
})