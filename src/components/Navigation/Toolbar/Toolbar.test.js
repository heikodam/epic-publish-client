import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar';
import NavigationItems from '../NavigationItems/NavigationItems';

configure({adapter: new Adapter()})

describe("Render the Toolbar correctly", () => {
    it("Should render static frame of page, with NavItems", () => {
        const wrapper = shallow(<Toolbar />)
        expect(wrapper.find(<nav><NavigationItems/></nav>)).toBeTruthy()
    })
})