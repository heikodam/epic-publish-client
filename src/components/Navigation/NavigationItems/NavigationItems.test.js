import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import {AuthContext, AdsContext} from '../../../hoc/ContextAPI/AuthContext';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// configure({adapter: new Adapter()})

test(' Should render Logged out NavigationItems ', () => {
    const renderedNavigation = render(
        <AuthContext.Provider value={{isUser: true}}>
        <Router>
            <NavigationItems />
        </Router>
        </AuthContext.Provider>
    )
    expect(renderedNavigation.getAllByText("Home")).toHaveLength(1);
    expect(renderedNavigation.getAllByText("Your Ads")).toHaveLength(1);
    expect(renderedNavigation.getAllByText("Marketplaces")).toHaveLength(1);
    expect(renderedNavigation.getAllByText("Profile")).toHaveLength(1);
    expect(renderedNavigation.getAllByText("Logout")).toHaveLength(1);
})

test(' Should render Logged out NavigationItems ', () => {

    const renderedNavigation = render(
        <AuthContext.Provider value={{isUser: false}}>
            <Router>
                <NavigationItems />
            </Router>
        </AuthContext.Provider>
    )
    // console.log(renderedNavigation.container)
    expect(renderedNavigation.getByText("Login")).toBeTruthy();
    expect(renderedNavigation.getByText("Signup")).toBeTruthy();
})