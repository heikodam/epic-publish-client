import React from 'react';

import classes from './ViewAd.module.css';


const ViewAd = (props) => {

    const classDel_btn = [classes.del_btn, classes.button].join(" ")
    const classDlt_btn = [classes.dlt_btn, classes.button].join(" ")

    return (
        <div className={classes.adFrame}>
            <div className={[classes.column, classes.left].join(" ")}>
                <img src={props.imgLink} alt="" className={classes.avatar}/>
                <p>{props.date} </p>
                <div>
                    <button type="button" className={classDel_btn} onClick={() => props.delAd(props.adId)}>Delete</button>
                    <button type="button" className={classDlt_btn} onClick={() => props.dltAd(props.adId)}>Details</button>
                </div>
            </div>
            <div className={[classes.column, classes.middle].join(" ")}>
                <h3>{props.title}</h3>
                <p> {props.description} </p>
            </div>
            <div className={[classes.column, classes.right].join(" ")}>
                <h4>Marketplaces on:</h4>
                {props.marketplaces.map((marketplace) => <li key={marketplace}>{marketplace}</li>)}
            </div>
        </div>
    )
}

export default ViewAd;