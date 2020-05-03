import React, { useState, useContext } from 'react';

import axios from '../../../axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import combinedForms from '../../../forms/ad/combined';
import {updateObject, checkValidity} from '../../../shared/utility';
import {AdsContext} from '../../../hoc/ContextAPI/AuthContext';


const CreateNewAd = props => {

    const [adData, setAdData] = useState(combinedForms);
    const [isSending, setIsSending] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const {dispatchAds} = useContext(AdsContext)

    const inputChangeHandler = (event, formElName) => {


        var updatedFormElement = {}
        if(formElName === "imgUpload"){
            updatedFormElement = updateObject(adData[formElName], {
                value: event.target.files,
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
        
        // console.log(adData);

        setIsSending(true);

        const adDataToSave = new FormData();

        for (var x = 0; x<adData.imgUpload.value.length; x++){
            adDataToSave.append("photos", adData.imgUpload.value[x])
        }

        // adDataToSave.append('photos', adData.imgUpload.value)

        // console.log("Ecntype: ",adData.imgUpload.value[0])

        var formValues =  {} //new FormData()
        for(var el in adData){
            var value = {[el]: adData[el].value}
            formValues = updateObject(formValues, value)
        }
       
        adDataToSave.append("formValues", JSON.stringify(formValues))
        
        console.log("adDataToSave: ", adDataToSave)

        axios.post('/ads', adDataToSave)
        .then((res) => {
            console.log("Sucessfully return")
            console.log(res)
            setIsSending(false)
        })
        .catch((err) => {
            console.log(err)
            setIsSending(false)
        })
        dispatchAds({type: "setAds", ads: null})
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
                <input type="file" onChange={(event => inputChangeHandler(event, "imgUpload"))} encType="multipart/form-data" multiple/>
            {isSending ? <Spinner /> : <Button btnType="Success" disabled={!formIsValid}>Publish Ad</Button>}
            {!formIsValid ? <span>Please fill out the Form correctly</span> : null}
            </form>
            
        </React.Fragment>

    );
}

export default CreateNewAd;