const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// const Comment = mongoose.model('Comment', commentSchema);
// module.exports = Comment

module.exports = commentSchema