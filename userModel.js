const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

module.exports = new  mongoose.model("userModel", userSchema)