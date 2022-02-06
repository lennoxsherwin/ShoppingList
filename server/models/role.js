const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const RoleSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Name is required']
    }
});


const Role = mongoose.model('roles',RoleSchema);

module.exports = Role;