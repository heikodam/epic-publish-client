import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render 2 elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });


    // THESE WORK THEORETICALLY, BUT ENZYME DOES NOT ALLOW TO SET STATE IN FUNCTIONAL COMPONENTS
    // it('should render 5 elements if authenticated', () => {
    //     wrapper.setState({isUser: true})
    //     expect(wrapper.find(NavigationItem)).toHaveLength(5);
    // });

    // it('should render Logout Link elements if authenticated', () => {
    //     wrapper.setState({isUser: true})
    //     expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    // });


});