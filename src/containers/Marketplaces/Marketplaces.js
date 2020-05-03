import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Marketplaces.module.css';


const Marketplaces = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [marketplaces, setMarketplaces] = useState(null)

    const delBtnHandler = (marketplaceId) => {
        axios.delete('/marketplaces/me/' + marketplaceId)
        .then(() => {            
            const copyMarketplaces = marketplaces.map((marketplace) => {
                return Object.assign({}, marketplace)
            })
            const removeIndex = copyMarketplaces.map((marketplace) => {return marketplace._id}).indexOf(marketplaceId)
            copyMarketplaces.splice(removeIndex, 1)

            setMarketplaces(copyMarketplaces)
        })
    }


    const delMarketplaces = () => {
        axios.delete('/marketplaces/me')
        .then(() => {
            setMarketplaces([])
        })
    }

    const history = useHistory()
    const createMarketplaces = () => {
        history.push("/marketplaces/create")
    }

    const dltBtnHandler = (marketplaceId) => {
        history.push("/marketplaces/me/" + marketplaceId)
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get('/marketplaces/me')
        .then((res) => {
            setMarketplaces(res.data)
            setIsLoading(false)
            
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
        
        
    }, [])

    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classDlt_btn = [classes.dlt_btn, classes.button].join(" ")
    const classEdt_btn = [classes.edt_btn, classes.button].join(" ")

    let marketplaceEl = []
    if(marketplaces){
        marketplaceEl = marketplaces.map((marketplace) => {
            return (
                <div key={marketplace._id} className={classes.marketplace}>
                    <button type="button" className={classDel_btn} onClick={() => delBtnHandler(marketplace._id)}>Delete</button>
                    <button type="button" className={classDlt_btn} onClick={() => dltBtnHandler(marketplace._id)}>Details</button>

                    <h4 className={classes.title}>Marketplace: </h4>
                    <p className={classes.value}>{marketplace.marketplace}</p>

                    <h4 className={classes.title}>Username: </h4>
                    <p className={classes.value}>{marketplace.username}</p>

                    
                </div>
                )}).reverse();
    }
        

    return (
        <React.Fragment>
            <h1>Your Marketplaces </h1>
            {isError ? <p className={classes.error} >There was a error</p> : null}
            <div>
                <button type="button" className={classDel_btn} onClick={delMarketplaces}>Delete All Marketplaces</button>
                <button type="button" className={classEdt_btn} onClick={createMarketplaces}>Create New Marketplaces</button>
            </div>
            {isLoading ? <Spinner /> : null}
            {marketplaceEl}
        </React.Fragment>
    );
}


export default Marketplaces;