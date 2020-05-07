import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {AuthContext, AdsContext} from '../../../ContextAPI/Context';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


test(' Should render Logged In NavigationItems ', () => {
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

test(' Should render Logged Out NavigationItems ', () => {

    const renderedNavigation = render(
        <AuthContext.Provider value={{isUser: false}}>
            <Router>
                <NavigationItems />
            </Router>
        </AuthContext.Provider>
    )
    expect(renderedNavigation.getByText("Login")).toBeTruthy();
    expect(renderedNavigation.getByText("Signup")).toBeTruthy();
})