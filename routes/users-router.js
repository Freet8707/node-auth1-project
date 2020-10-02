const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const usersMiddleware = require("./users-middleware");
const router = express.Router();

router.get("/", usersMiddleware(), async (req, res) => {

    const users = await Users.getUsers()
    
    res.status(200).json(users)
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = Users.findByUsername(username)

        if(!user) {
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }

        const passwordValid = bcrypt.compare(password, user.password);

        if(!passwordValid) {
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }

        req.session.user = user

        return res.status(200).json({
            message: `Logged in ! Welcome User: ${user.username} !`
        })

    } catch(err) {
        next(err)
    }
    
})

router.post("/register", async (req, res) => {
    
    const newUser = await Users.addUser(req.body)

    res.status(201).json(newUser)

})

module.exports = router;