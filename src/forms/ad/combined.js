import { updateObject } from '../../shared/utility';
import formInputTemplate from '../formInputTemplate';

import immowelt from './singleForms/immowelt';
import ebayKleinanzeige from './singleForms/ebay-kleinanzeige';


const updateInput = (form) => {

    const updatedInput = {}

    for(let key in form) {
        updatedInput[key] = updateObject(formInputTemplate, form[key]);
        updatedInput[key].elConfig = updateObject(formInputTemplate.elConfig, form[key].elConfig)
        }
    return updatedInput;
}

var combinedForms = {}
combinedForms = updateObject(combinedForms, updateInput(ebayKleinanzeige));
combinedForms = updateObject(combinedForms, updateInput(immowelt));
combinedForms = updateObject(combinedForms, updateInput(
    {
        marketplaces: {
            name: "marketplaces",
            elType: "checkbox",
            elConfig: {
                type: 'checkbox',
                label: "Where do you want to publish it: ",
                options: [
                    { name: 'marketplaces', value: 'ebay-kleinanzeige', label: 'Ebay-Kleinanzeige' },
                    { name: 'marketplaces', value: 'immowelt', label: 'Immowelt' },
                    { name: 'marketplaces', value: 'wg-gesucht', label: 'WG Gesucht' },
                    { name: 'marketplaces', value: 'immobilienscout24', label: 'ImmobilienScout24' },
                ]
            },
            value: '',
            valid: true
    },
    title: {
        name: 'title',
        elConfig: {
            placeholder: 'Your ad Title'
        },
        validation: {
            required: true,
        },
        valid: false,
    },
}
));


export default combinedForms;