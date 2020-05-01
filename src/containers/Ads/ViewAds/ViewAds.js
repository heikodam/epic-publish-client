import React, {useState, useEffect, useContext} from 'react';


import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ViewAd from './ViewAd/ViewAd';
import {AdsContext} from '../../../hoc/ContextAPI/AuthContext';



const ViewAds = () => {


    const [isLoading, setIsLoading] = useState(false);
    const {contextAds, dispatchAds} = useContext(AdsContext);

    // Code to format date from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const delBtnHandler = (adId) => {
        axios.delete('/ad/' + adId)
        .then(() => {            
            const copyAds = contextAds.map((ad) => {
                return Object.assign({}, ad)
            })
            const removeIndex = copyAds.map((ad) => {return ad._id}).indexOf(adId)
            copyAds.splice(removeIndex, 1)

            dispatchAds({type: "setAds", ads: copyAds})
        })
    }


    const edtBtnHandler = (adId) => {
        console.log("edit ad: ", adId)
        console.log("Context Api: ", contextAds)
    }


    useEffect(() => {
        console.log("Use effects running")
        console.log("ContextAds: ",contextAds)
        if(!contextAds){
            setIsLoading(true)
            axios.get('/ads')
            .then((res) => {
                console.log("Res data: ", res.data)
                dispatchAds({type: "setAds", ads: res.data})
                setIsLoading(false)
                
            })
            .catch((err) => {
                dispatchAds({type: "error"})
            })
        }
        
    }, [dispatchAds, contextAds])

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
                        delAd = {(adId) => delBtnHandler(adId)}
                        edtAd = {(adId) => edtBtnHandler(adId)}
                    />
            )}).reverse();
    }
    
    


    return (
        <React.Fragment>
            <h1>View all your ads here</h1>
            {isLoading ? <Spinner /> : null}
            {adsEl}
        </React.Fragment>
    );
}


export default ViewAds;