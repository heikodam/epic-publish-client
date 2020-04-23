import React from 'react';

import classes from './ViewAd.module.css';
import HouseIcon from '../../../../resources/house_icon.png';


const ViewAd = (props) => {
    return (
        <div className={classes.adFrame}>
            <div className={[classes.column, classes.left].join(" ")}>
                <img src={HouseIcon} alt="" className={classes.avatar}/>
                <p>{props.date} </p>
                <div>
                    <button type="button" className={classes.del_btn} onClick={() => props.delAd(props.adId)}>Delete</button>
                    <button type="button" className={classes.edt_btn} >Edit</button>
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