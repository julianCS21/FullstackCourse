const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');


// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
  

mongoose.connect(url)
    .then(() =>{
        console.log('Connected to mongoDB')
    }).catch((error) =>{
        console.log('error connecting to mongodb',error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength : 3, 
        required : true,
        unique : true
    },
    number: {
        type:String,
        minlength : 8,
        required : true

    },
    id : Number
  
})




personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)
