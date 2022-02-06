const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const ItemSchema = new Schema({
    category: {
        type: String, 
        default: ""
    },
    item_name: {
        type: String,
        required: [true, 'Item Name is required']
    },
    brand: {
        type: String,
        default: ""
    },
    remarks: {
        type: String,
        default: ""
    },
    uom: {
        type: String,
        default: ""
    },
    quantity: {
        type: String,
        default: ""
    },
    itemNeeded: {
        type: Boolean,
        deafult: true
    }
});


const Item = mongoose.model('items',ItemSchema);

module.exports = Item;