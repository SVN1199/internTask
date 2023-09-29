const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : [true, 'Please fill the field']
    },
    email :{
        type : String,
        required : [true, 'Please fill the field'],
        unique : true
    },
    password :{
        type : String,
        required : [true, 'Please fill the field']
    },
},{
    timestamps : true
})

module.exports = mongoose.model('user', userSchema)