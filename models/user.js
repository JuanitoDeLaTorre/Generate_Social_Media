const mongoose = require('mongoose');


//defining user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    profilePic: {
        type:String,
        required: true
    }
});



const User = mongoose.model('User', userSchema);
module.exports = User