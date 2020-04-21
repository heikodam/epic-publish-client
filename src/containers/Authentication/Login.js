import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../../axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import {updateObject} from '../../shared/utility';
import AuthContext from '../../hoc/ContextAPI/AuthContext';
import loginForm from '../../forms/auth/loginForm';



const Login = () => {

    const { dispatchUser } = useContext(AuthContext);

    const [formData, setFormData] = useState(loginForm);

    const [isSending, setIsSending] = useState(false);
    const [isWrongData, setIsWrongData] = useState(false);
    const [isUser, setIsUser] = useState(false);



    const inputChangeHandler = (event, formElName) => {

        const updatedFormData = updateObject(formData, {
            [formElName]: {
                ...formData[formElName],
                value: event.target.value
            }
        });
        setFormData(updatedFormData)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSending(true);
        var loginData =  {};
        for(var el in formData){
            var value = {[el]: formData[el].value}
            loginData = updateObject(loginData, value)
        }
        axios.post('/login', {...loginData})
        .then((res) => {
            console.log(res)
            if(!res.data.isUser){
                setIsWrongData(true)
            }
            dispatchUser({type: "isUser"})
            setIsSending(false)
            setIsUser(true);
            
        })
        .catch((err) => {
            console.log(err)
            setIsWrongData(true)
            setIsSending(false)
        })

    }

    let formElArray = [];
    for (let key in formData){
        formElArray.push(formData[key])
    }

    let form = formElArray.map(formEl => (
        <Input
            key={formEl.name}
            elType = {formEl.elType}
            elConfig = {formEl.elConfig}
            value = {formEl.value}
            changed = {(event) => inputChangeHandler(event, formEl.name)}
        />
    ));

    return (

        <React.Fragment>
            {isUser ? <Redirect to="/" /> : null}
            <h3> Login Here </h3>

            <form onSubmit={onSubmitHandler}>
                {form}
                {isWrongData ? <p>Unable to log you in. Please check the entered data</p> : null}
                {isSending ? <Spinner /> : <Button btnType="Success">Login</Button>}
            </form>
            
        </React.Fragment>

    );

}

export default Login;