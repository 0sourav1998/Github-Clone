const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String ,
        required : true ,
        unique : true 
    },
    email : {
        type : String ,
        required : true ,
    } ,
    password : {
        type : String ,
        required : true
    },
    repositories : [{
        default : [] ,
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Repositories"
    }] ,
    followedUser : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ] ,
    starRepo : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Repositories"
    }]
})

module.exports = mongoose.model("User",userSchema)