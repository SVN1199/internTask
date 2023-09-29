const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000
const dotenv = require('dotenv').config();
const config = require('./config/db')
const userRouter = require('./route/userRoutes')
const profileRouter = require('./route/profileRoute')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/api/profile', profileRouter)
app.use('/api/users', userRouter)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
})