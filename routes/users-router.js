const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", async (req, res) => {

    const users = await Users.getUsers()
    
    res.status(200).json(users)
});

router.post("/register", async (req, res, next) => {
    
    const newUser = await Users.addUser(req.body)

    res.status(201).json(newUser)

})

module.exports = router;