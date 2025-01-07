
const mongoose = require('mongoose')

async function connectDb () {
    try {
       await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb