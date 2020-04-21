import React, { useState } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios';


import marketLoginForm from '../../../forms/marketLogin/combined';
import {updateObject, checkValidity} from '../../../shared/utility';


const MarketUserData = () => {

    const [loginData, setLoginData] = useState(marketLoginForm);
    const [isSending, setIsSending] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [res, setRes] = useState("");

    const inputChangeHandler = (event, formElName) => {
        const updatedFormElement = updateObject(loginData[formElName], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                loginData[formElName].validation
            ),
            touched: true
        });
        const updatedLoginData = updateObject(loginData, {[formElName]: updatedFormElement});
        setLoginData(updateObject(updatedLoginData));

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginData) {
        formIsValid = updatedLoginData[inputIdentifier].valid && formIsValid;
        }
        setFormIsValid(formIsValid)
    }



    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSending(true);


        // Formatting the data as needed in the Backend
        var sendLoginData =  {};
        for(var el in loginData){
            var value = {[el]: loginData[el].value}
            sendLoginData = updateObject(sendLoginData, value)
        }


        axios.post('/market-user-data', {...sendLoginData})
        .then((res) => {
            console.log(res)
            if(!res.data.isUser){
            }
            setIsSending(false)
            setRes("Your data was saved successfully!!!");
            
        })
        .catch((err) => {
            console.log(err)
            setRes("There was an error");
            setIsSending(false)
        })

        // console.log(loginData)
        // for(var ela in loginData){
        //     setLoginData(
        //         updateObject(loginData,
        //             updateObject(loginData[ela], {value: ""})
        //         )
        //     )
        // }
        // console.log(loginData)
    }

    // Creating the Form
    let formElArray = [];
    for (let key in loginData){
        formElArray.push(loginData[key])
    }
    let form = formElArray.map(formEl => (
        <Input
            key={formEl.name}
            elType = {formEl.elType}
            elConfig = {formEl.elConfig}
            value = {formEl.value}
            invalid={!formEl.valid}
            shouldValidate={formEl.validation}
            touched={formEl.touched}
            changed = {(event) => inputChangeHandler(event, formEl.name)}
        />
    ));

    return (

        <React.Fragment>
            <h3> Enter Marketplace Login Data here</h3>
            <p>Please make sure the data you enter is correct</p>

            <form onSubmit={onSubmitHandler}>
                {form}
            {isSending ? <Spinner /> : <Button btnType="Success" disabled={!formIsValid}>Publish Ad</Button>}
            {!formIsValid ? <span>Please fill out the Form correctly</span> : null}
            <p>{res}</p>
            </form>
            
        </React.Fragment>

    );

}

export default MarketUserData;