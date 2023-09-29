const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
    ,
    name : {
        type : String,
        required : [true, 'Please fill the fields']
    },
    fname : {
        type : String,
        required : [true, 'Please fill the fields']
    },
    dob : {
        type : String,
        required : [true, 'Please fill the fields']
    },
    gender : {
        type : String,
        required : [true, 'Please fill the fields']
    },
    mobile : {
        type : String,
        required : [true, 'Please fill the fields']
    },
    address : {
        type : String,
        required : [true, 'Please fill the fields']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('profile', profileSchema)