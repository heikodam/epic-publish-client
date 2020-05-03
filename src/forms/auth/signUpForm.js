const signUp = {
    firstname: {
        name: "firstname",
        value: "",
        elConfig: {
            placeholder: "First Name"
        },
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    surname: {
        name: "surname",
        value: "",
        elConfig: {
            placeholder: "Surname"
        },
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    email: {
        name: "email",
        value: "",
        elConfig: {
            placeholder: "Email"
        },
        validation: {
            required: true,
            isEmail: true
            
        },
        valid: false,
        touched: false
    }, 
    password: {
        name: "password",
        value: "",
        elConfig: {
            placeholder: "Password",
            type: 'password'
        },
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    confirmPassword: {
        name: "confirmPassword",
        value: "",
        elConfig: {
            placeholder: "Confirm Password",
            type: 'password'
        },
        validation: {
            required: true,
            
        },
        valid: false,
        touched: false
    }
}

export default signUp;