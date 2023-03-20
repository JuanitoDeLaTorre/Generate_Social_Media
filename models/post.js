const mongoose = require('mongoose');
const commentSchema = require('./comments')


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
        type: mongoose.Types.ObjectId,
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
    comments: [commentSchema],
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post