const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
    },
    description : {
        type : String ,
        required :true 
    } ,
    status : {
        type : String ,
        enum  : ["open","close"] ,
        default : "open"
    },
    repository : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Repositories"
    }
})

module.exports = mongoose.model("Issues",issueSchema)