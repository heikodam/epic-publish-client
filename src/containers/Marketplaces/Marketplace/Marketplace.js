import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import {updateObject} from '../../../shared/utility';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './Marketplace.module.css';


const Profile = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [marketplace, setMarketplace] = useState({});
    const [isEditing, setIsEditing] = useState(false)
    const history = useHistory()
    const marketplaceId = props.match.params.id


    const delBtnHandler = () => {
        
            axios.delete('/marketplaces/me/'+ marketplaceId)
            .then(
                history.push("/marketplaces/me")
            ).catch(
                setIsError(true)
            )
    }

    const edtBtnHandler = () => {
        setIsEditing(true)
    }

    const onChangeHandler = (event, key) => {
        const updatedMarketplace = updateObject(marketplace, {[key]: event.target.value})
        setMarketplace(updatedMarketplace);
    }

    const onSubmitHandler = (event) => {

        event.preventDefault();
        var updatedMarketplace = {...marketplace}
        delete updatedMarketplace._id 
        delete updatedMarketplace.__v 
        delete updatedMarketplace.userId 
        delete updatedMarketplace.password 
        delete updatedMarketplace.marketplace

        axios.patch('/marketplaces/me/' + marketplaceId, updatedMarketplace)
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
        axios.get('/marketplaces/me/' + marketplaceId)
        .then((res) => {
            setIsError(false)
            setMarketplace(res.data)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
            
        
        
    }, [marketplaceId])

    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classEdt_btn = [classes.edt_btn, classes.button].join(" ")



    return (
        <div>            
            <h1>Details of your Profile: </h1>
            <button type="button" className={classDel_btn} onClick={() => delBtnHandler()}>Delete</button>
            <button type="button" className={classEdt_btn} onClick={edtBtnHandler}>Edit</button>
            
            {isLoading ? <Spinner /> : (
                <div>
                    <p>To change the Marketplace and your Password, delete this Marketplace and create a new one</p>
                    <form onSubmit={onSubmitHandler}>
                        <div className={classes.block}>
                            <h4 className={classes.title}>Username: </h4>       
                            {isEditing ? <input value={marketplace.username} onChange={(event) => onChangeHandler(event, "username")} /> : <p className={classes.value}>{marketplace.username}</p>}
                        </div> 
                        <div className={classes.block}>
                            <h4 className={classes.title}>Marketplace: </h4>       
                            <p className={classes.value}>{marketplace.marketplace}</p>
                        </div>
                        {isEditing ? <Button btnType="Success">Save</Button> : null}
                    </form>
                </div>
            )}
            
            {isError ? <p className={classes.error}>There was an error</p> : null}
        </div>
    )
}

export default Profile;