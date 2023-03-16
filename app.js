const express = require("express")
const app = express()
const methodOverride = require("method-override")
const path = require("path")
require("dotenv").config()
const { User, Post, Comments, Likes } = require('./models')
const axios = require("axios")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const MongoStore = require("connect-mongo")

//CONFIG
const PORT = 4000

//CONTROLLERS
app.use('/', require('./controller/controller.js'))

//PROJECT PARAMS
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(express.json())

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

app.get('/', (req,res)=> {
    console.log(req.session.currentUser?.username)
    res.render("index.ejs", { user: req.session.currentUser?.username })
})

// app.get('/signUp', (req,res) => {
//     res.render('signUp.ejs', { user: req.session.currentUser?.username })
// })

// app.post('/users/signUp', async (req,res,next)=> {
//     try {
//         const userInfo = {...req.body}

//         console.log(req.body)

//         let salt = await bcrypt.genSalt(12)

//         const hash = await bcrypt.hash(userInfo.password, salt);
//         userInfo.password = hash

//         const newUser = await User.create(userInfo)

//         req.session.currentUser = {
//             id: newUser._id,
//             username: userInfo.username
//         }

//         res.redirect('/')
//     } catch(err) {
//         console.log(err)
//         next()
//     }
// })

// app.get('/signIn', async (req,res,next)=> {
//     res.render('signIn.ejs', { user: req.session.currentUser?.username })
// })

// app.post('/signIn', async (req,res,next)=> {
//     try {
//         const loginInfo = req.body
//         console.log(req.body)
//         const foundUser = await User.findOne({username:loginInfo.username})

//         if(!foundUser) {
//             return res.redirect('/signUp')
//         }

//         const match = bcrypt.compare(loginInfo.password, foundUser.password)
//         console.log(match)
//         if(!match) return res.send("Email or password doesn't match our database.")

//         req.session.currentUser = {
//             id: foundUser._id,
//             username: foundUser.username
//         }

//         console.log(req.session)

//         res.redirect('/')
//     } catch(err) {
//         console.log(err)
//         next()
//     }
// })

// app.get('/logOut', (req,res,next) => {
//     req.session.destroy()
//     res.redirect('/')
// })

// app.get('/profile/:username', async (req,res,next)=> {
//     try {
//         //change to accept finding posts from any user, not just the one logged in
//         const profileUser = await User.findOne({username: req.params.username})
//         const allPosts = await Post.find({user: profileUser})
//         console.log(profileUser)
//         const reqPhotos = require('./testData/samplePhotos.js')
//         const photos = []

//         reqPhotos.forEach((photo)=> {
//             photos.push(photo.urls.regular)
//         })
//         res.render('profile.ejs', { user: req.session.currentUser?.username, profileUser: profileUser , photos: allPosts})
//     } catch(err) {
//         console.log(err)
//         next()
//     }
// })

// //DELETE / SEND BACK TO ROUTER
// app.get('/newContent', (req, res) => {
//     res.render('newPost.ejs', {user: req.session.currentUser?.username});
// });

// app.post('/newPhoto', async (req,res,next)=> {
//     try {
//         let postInfo = req.body
//         userObject = await User.findOne({username: req.session.currentUser.username})
//         console.log(userObject._id)
//         postInfo.user = userObject._id
//         console.log(req.body)
//         console.log(postInfo)
//         const newPhoto = await Post.create(postInfo)
//         res.redirect('/')
//     } catch(err) {
//         console.log(err)
//         next()
//     }
// })

app.listen(PORT, (req,res)=> {
    console.log(`Listening on port ${PORT}`)
})