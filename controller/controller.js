const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const Post = require('../../models/post');
const Like = require('../../models/likes');
const Comment = require('../../models/comments');

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch(err) {
        console.log(err)
        next()
    }
});


// render create a post screen
router.get('/newContent', (req, res) => {
    res.render('newPost.ejs');
});
//create a new post
router.post('/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.render('post', { post });
    } catch(err) {
        console.log(err)
        next()
    };
})

//update a post
router.put
