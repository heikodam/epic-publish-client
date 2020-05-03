import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ViewAd from './ViewAd/ViewAd';
import {AdsContext} from '../../../hoc/ContextAPI/AuthContext';
import classes from './ViewAds.module.css';
import {formatDate} from '../../../shared/utility';


const ViewAds = () => {


    const [isLoading, setIsLoading] = useState(false);
    const {contextAds, dispatchAds} = useContext(AdsContext);

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
    }


    const delAds = () => {
        axios.delete('/ads/me')
        .then(() => {
            dispatchAds({type: "setAds", ads: []})
        })
    }

    const history = useHistory()
    const createAd = () => {
        history.push("/ads/create")
    }

    const dltBtnHandler = (adId) => {
        history.push("/ads/me/" + adId)
    }

    useEffect(() => {
        if(!contextAds){
            setIsLoading(true)
            axios.get('/ads/me')
            .then((res) => {
                dispatchAds({type: "setAds", ads: res.data})
                setIsLoading(false)
                
            })
            .catch((err) => {
                dispatchAds({type: "setAds", ads: null})
                setIsLoading(false)
            })
        }
        
    }, [dispatchAds, contextAds])

    const defaultPic = "https://res.cloudinary.com/heikodam/image/upload/v1588514069/house_icon_adq7te.png"
    let adsEl = []

    if(contextAds){
        adsEl = contextAds.map((ad) => {
            return (
                <ViewAd 
                        key = {ad._id}
                        adId = {ad._id}
                        date = {formatDate(ad.date)}
                        title = {ad.title}
                        description = {ad.description}
                        marketplaces = {["Ebay-Kleinanzeige", "Immowelt"]}
                        imgLink = {ad.imgs[0] ? ad.imgs[0].url : defaultPic}
                        delAd = {(adId) => delBtnHandler(adId)}
                        dltAd = {(adId) => dltBtnHandler(adId)}
                    />
            )}).reverse();
    }
    
    
    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classEdt_btn = [classes.edt_btn, classes.button].join(" ")

    return (
        <React.Fragment>
            <h1>View all your ads here</h1>
            <div>
                <button type="button" className={classDel_btn} onClick={delAds}>Delete All Ads</button>
                <button type="button" className={classEdt_btn} onClick={createAd}>Create New Ad</button>
            </div>
            {isLoading ? <Spinner /> : null}
            {adsEl}
        </React.Fragment>
    );
}


export default ViewAds;