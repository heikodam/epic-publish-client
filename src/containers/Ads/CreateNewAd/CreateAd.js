import React, { useState } from 'react';

import axios from '../../../axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import combinedForms from '../../../forms/ad/combined';
import {updateObject, checkValidity} from '../../../shared/utility';


const CreateNewAd = props => {

    const [adData, setAdData] = useState(combinedForms);
    const [isSending, setIsSending] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);

    const inputChangeHandler = (event, formElName) => {


        var updatedFormElement = {}
        if(formElName === "imgUpload"){
            updatedFormElement = updateObject(adData[formElName], {
                value: event.target.files[0],
                // valid: checkValidity(
                //     event.target.value,
                //     adData[formElName].validation
                // ),
                // touched: true
            });

        } else {
            updatedFormElement = updateObject(adData[formElName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    adData[formElName].validation
                ),
                touched: true
            });
        }
        
        const updatedAdData = updateObject(adData, {[formElName]: updatedFormElement});
        // console.log(adData)
        setAdData(updateObject(updatedAdData));

        // CHECK IF FORM IS VALID TO ENABLE THE FORM SUBMIT BUTTON
        // let formIsValid = true;
        // for (let inputIdentifier in updatedAdData) {
        // formIsValid = updatedAdData[inputIdentifier].valid && formIsValid;
        // }
        // console.log(formIsValid)
        setFormIsValid(true)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSending(true);

        const adDataToSave = new FormData();
        adDataToSave.append('imgUpload', adData.imgUpload.value)

        var formValues =  {} //new FormData()
        for(var el in adData){
            var value = {[el]: adData[el].value}
            formValues = updateObject(formValues, value)
        }
       
        adDataToSave.append("formValues", JSON.stringify(formValues))
        

        axios.post('/create-ad', adDataToSave)
        .then((res) => {
            console.log("Sucessfully return")
            console.log(res)
            setIsSending(false)
        })
        .catch((err) => {
            console.log(err)
            setIsSending(false)
        })
        setAdData(combinedForms)
    }

    // Creating the Form
    let formElArray = [];
    for (let key in adData){
        formElArray.push(adData[key])
    }
    let form = formElArray.map(formEl => (
        <Input
            key={formEl.name}
            elType = {formEl.elType}
            elConfig = {formEl.elConfig}
            label = {formEl.label}
            value = {formEl.value}
            invalid={!formEl.valid}
            shouldValidate={formEl.validation}
            touched={formEl.touched}
            changed = {(event) => inputChangeHandler(event, formEl.name)}
        />
    ));

    return (

        <React.Fragment>
            <h3> Create a New Ad here</h3>

            <form onSubmit={onSubmitHandler}>
                {form}
                <input type="file" onChange={(event => inputChangeHandler(event, "imgUpload"))}/>
            {isSending ? <Spinner /> : <Button btnType="Success" disabled={!formIsValid}>Publish Ad</Button>}
            {!formIsValid ? <span>Please fill out the Form correctly</span> : null}
            </form>
            
        </React.Fragment>

    );
}

export default CreateNewAd;