import React, { useContext } from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {AuthContext} from '../../../hoc/ContextAPI/AuthContext';

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
                <NavigationItem link='/market-user-data'>Enter Market Login Details</NavigationItem>
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