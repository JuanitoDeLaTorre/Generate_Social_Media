const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const Post = require('../../models/post');
const Like = require('../../models/likes');
const Comment = require('../../models/comments');

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve post'});
    }
});

//i am going to change you later, lets hope this removes all unnecessary folders