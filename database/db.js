const mongoose = require('mongoose')


const connectToDB = async () => {
    try{
     await mongoose.connect(process.env.MONGO_URI);
     console.log("MongoDb is connected Successfully !")
    } catch(e){
        console.log('MongoDb Connection Error',e);
        process.exit(1)
    }
}

module.exports = connectToDB