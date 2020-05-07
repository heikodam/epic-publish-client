import React, { useContext } from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {AuthContext} from '../../../ContextAPI/Context';

const NavigationItems = () => {
    const {isUser} = useContext(AuthContext);
    var menu = (
        <React.Fragment>
            <NavigationItem link='/login'>Login</NavigationItem>
            <NavigationItem link='/signup'>Signup</NavigationItem>
        </React.Fragment>
    )
    if(isUser){
        menu = (
            <React.Fragment>
                <NavigationItem link='/'>Home</NavigationItem>
                <NavigationItem link='/ads/me'>Your Ads</NavigationItem>
                <NavigationItem link='/marketplaces/me'>Marketplaces</NavigationItem>
                <NavigationItem link='/users/me'>Profile</NavigationItem>
                <NavigationItem link='/logout'>Logout</NavigationItem>
            </React.Fragment>
        )
    }
    return(
    <ul className={classes.NavigationItems}>
        {menu}
    </ul>
);}

export default NavigationItems;