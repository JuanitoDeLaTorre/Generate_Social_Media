const express = require("express")
const app = express()
const methodOverride = require("method-override")
const path = require("path")
require("dotenv").config()
const { User } = require('./models')
const axios = require("axios")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const MongoStore = require("connect-mongo")

//CONFIG
const PORT = 4000

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

app.get('/signUp', (req,res) => {
    res.render('signUp.ejs', { user: req.session.currentUser?.username })
})

app.post('/users/signUp', async (req,res,next)=> {
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

app.get('/signIn', async (req,res,next)=> {
    res.render('signIn.ejs', { user: req.session.currentUser?.username })
})

app.post('/signIn', async (req,res,next)=> {
    try {
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

app.get('/logOut', (req,res,next) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(PORT, (req,res)=> {
    console.log(`Listening on port ${PORT}`)
})