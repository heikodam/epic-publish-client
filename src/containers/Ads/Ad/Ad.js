import React, {useState, useEffect, useContext} from 'react';
import {AdsContext} from '../../../ContextAPI/Context';
import { useHistory } from 'react-router-dom';

import {updateObject} from '../../../shared/utility';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './Ad.module.css';


const Ad = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [ad, setAd] = useState({});
    const [isEditing, setIsEditing] = useState(false)
    const {contextAds, dispatchAds} = useContext(AdsContext);
    const adId = props.match.params.id

    const history = useHistory()
    


    const delBtnHandler = (adId) => {
        axios.delete('/ads/me/' + adId)
        .then(() => {            
            const copyAds = contextAds.map((ad) => {
                return Object.assign({}, ad)
            })
            const removeIndex = copyAds.map((ad) => {return ad._id}).indexOf(adId)
            copyAds.splice(removeIndex, 1)

            dispatchAds({type: "setAds", ads: copyAds})
        })
        history.push("/ads/me")
    }

    const edtBtnHandler = () => {
        setIsEditing(true)
    }

    const onChangeHandler = (event, key) => {

        // const updatedAd = Object.assign(ad, {[key]: event.target.value})
        const updatedAd = updateObject(ad, {[key]: event.target.value})
        setAd(updatedAd);
    }

    const onSubmitHandler = (event) => {

        event.preventDefault();

        axios.patch('/ads/me/' + adId, ad)
        .then((res) => {
            dispatchAds({type: "setAds", ads: null})
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
        if(!contextAds){
            setIsLoading(true)
            axios.get('/ads/me/' + adId)
            .then((res) => {
                // console.log("Res data: ", res.data)
                setIsError(false)
                setAd(res.data)
                setIsLoading(false)
                // console.log("Ad from Backend: ", ad)
                
            })
            .catch((err) => {
                setIsError(true)
                setIsLoading(false)
            })
        }else{
            const adIndex = contextAds.map((ad) => {return ad._id}).indexOf(adId)
            setAd(Object.assign({}, contextAds[adIndex]))
            // console.log(adIndex)
            // console.log("Ad from Context: ", ad)
        }
        
    }, [adId, contextAds])

    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classEdt_btn = [classes.edt_btn, classes.button].join(" ")

    var adDetails = [];
    const adKeys = Object.keys(ad)

    const notDisplayKeys = ["_id", "userId", "_v", "imgs", "date"]
    adDetails = adKeys.map((key) => {
        if(typeof(ad[key]) === "object" || notDisplayKeys.includes(key) || !ad[key]){
            return null
        }
        return (
        <div key={key} className={classes.block}>
            <h4 className={classes.title}>{key}</h4>       
            {isEditing ? <input value={ad[key]} onChange={(event) => onChangeHandler(event, key)} /> : <p className={classes.value}>{ad[key]}</p>}
        </div>
    )})

    // console.log("Ad", ad)
    var imgs = null;
    if(ad.imgs){
        imgs = ad.imgs.map((img) => (
            <img src={img.url} alt="" className={classes.img} key={img.asset_id} />
        ))
    }


    return (
        <div>            
            <h1>Details of your Ad: </h1>
            <button type="button" className={classDel_btn} onClick={() => delBtnHandler(adId)}>Delete</button>
            <button type="button" className={classEdt_btn} onClick={edtBtnHandler}>Edit</button>
            <div className={classes.block}>
                <h4 className={classes.title}>Images</h4>
                {imgs}           
            </div>
            {isLoading ? <Spinner /> : (
                <form onSubmit={onSubmitHandler}>
                    {adDetails}
                    {isEditing ? <Button btnType="Success">Save</Button> : null}
                </form>
            )}
            
            {isError ? <p className={classes.error}>There was an error</p> : null}
        </div>
    )
}

export default Ad;