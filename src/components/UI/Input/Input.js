import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elType){
        case('input'):
            inputElement = <input   
                            className={inputClasses.join(' ')} 
                            {...props.elConfig} 
                            value={props.value}
                            onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elConfig} 
                            value={props.value}
                            onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (<select 
                className={inputClasses.join(' ')} 
                onChange={props.changed} 
                value={props.value}>
                                {props.elConfig.options.map(option => (
                                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                                ))}
                            </select>);
            break;
        case ('checkbox'):
            inputElement = props.elConfig.options.map((option) => (
                <div key={option.value}>
                        <input type="checkbox" name={option.name} value={option.value} />
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
            ))
            
            break;
        case ('radio'):
            inputElement = props.elConfig.options.map((option) => (
                <div key={option.value}>
                        <input type="radio" name={option.name} value={option.value} checked={option.checked}/>
                        <label htmlFor={option.value}>{option.label}</label>
                    </div>
            ))
            
            break;
        case ('fileUpload'):
            inputElement = (
                <div><input 
                type={props.elConfig.type} 
                {...props.elConfig}
                onChange={props.changed}
                /></div>
            )
            
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elConfig} value={props.value}
            onChange={props.changed} />;
    }

    return (
        <div className={inputClasses.join(' ')}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
    <p className={classes.ErrMsg}>{props.errMsg}</p>
        </div>
    );


}

export default Input;