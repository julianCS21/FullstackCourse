const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    username: {
        type : String,
        minlength : 3,
        unique : true
    },
    password: String,
    name: String,
    blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ]
  })


  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
    }
  })

  
userSchema.plugin(uniqueValidator)
  
const User = mongoose.model('User', userSchema)


module.exports = User