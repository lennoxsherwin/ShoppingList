const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const UserSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});


const User = mongoose.model('users',UserSchema);

module.exports = User;