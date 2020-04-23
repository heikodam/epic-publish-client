import React, {useState, useEffect} from 'react';


import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ViewAd from './ViewAd/ViewAd';



const ViewAds = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [ads, setAds] = useState([]);

    // Code from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
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
        console.log("deleted ad: ", adId)
    }


    useEffect(() => {
        axios.get('/ads')
        .then((res) => {
            console.log(res.data)
            setAds(res.data)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setAds("Please Login to See your ads")
            setIsLoading(false)
        })
    }, [])

    let adsEl = ads.map((ad) => {
    return (
        <ViewAd 
                key = {ad._id}
                adId = {ad._id}
                date = {formatDate(ad.date)}
                title = {ad.title}
                description = {ad.description}
                marketplaces = {["Ebay-Kleinanzeige", "Immowelt"]}
                delAd = {(adId) => delBtnHandler(adId)}
            />
    )});
    


    return (
        <React.Fragment>
            <h1>View all your ads here</h1>
            {isLoading ? <Spinner /> : null}
            {adsEl}
        </React.Fragment>
    );
}


export default ViewAds;