const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", async (req, res) => {

    const users = await Users.getUsers()
    
    res.status(200).json(users)
});

module.exports = router;