import React, { useState, useContext } from 'react';

import axios from '../../../axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { useHistory } from 'react-router-dom';
import combinedForms from '../../../forms/ad/combined';
import {updateObject, checkValidity} from '../../../shared/utility';
import {AdsContext} from '../../../hoc/ContextAPI/AuthContext';
import classes from './CreateAd.module.css';


const CreateNewAd = props => {

    const [adData, setAdData] = useState(combinedForms);
    const [isSending, setIsSending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const {dispatchAds} = useContext(AdsContext)

    const history = useHistory()

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
        

        setIsSending(true);

        const adDataToSave = new FormData();

        for (var x = 0; x<adData.imgUpload.value.length; x++){
            adDataToSave.append("photos", adData.imgUpload.value[x])
        }

        var formValues =  {} //new FormData()
        for(var el in adData){
            var value = {[el]: adData[el].value}
            formValues = updateObject(formValues, value)
        }
       
        adDataToSave.append("formValues", JSON.stringify(formValues))
        
        console.log("adDataToSave: ", adDataToSave)

        axios.post('/ads', adDataToSave)
        .then((res) => {
            setIsError(false)
            dispatchAds({type: "setAds", ads: null})
            setAdData(combinedForms)
            setIsSending(false)
            history.push("/ads/me")
        })
        .catch((err) => {
            // console.log(err)
            setIsError(true)
            setIsSending(false)
        })
        
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
                <br/>
                {isError ? <span className={classes.error}>Please make sure the form was filled out correctly and you only uploaded Images</span> : null}
                {!formIsValid ? <span className={classes.error}>Please fill out the Form correctly</span> : null}
                <br/>
                {isSending ? <Spinner /> : <Button btnType="Success" disabled={!formIsValid}>Publish Ad</Button>}   
            </form>
            
        </React.Fragment>

    );
}

export default CreateNewAd;