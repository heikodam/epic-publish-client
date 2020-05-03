import React, {useState, useEffect, useContext} from 'react';

import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

import {AuthContext} from '../../hoc/ContextAPI/AuthContext';


const Logout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const { dispatchUser } = useContext(AuthContext);


    useEffect(() => {
        axios.post('/users/logout')
        .then((res) => {
            console.log(res)
            dispatchUser({type: "isNotUser"})
            setIsLoggedOut(true)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log("IN CATCH")
            console.log(err)
            setIsLoggedOut(false)
            setIsLoading(false)
        })
    }, [dispatchUser])

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> : null}
            {isLoggedOut ? <span>You are all logged out</span> : <span>You are still logged in</span>}
        </React.Fragment>
    );
}


export default Logout;