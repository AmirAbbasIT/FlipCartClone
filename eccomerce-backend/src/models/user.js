const mongoose = require("mongoose");
const bcrypt =require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: 2
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 2
    },
    username: {
        type: String,
        trim: true,
        index: true,
        default: Math.random().toString()
    },
    email: {
        type: true,
        trim: true,
        index: true,
        type: String,
        unique: true
    },
    hashed_password: {
        type: String
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true});

userSchema.virtual("password").set( function(password){
    this.hashed_password=bcrypt.hashSync(password,10);
});

userSchema.methods={
    authenticate: function(password){
        return  bcrypt.compareSync(password,this.hashed_password);
    }
}

module.exports=mongoose.model("User",userSchema);