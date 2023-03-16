const express = require('express');
const session = require("express-session")
const methodOverride = require("method-override")
const MongoStore = require("connect-mongo")
const router = express.Router();
const bcrypt = require("bcryptjs")
const path = require("path")



//PROJECT PARAMS
router.use(express.urlencoded({ extended: false }))
// router.set("views", path.join(__dirname,"views"))
// router.set("view engine","ejs")
router.use(express.static("public"))
router.use(methodOverride('_method'))
router.use(express.json())

const { User, Post, Like, Comments } = require('../models')
const userData = require('../models/seed');


//CREATE SESSION
router.use(
    session({
        store: MongoStore.create({mongoUrl:process.env.GENERATE_DB}),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
        
    })
)



router.get('/seed', async (req, res) => {
    try {
        const users = await User.create(userData);
        console.log(users)
        console.log('Successful Seeding');
        res.redirect('/')
    } catch(err) {
        console.log(err);
    }
})

router.get('/signUp', (req,res) => {
    res.render('signUp.ejs', { user: req.session.currentUser?.username })
})

router.post('/users/signUp', async (req,res,next)=> {
    try {
        const userInfo = {...req.body}

        console.log(req.body)

        let salt = await bcrypt.genSalt(12)

        const hash = await bcrypt.hash(userInfo.password, salt);
        userInfo.password = hash

        const newUser = await User.create(userInfo)

        req.session.currentUser = {
            id: newUser._id,
            username: userInfo.username
        }

        res.redirect('/')
    } catch(err) {
        console.log(err)
        next()
    }
})

router.get('/signIn', async (req,res,next)=> {
    res.render('signIn.ejs', { user: req.session.currentUser?.username })
})

router.post('/signIn', async (req,res,next)=> {
    try {
        console.log("I am hitting this route")
        const loginInfo = req.body
        console.log(req.body)
        const foundUser = await User.findOne({username:loginInfo.username})

        if(!foundUser) {
            return res.redirect('/signUp')
        }

        const match = bcrypt.compare(loginInfo.password, foundUser.password)
        console.log(match)
        if(!match) return res.send("Email or password doesn't match our database.")

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username
        }

        console.log(req.session)

        res.redirect('/')
    } catch(err) {
        console.log(err)
        next()
    }
})

router.get('/logOut', (req,res,next) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/allUsers', async (req,res,next) => {
    try {
        const allUsers = await User.find({});
        res.render('userList.ejs', {users: allUsers});
    } catch(error){
        console.log(error);
        next();
    }
})

router.get('/profile/:username', async (req,res,next)=> {
    try {
        //change to accept finding posts from any user, not just the one logged in
        const profileUser = await User.findOne({username: req.params.username})
        const allPosts = await Post.find({user: profileUser})

        allPosts.forEach((post)=> {
            console.log(post.photoTitle + " " + post.comments)
        })

        res.render('profile.ejs', { user: req.session.currentUser?.username, profileUser: profileUser , photos: allPosts})
    } catch(err) {
        console.log(err)
        next()
    }
})

//DELETE / SEND BACK TO ROUTER
router.get('/newContent', (req, res) => {
    res.render('newPost.ejs', {user: req.session.currentUser?.username});
});

router.post('/newPhoto', async (req,res,next)=> {
    try {
        let postInfo = req.body
        userObject = await User.findOne({username: req.session.currentUser.username})
        console.log(userObject._id)
        postInfo.user = userObject._id
        console.log(req.body)
        console.log(postInfo)
        const newPhoto = await Post.create(postInfo)
        res.redirect('/')
    } catch(err) {
        console.log(err)
        next()
    }
})



module.exports = router