const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true, 
        index: {unique:true}
    },
    material: {type: String, required: true},
    cutting: {type: Number, required: true},
    feed: {type: Number, required: true}
});

// Luo MongoDB:hen collectionin nimellä testidbs
module.exports = mongoose.model("testidb", schema);