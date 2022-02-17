const router = require("express").Router();

const mongoose = require("mongoose");


// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require the Room model in order to interact with the database
const Room = require("../models/Room.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { post } = require(".");

router.route("/")
.get((req, res)=> {
    res.render("rooms/rooms")
})

router.route("/create")
.get(isLoggedIn, (req, res)=> {
    res.render("rooms/create-room")
})
.post((req, res)=> {
    const { name, description, imgUrl } = req.body;
    const ownerId = req.session.user._id

    Room.create({name, description, imgUrl, owner: ownerId})
    .then(res.redirect("/rooms"))

})

module.exports = router;