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
    res.render("index.ejs")
})

app.get('/signUp', (req,res) => {
    res.render('signUp.ejs')
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

app.listen(PORT, (req,res)=> {
    console.log(`Listening on port ${PORT}`)
})