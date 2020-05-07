import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from './Input';

configure({adapter: new Adapter()})

describe("Test if correct Input field is rendered with according to props past", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Input />)
    })

    it("should render normal input el", () => {
        wrapper.setProps({elType: "input"});
        expect(wrapper.find(<input />)).toBeTruthy();
    })

    it("should render textarea input el", () => {
        wrapper.setProps({elType: "textarea"});
        expect(wrapper.containsMatchingElement(<textarea></textarea>)).toBeTruthy();
    })

    it("should render select input el", () => {
        wrapper.setProps({elConfig: {options: []}, elType: "select", });
        expect(wrapper.containsMatchingElement(<select></select>)).toBeTruthy();
    })
    
})