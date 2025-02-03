const mongoose = require('mongoose');
const validator = require('validator');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLengh:19
    },
    LastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    about:{
        type:String,
        default:"This is a default info about the user"
    },
    skiils:{
        type:[String],
        validate(value){
            if(value.length<3){
                throw new Error("At least 3 skills required")
            }
        }
    }
},
{
    timestamps:true
})

const userModel=new mongoose.model('User',userSchema)

module.exports={userModel}