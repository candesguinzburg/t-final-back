const mongoose = require ('mongoose')
const { Schema } = require ('mongoose')

const userSchema = new Schema({
    nombre:{
        type: 'string',
        require: true
    },
    mail:{
        type: 'string',
        require: true
    },
    password:{
        type: 'string',
        require: true
    },
    timestamp:{
        type: 'date',
       default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User