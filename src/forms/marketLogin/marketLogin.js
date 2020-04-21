const marketLogin = {
    username: {
        name: 'username',
        elConfig: {
            placeholder: 'Email or Username'
        },
        validation: {
            required: true,
        }
    },
    password: {
        name: 'password',
        elType: 'password',
        elConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        validation: {
            required: true,
        }
    },
    marketplace: {
        name: 'marketplace',
        elType: 'select',
        elConfig: {
            type: 'select',
            options: [
                { value: 'ebay-kleinanzeige', displayValue: 'Ebay-Kleinanzeige' },
                { value: 'immowelt', displayValue: 'Immowelt' }
            ]
        },
        value: 'immowelt',
        valid: true
      }
}


export default marketLogin;
