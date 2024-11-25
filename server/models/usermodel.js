const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            require: true,
        },
        email:{
            type:String,
            require:true,
        },
        phoneNumber:{
            type:Number,
            require: true,
        },
        password:{
            type:String,
            require:true,
        },
        role:{
            type:String,
            require:true,
        }
    }
);

module.exports = mongoose.model("User", userSchema);