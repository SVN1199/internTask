const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on('connected', ()=>{
    console.log('MongoDB Connected Successfully')
})

connection.on('Error', (err)=>{
    console.log('MongoDB Connection Error ' + err)
})