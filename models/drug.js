const Schema = require('mongoose').Schema;

const drugSchema = new Schema({
    Name: { 
        type:string,
        required:true
    },
    Description: {
        type:string,
        required:true
    },
    Permitted: {
        type:Boolean,
    },
    Ingredients: {
        type:[string],
        required:true
    },
})