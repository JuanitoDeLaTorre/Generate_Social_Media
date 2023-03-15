const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const Post = require('../../models/post');
const Like = require('../../models/likes');
const Comment = require('../../models/comments');


//CREATE SESSION
app.use(
    session({
        store: MongoStore.create({mongoUrl:process.env.GENERATE_DB}),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
        
    })
)

app.get('/seed', async (req, res) => {
    try {
        const users = await User.create(usersData);
        res.send(users)
        console.log('Successful Seeding');
    } catch(err) {
        console.log(error);
    }
})

app.get('/', (req,res)=> {
    res.render("index.ejs");
})

app.get('/signUp', (req,res) => {
    res.render('signUp.ejs');
})

app.get('/profile', (req,res) => {
    res.render('profile.ejs');
})
app.post('/users/signUp', async (req,res,next)=> {
    try {
        console.log(req.body)
        const newUser = await User.create(req.body)
        res.redirect('/')
    } catch(err) {
        console.log(err)
        next()
    }
})
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
// router.put
