export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    let errMsg = undefined;

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
        if(!isValid){
            errMsg = "This Field is Required";
        }
        
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
        if(!isValid){
            errMsg = "A Min Length of " + rules.minLength + " char is required";
        }
        
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
        if(!isValid){
            errMsg = "A Max Length of " + rules.minLength + " char is required";
        }
    }

    if ( rules.isEmail ) {
        // Code copied
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
        if(!isValid){
            errMsg = "Please enter a valid email address";
        }
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
        if(!isValid){
            errMsg = "Only Numers are allowed";
        }
    }

    return {isValid, errMsg};
}


// Code to format date from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export const formatDate = (date) => {
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