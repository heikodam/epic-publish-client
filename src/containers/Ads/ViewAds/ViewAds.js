import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ViewAd from './ViewAd/ViewAd';
import {AdsContext} from '../../../ContextAPI/Context';
import classes from './ViewAds.module.css';
import {formatDate} from '../../../shared/utility';


const ViewAds = () => {


    const [isLoading, setIsLoading] = useState(false);
    const {contextAds, dispatchAds} = useContext(AdsContext);
    const [localAds, setLocalAds] = useState()
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setLocalAds(contextAds)
    }, [contextAds])

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

    const searchChangeHandler = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const filteredAds = contextAds.filter((ad) => {
                // Check in title or description
                // make lowercase and remove spaces
                return (ad.title.toLowerCase().replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, '')) || 
                ad.description.toLowerCase().replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))
                )
            })

            setLocalAds(filteredAds)

        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [searchValue, contextAds])

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

    if(localAds){
        adsEl = localAds.map((ad) => {
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
            <Input 
            elType = {"input"}
            elConfig = {{placeholder: "Search Ads...", type: "text"}}
            value = {searchValue}
            changed = {(event) => searchChangeHandler(event)}
            />
            {/* <input className={classes.searchBar} type="text" placeholder="Search Ads..." value={searchValue} onChange={(event) => {searchChangeHandler(event)}}></input> */}
            {isLoading ? <Spinner /> : null}
            {adsEl}
        </React.Fragment>
    );
}


export default ViewAds;