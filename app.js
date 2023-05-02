const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();
const { User, Post, Comments, Likes } = require("./models");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//CONFIG
const PORT = 3000;

//CONTROLLERS
app.use("/", require("./controller/controller.js"));

//PROJECT PARAMS
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.json());

//CREATE SESSION
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.GENERATE_DB }),
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.get("/", async (req, res, next) => {
  try {
    let allPosts = await Post.find({}); // Array of all posts in DB
    let mongoUsers = [];
    for (let i = 0; i < allPosts.length; i++) {
      // Loop through all posts
      mongoUsers.push(await User.findOne({ _id: allPosts[i].user })); // User is key, string, link to the user. Each time post is found, new user is pushed to mongoUsers array. findOne looks for key of _id in mongoDB and links it to allPosts[i]
    }
    console.log(allPosts);
    allPosts = allPosts.reverse();

    mongoUsers = mongoUsers.reverse();
    console.log(allPosts);
    res.render("index.ejs", {
      posts: allPosts,
      userObjects: mongoUsers,
      user: req.session.currentUser?.username,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});
app.get("/*", (req, res) => {
  res.render("404.ejs", { user: req.session.currentUser?.username });
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
