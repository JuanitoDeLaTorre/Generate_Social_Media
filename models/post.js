const mongoose = require('mongoose');


//defining post schema
const postSchema = new mongoose.Schema({
    photoTitle: {
        type: String,
        required: true
    },
    photoLocation: {
        type:String,
        required: true,
        default: 'Area 51 👽'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        //CHANGE BACK TO MONGO ID??
        type: String,
        ref: 'Comment'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post