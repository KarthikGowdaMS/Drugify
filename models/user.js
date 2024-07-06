const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile: {  
        type: Number,
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authMethod: {
        type: String,
        required: true
    
    }
});


module.exports= mongoose.model('User', userSchema);