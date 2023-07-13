const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [25, "Name cannot exceed 30 characters"],
            minLength: [2, "Name should have more than 4 characters"],
        },
        lastname: {
            type: String,
            default: '',
            maxLength: [25, "Name cannot exceed 30 characters"],
            minLength: [2, "Name should have more than 4 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v); // Email format
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
        },
        roles: [{
            type: String,
            enum: ['Admin', 'Employee', 'Customer'],
            default: 'Customer'
        }],
        // avatar: [
        //     {
        //         public_id: {
        //             type: String,
        //             required: true,
        //         },
        //         url: {
        //             type: String,
        //             required: true,
        //         },
        //     },
        // ],
        mobileNumber: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^(\+?63|0)9\d{9}$/.test(v); // Philippine number format
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }
        // Add avatar / image of the user
    }, 
    { 
        timestamps: true 
    }
);

    // active: {
    //     type: Boolean,
    //     default: true
    // }


module.exports = mongoose.model('User', userSchema)