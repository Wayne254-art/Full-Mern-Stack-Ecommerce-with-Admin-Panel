
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profile : String,
    role : String,
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel