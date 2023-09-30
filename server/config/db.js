const mongoose = require('mongoose')
mongoose.Promise = global.Promise

async function myDbConnection() {

    const url = process.env.MONGO_URL

    try {
        let connectionPromise = await mongoose.connect(url, { useNewUrlParser: true });
        if (mongoose.connection) {
            console.log('Connected Successfully')
            global.connectionPromise = connectionPromise;
        } else { global.connectionPromise = null; 
                 console.log('not connected to DB') }
        return connectionPromise;
    } catch (error) {
        console.log('Error connecting to DB ::', error);
    }
}

module.exports = myDbConnection();