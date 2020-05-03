import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import {updateObject, formatDate} from '../../../shared/utility';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './Profile.module.css';


const Profile = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false)
    const history = useHistory()
    


    const delBtnHandler = (adId) => {
        // First delete Marketplaces
        // Delte all ads
        if(window.confirm("This will delete all your data and account")){
            try {
                axios.delete('/ads/me')
                axios.delete('/marketplaces/me')
                axios.delete('/users/me')

                
                history.push("/logout")
            } catch {
                setIsError(true)
            }
            
        }
    }

    const edtBtnHandler = () => {
        setIsEditing(true)
    }

    const onChangeHandler = (event, key) => {
        const updatedAd = updateObject(profile, {[key]: event.target.value})
        setProfile(updatedAd);
    }

    const onSubmitHandler = (event) => {

        event.preventDefault();
        var updatedProfile = {...profile}
        delete updatedProfile.date 
        axios.patch('/users/me/', updatedProfile)
        .then(() => {
            setIsError(false)
            setIsEditing(false)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })

        
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get('/users/me/')
        .then((res) => {
            setIsError(false)
            setProfile(res.data)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
            
        
        
    }, [])

    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classEdt_btn = [classes.edt_btn, classes.button].join(" ")

    var profileDetails = [];
    const profileKeys = Object.keys(profile)

    const notDisplayKeys = ["date"]
    profileDetails = profileKeys.map((key) => {
        if(typeof(profile[key]) === "object" || notDisplayKeys.includes(key)){
            return null
        }
        return (
        <div key={key} className={classes.block}>
            <h4 className={classes.title}>{key}: </h4>       
            {isEditing ? <input value={profile[key]} onChange={(event) => onChangeHandler(event, key)} /> : <p className={classes.value}>{profile[key]}</p>}
        </div>
    )})


    return (
        <div>            
            <h1>Details of your Profile: </h1>
            <button type="button" className={classDel_btn} onClick={() => delBtnHandler()}>Delete</button>
            <button type="button" className={classEdt_btn} onClick={edtBtnHandler}>Edit</button>
            
            {isLoading ? <Spinner /> : (
                <div>
                    <div className={classes.block}>
                        <h4 className={classes.title}>Date: </h4>       
                        <p className={classes.value}>{formatDate(profile.date)}</p>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        {profileDetails}
                        {isEditing ? <Button btnType="Success">Save</Button> : null}
                    </form>
                </div>
            )}
            
            {isError ? <p className={classes.error}>There was an error</p> : null}
        </div>
    )
}

export default Profile;