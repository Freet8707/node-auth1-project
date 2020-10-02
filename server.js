const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const express = require("express");
const usersRouter = require("./routes/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(session({
    secret: "keep it secret, keep it safe",
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}))
server.use(express.json());

server.get("/", (req, res) => {
    res.json({
        message: "Server up and running ! "
    })
});

server.use("/users", usersRouter);

module.exports = server