import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import signUpForm from '../../../forms/auth/signUpForm';
import {updateObject, checkValidity} from '../../../shared/utility';
import axios from '../../../axios';

import {AuthContext} from '../../../ContextAPI/Context';



const SignUp = () => {

    const [formData, setFormData] = useState(signUpForm);

    const [isSending, setIsSending] = useState(false);
    const [isUser, setIsUser] = useState(undefined);
    const [formIsValid, setFormIsValid] = useState(false);
    

    const { dispatchUser } = useContext(AuthContext);



    const inputChangeHandler = (event, formElName) => {
        const updatedFormData = updateObject(formData, {
            [formElName]: {
                ...formData[formElName],
                value: event.target.value
            }
        });
        updatedFormData[formElName].touched = true;
        const {isValid, errMsg} = checkValidity(updatedFormData[formElName].value, updatedFormData[formElName].validation)
        updatedFormData[formElName].valid = isValid;
        updatedFormData[formElName].errMsg = errMsg;

        setFormData(updatedFormData);

        
    }


    // Check if everything in form is valid
    useEffect(() => {
        let isValid = true;
        for (let inputIdentifier in formData) {
            isValid = formData[inputIdentifier].valid && isValid;
        }
        setFormIsValid(isValid)
    }, [formData])

    // Check if Passwords are equal
    useEffect(() => {
        if(!(formData.password.value === formData.confirmPassword.value) && (!formData.confirmPassword.errMsg) && (formData.confirmPassword.touched)){
            const errMsg = "The Passwords do not match"
            const updatedFormDataEl = updateObject(formData.confirmPassword, {errMsg: errMsg, valid: false})
            const updatedFormData = updateObject(formData, {[updatedFormDataEl.name] :updatedFormDataEl})
            setFormData(updatedFormData)
        }
    }, [formData])

    // Validate that email is not in use
    useEffect(() => {
        const timer = setTimeout(() => {
            axios.post("/emailUsed", {email: formData.email.value})
            .then((res) => {
                if(!formData.email.errMsg && res.data){
                    const errMsg = "This email is not available"
                    const updatedFormDataEl = updateObject(formData.email, {errMsg: errMsg, valid: false})
                    const updatedFormData = updateObject(formData, {[updatedFormDataEl.name] :updatedFormDataEl})
                    setFormData(updatedFormData)
                }
            })
            .catch((err) => {
                console.log("There was an error");
            })

        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [formData])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSending(true);

        var signupData = {}
        for(var el in formData){
            const value = {[el]: formData[el].value}
            signupData = updateObject(signupData, value)
        }

        delete signupData.confirmPassword

        axios.post('/users', signupData)
        .then((res) => {
            dispatchUser({type: "isUser"})
            setIsSending(false)
            setIsUser(true)
        })
        .catch((err) => {
            setIsUser(false)
            setIsSending(false)

        })
    }

    // Creating the Signup Form dynamically
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
            invalid={!formEl.valid}
            shouldValidate={formEl.validation}
            touched={formEl.touched}
            changed = {(event) => inputChangeHandler(event, formEl.name)}
            errMsg = {formEl.errMsg}
        />
    ));
    	

    return (
        <React.Fragment>
            {isUser ? <Redirect to="/" /> : null}
            <h3> SignUp: </h3>

            <form onSubmit={onSubmitHandler}>
                {form}

                {isUser === false || !formIsValid ? <p>Please fill out the Form correctly</p> : null}
                {isSending ? <Spinner /> : <Button btnType="Success" disabled={!formIsValid}>Sign Up</Button>}
            </form>
            
        </React.Fragment>

    );

}

export default SignUp;